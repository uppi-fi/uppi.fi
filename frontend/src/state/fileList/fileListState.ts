import { FileT } from '@shared/schema';
import { atom } from 'recoil';

export const fileListState = atom<FileT[] | null>({
  key: 'fileListState',
  default: null,
});
