import { FileT } from '@shared/schema';
import cx from 'classnames';
import { useState } from 'react';
import { useDebounce } from 'react-use';
import { useApiService } from '../../services/useApiService';
import styles from './FileNameInput.module.scss';

const TYPING_UPDATE_DEBOUNCE_MS = 250;

type UpdateFileParams = Pick<FileT, 'id'> &
  Partial<Pick<FileT, 'customName' | 'filename' | 'viewCount'>>;

interface FileNameInputProps {
  file: FileT;
  className?: string;
}

function FileNameInput({ file, className }: FileNameInputProps) {
  const [value, setValue] = useState(file.customName || '');
  const { post: updateFile } = useApiService<unknown, UpdateFileParams>(
    'update-file'
  );

  useDebounce(
    () =>
      updateFile({
        id: file.id,
        customName: value,
      }),
    TYPING_UPDATE_DEBOUNCE_MS,
    [value]
  );

  return (
    <input
      className={cx(styles.input, className)}
      type="text"
      value={value}
      onChange={(evt) => {
        const { value } = evt.currentTarget;
        setValue(value);
      }}
      spellCheck={false}
      placeholder="Lisää otsikko"
    />
  );
}

export default FileNameInput;
