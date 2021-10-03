import { FileT } from '@shared/schema';
import { atom } from 'recoil';

export const currentFileState = atom<FileT | null>({
  key: 'currentFileState',
  default: null,
});
