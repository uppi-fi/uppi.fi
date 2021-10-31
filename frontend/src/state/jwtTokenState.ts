import { atom } from 'recoil';
import { localStorageEffect } from './localStorageEffect';

export const jwtTokenState = atom<string | null>({
  key: 'jwtTokenState',
  default: null,
  effects_UNSTABLE: [localStorageEffect('jwt-token')],
});
