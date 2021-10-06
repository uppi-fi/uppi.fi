import { atom } from 'recoil';
import { localStorageEffect } from '../localStorageEffect';

type SortState = {
  order: 'asc' | 'desc';
};

interface DateSort extends SortState {
  type: 'date';
}

interface ViewCountSort extends SortState {
  type: 'viewCount';
}

export type FileListSortState = DateSort | ViewCountSort;

export const fileListSortState = atom<DateSort | ViewCountSort>({
  key: 'fileListSortState',
  default: {
    type: 'date',
    order: 'asc',
  },
  effects_UNSTABLE: [localStorageEffect('fileListSort')],
});
