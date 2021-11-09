import { fetchUser } from '@frontend/api';
import { UserT } from '@shared/schema';
import { atom, selector } from 'recoil';
import { localStorageEffect } from './localStorageEffect';

export const currentUserQuery = selector({
  key: 'CurrentUser',
  get: async () => {
    const { data } = await fetchUser();
    return data;
  },
});

export const currentUserState = atom<UserT | null>({
  key: 'currentUserState',
  default: fetchUser().then(({ data }) => data),
  effects_UNSTABLE: [localStorageEffect('current-user')],
});
