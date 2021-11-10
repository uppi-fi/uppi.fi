import { updateFile } from '@frontend/api';
import { FileT } from '@shared/schema';
import cx from 'classnames';
import { useState } from 'react';
import styles from './FileNameInput.module.scss';
import debounce from 'lodash-es/debounce';

const TYPING_UPDATE_DEBOUNCE_MS = 250;

interface FileNameInputProps {
  file: FileT;
  className?: string;
}

function FileNameInput({ file, className }: FileNameInputProps) {
  const [value, setValue] = useState(file.customName || '');
  const updateFileDebounced = debounce(updateFile, TYPING_UPDATE_DEBOUNCE_MS);

  return (
    <input
      className={cx(styles.input, className)}
      type="text"
      value={value}
      onChange={(evt) => {
        const { value } = evt.currentTarget;
        setValue(value);
        updateFileDebounced({ id: file.id, customName: value });
      }}
      spellCheck={false}
      placeholder="Lisää otsikko"
    />
  );
}

export default FileNameInput;
