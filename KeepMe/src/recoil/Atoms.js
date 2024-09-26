import React from 'react'
import { atom } from 'recoil'

export const socketDataState = atom({
  key: 'socketDataState',
  default: [],
});

export const authState = atom({
  key: 'authState',
  default: false,
});
export const selectedUserCodeState = atom({
  key: 'selectedUserCodeState',
  default: null, // 선택된 usercode
});
export const userIdState = atom({
  key: 'userIdState',
  default: '', // 선택된 usercode
});
// export const userRoleState = atom({
//   key: 'userRoleState',
//   default: '', // 'admin' 또는 'user'
// });