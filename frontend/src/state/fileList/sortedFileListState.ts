import orderBy from 'lodash-es/orderBy';
import { selector } from 'recoil';
import { fileListSortState } from './fileListSortState';
import { fileListState } from './fileListState';

export const sortedFileListState = selector({
  key: 'sortedFileListState',
  get: ({ get }) => {
    const sort = get(fileListSortState);
    const files = get(fileListState);

    if (!files) {
      return null;
    }

    switch (sort.type) {
      case 'date':
        return orderBy(
          files,
          (f) => new Date(f.createdAt).getTime(),
          sort.order
        );
      case 'viewCount': // TODO
      default:
        return orderBy(files, (f) => f.viewCount, sort.order);
    }
  },
});
