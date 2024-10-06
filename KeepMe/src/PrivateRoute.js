import { useRecoilValue } from 'recoil';
import { Navigate } from 'react-router-dom';
import { authState } from './recoil/Atoms';

function PrivateRoute({ children }) {
  const isAuthenticated = useRecoilValue(authState);
  const token = sessionStorage.getItem('token'); // sessionStorage에서 토큰 가져옴

  // 인증 상태 또는 토큰이 없으면 로그인 페이지로 리다이렉트
  if (!isAuthenticated || !token) {
    return <Navigate to="/" />;
  }

  return children; // 인증이 되어 있으면 해당 자식 컴포넌트를 렌더링
}

export default PrivateRoute;
