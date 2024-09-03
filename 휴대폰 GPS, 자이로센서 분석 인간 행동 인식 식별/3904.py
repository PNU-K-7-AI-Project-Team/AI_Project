import tensorflow as tf
import numpy as np
import matplotlib.pyplot as plt
from scipy.interpolate import interp1d
from sklearn.metrics import classification_report, confusion_matrix
from imblearn.over_sampling import SMOTE

def parse_end(s):
    try:
        return float(s[-1])
    except:
        return np.nan

def read_data(file_path):
    labels = {'Walking': 0, 'Jogging': 1, 'Upstairs': 2, 'Sitting': 3, 'Downstairs': 4, 'Standing': 5}    
    data = np.loadtxt(file_path, delimiter=",", usecols=(0,1, 3, 4, 5),
                      converters={1: lambda name: labels[name.decode()],
                                  5: parse_end})
    data = data[~np.isnan(data).any(axis=1)]
    return data

data = read_data("./DATA/WISDM_ar_v1.1/WISDM_ar_v1.1_raw.txt")

mean = np.mean(data[:,2:], axis=0)
std = np.std(data[:,2:], axis=0)
data[:,2:] = (data[:,2:]-mean)/std

# 데이터 불균형 확인 및 시각화
activity_counts = np.bincount(data[:, 1].astype(int))
activity_names = ['Walking', 'Jogging', 'Upstairs', 'Sitting', 'Downstairs', 'Standing']

print("활동별 데이터 수:")
for i, count in enumerate(activity_counts):
    print(f"{activity_names[i]}: {count}")

plt.figure(figsize=(10, 6))
plt.bar(activity_names, activity_counts)
plt.title("활동별 데이터 분포")
plt.xlabel("활동")
plt.ylabel("데이터 수")
plt.xticks(rotation=45)
plt.tight_layout()
plt.show()

# 데이터 증강 함수
def time_warp(x, sigma=0.2, knot=4):
    orig_steps = np.arange(x.shape[0])
    random_warps = np.random.normal(loc=1.0, scale=sigma, size=(knot+2,))
    warp_steps = np.zeros(knot+2)
    warp_steps[0] = 0
    warp_steps[-1] = x.shape[0] - 1
    warp_steps[1:-1] = np.sort(np.random.randint(1, x.shape[0]-1, size=(knot,)))
    warper = interp1d(warp_steps, random_warps, bounds_error=False, fill_value='extrapolate')
    warped_steps = warper(orig_steps)
    ret = np.zeros_like(x)
    for i in range(x.shape[1]):
        ret[:, i] = np.interp(orig_steps, warped_steps, x[:, i])
    return ret

def magnitude_warp(x, sigma=0.2, knot=4):
    orig_steps = np.arange(x.shape[0])
    random_warps = np.random.normal(loc=1.0, scale=sigma, size=(knot+2,))
    warp_steps = np.zeros(knot+2)
    warp_steps[0] = 0
    warp_steps[-1] = x.shape[0] - 1
    warp_steps[1:-1] = np.sort(np.random.randint(1, x.shape[0]-1, size=(knot,)))
    warper = interp1d(warp_steps, random_warps, bounds_error=False, fill_value='extrapolate')
    warped_steps = warper(orig_steps)
    return x * warped_steps[:, np.newaxis]

def window_slice(x, reduce_ratio=0.9):
    target_len = int(reduce_ratio * x.shape[0])
    if target_len >= x.shape[0]:
        return x
    starts = np.random.randint(low=0, high=x.shape[0] - target_len, size=(1,)).astype(int)[0]
    return x[starts:starts + target_len, :]

def window_warp(x, window_ratio=0.1, scales=[0.5, 2.]):
    warp_scales = np.random.choice(scales, x.shape[1])
    warp_size = np.ceil(window_ratio * x.shape[0]).astype(int)
    window_steps = np.arange(warp_size)
        
    window_starts = np.random.randint(low=1, high=x.shape[0] - warp_size - 1, size=(x.shape[1],)).astype(int)
    window_ends = (window_starts + warp_size).astype(int)
        
    ret = np.zeros_like(x)
    for i in range(x.shape[1]):
        start_seg = x[:window_starts[i], i]
        window_seg = np.interp(np.linspace(0, warp_size, num=int(warp_size*warp_scales[i])), window_steps, x[window_starts[i]:window_ends[i], i])
        end_seg = x[window_ends[i]:, i]
        warped = np.concatenate((start_seg, window_seg, end_seg))
        ret[:, i] = np.interp(np.arange(x.shape[0]), np.linspace(0, x.shape[0], num=warped.size), warped)
    return ret

def augment_data(x, y):
    augmented_x = []
    augmented_y = []
    for i in range(len(x)):
        augmented_x.append(x[i])
        augmented_y.append(y[i])
        
        # Time warping
        warped = time_warp(x[i])
        augmented_x.append(warped)
        augmented_y.append(y[i])
        
        # Magnitude warping
        warped = magnitude_warp(x[i])
        augmented_x.append(warped)
        augmented_y.append(y[i])
        
        # Window slicing
        sliced = window_slice(x[i])
        if sliced.shape[0] == x[i].shape[0]:
            augmented_x.append(sliced)
            augmented_y.append(y[i])
        
        # Window warping
        warped = window_warp(x[i])
        augmented_x.append(warped)
        augmented_y.append(y[i])
    
    return np.array(augmented_x), np.array(augmented_y)

# 데이터 분할 및 세그먼트화
x_train = data[data[:,0] <= 28]
x_test = data[data[:,0] > 28]

TIME_PERIODS = 80
STEP_DISTANCE = 40

def data_segments(data):
    segments = []
    labels = []
    for i in range(0, len(data) - TIME_PERIODS, STEP_DISTANCE):
        X = data[i:i+TIME_PERIODS, 2:].tolist()
        values, counts = np.unique(data[i:i+TIME_PERIODS, 1], return_counts=True)
        label = values[np.argmax(counts)]
        segments.append(X)
        labels.append(label)
    segments = np.array(segments, dtype=np.float32).reshape(-1, TIME_PERIODS, 3)
    labels = np.asarray(labels)
    return segments, labels

x_train, y_train = data_segments(x_train)
x_test, y_test = data_segments(x_test)

# 데이터 증강 적용
x_train, y_train = augment_data(x_train, y_train)

# SMOTE 적용
smote = SMOTE(random_state=42)
x_train_reshaped = x_train.reshape(x_train.shape[0], -1)
x_train_resampled, y_train_resampled = smote.fit_resample(x_train_reshaped, y_train)
x_train = x_train_resampled.reshape(-1, TIME_PERIODS, 3)
y_train = y_train_resampled

# 원-핫 인코딩
y_train = tf.keras.utils.to_categorical(y_train)
y_test = tf.keras.utils.to_categorical(y_test)

# 모델 구축
model = tf.keras.Sequential([
    tf.keras.layers.Input(shape=(TIME_PERIODS, 3)),
    tf.keras.layers.Conv1D(filters=100, kernel_size=11, activation='relu'),
    tf.keras.layers.MaxPool1D(),
    tf.keras.layers.BatchNormalization(),
    tf.keras.layers.Conv1D(filters=10, kernel_size=5, activation='relu'),
    tf.keras.layers.MaxPool1D(),
    tf.keras.layers.Dropout(rate=0.5),
    tf.keras.layers.Flatten(),
    tf.keras.layers.Dense(units=6, activation='softmax')
])

model.summary()

# 모델 컴파일 및 훈련
opt = tf.keras.optimizers.RMSprop(learning_rate=0.01)
model.compile(optimizer=opt, loss='categorical_crossentropy', metrics=['accuracy'])
ret = model.fit(x_train, y_train, epochs=100, batch_size=400,
                validation_data=(x_test, y_test), verbose=2)

# 모델 평가
train_loss, train_acc = model.evaluate(x_train, y_train, verbose=2)
test_loss, test_acc = model.evaluate(x_test, y_test, verbose=2)

# 정확도 및 손실 그래프
plt.figure(figsize=(12, 4))
plt.subplot(1, 2, 1)
plt.plot(ret.history['accuracy'], label='train accuracy')
plt.plot(ret.history['val_accuracy'], label='val accuracy')
plt.title('Model Accuracy')
plt.xlabel('Epoch')
plt.ylabel('Accuracy')
plt.legend()

plt.subplot(1, 2, 2)
plt.plot(ret.history['loss'], label='train loss')
plt.plot(ret.history['val_loss'], label='val loss')
plt.title('Model Loss')
plt.xlabel('Epoch')
plt.ylabel('Loss')
plt.legend()

plt.tight_layout()
plt.show()

# 혼동 행렬 및 분류 보고서
y_pred = model.predict(x_test)
y_pred_classes = np.argmax(y_pred, axis=1)
y_true = np.argmax(y_test, axis=1)

print("Confusion Matrix:")
print(confusion_matrix(y_true, y_pred_classes))
print("\nClassification Report:")
print(classification_report(y_true, y_pred_classes, target_names=activity_names))

# 샘플 활동 시각화
plt.figure(figsize=(12, 8))
for i in range(6):
    plt.subplot(3, 2, i+1)
    activity_data = x_test[y_true == i][0]
    plt.plot(activity_data)
    plt.title(activity_names[i])
    plt.xlabel('Time')
    plt.ylabel('Normalized Acceleration')
plt.tight_layout()
plt.show()