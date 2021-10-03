/* eslint-disable */
/**
 * Slightly edited version of "react-use"'s useDrop hook:
 * https://github.com/streamich/react-use/blob/master/src/useDrop.ts
 */
import { useCallback, useEffect, useMemo, useState } from 'react';

export const noop = () => {};

export function on<T extends Window | Document | HTMLElement | EventTarget>(
  obj: T | null,
  ...args: Parameters<T['addEventListener']> | [string, Function | null, ...any]
): void {
  if (obj && obj.addEventListener) {
    obj.addEventListener(
      ...(args as Parameters<HTMLElement['addEventListener']>)
    );
  }
}

export function off<T extends Window | Document | HTMLElement | EventTarget>(
  obj: T | null,
  ...args:
    | Parameters<T['removeEventListener']>
    | [string, Function | null, ...any]
): void {
  if (obj && obj.removeEventListener) {
    obj.removeEventListener(
      ...(args as Parameters<HTMLElement['removeEventListener']>)
    );
  }
}

export interface DropAreaState {
  over: boolean;
}

export interface DropAreaBond {
  onDragOver: React.DragEventHandler;
  onDragEnter: React.DragEventHandler;
  onDragLeave: React.DragEventHandler;
  onDrop: React.DragEventHandler;
  onPaste: React.ClipboardEventHandler;
}

export interface DropAreaOptions {
  onFiles?: (files: File[], event?: any) => void;
  onText?: (text: string, event?: any) => void;
  onUri?: (url: string, event?: any) => void;
}

const createProcess =
  (options: DropAreaOptions) => (dataTransfer: DataTransfer, event: any) => {
    const uri = dataTransfer.getData('text/uri-list');

    if (uri) {
      (options.onUri || noop)(uri, event);
      return;
    }

    if (dataTransfer.files && dataTransfer.files.length) {
      (options.onFiles || noop)(Array.from(dataTransfer.files), event);
      return;
    }

    if (event.clipboardData) {
      const text = event.clipboardData.getData('text');
      (options.onText || noop)(text, event);
      return;
    }
  };

function containsFiles(event: DragEvent) {
  if (event.dataTransfer?.types) {
    for (var i = 0; i < event.dataTransfer.types.length; i++) {
      if (event.dataTransfer.types[i] == 'Files') {
        return true;
      }
    }
  }

  return false;
}

const useDrop = (options: DropAreaOptions = {}, args = []): DropAreaState => {
  const { onFiles, onText, onUri } = options;
  const [over, setOverRaw] = useState<boolean>(false);
  const setOver = useCallback(setOverRaw, []);
  const process = useMemo(
    () => createProcess(options),
    [onFiles, onText, onUri]
  );

  useEffect(() => {
    const onDragOver = (event: DragEvent) => {
      event.preventDefault();
      if (containsFiles(event)) {
        console.log('TRUE 1', event.dataTransfer);
        setOver(true);
      }
    };

    const onDragEnter = (event: DragEvent) => {
      event.preventDefault();
      if (containsFiles(event)) {
        console.log('TRUE 2', event.dataTransfer);
        setOver(true);
      }
    };

    const onDragLeave = (evt: DragEvent) => {
      console.log('FALSE 1', evt);
      setOver(false);
    };

    const onDragExit = (evt: DragEvent) => {
      console.log('FALSE 2', evt);
      setOver(false);
    };

    const onDrop = (event: DragEvent) => {
      event.preventDefault();
      console.log('FALSE 3');
      setOver(false);
      if (event.dataTransfer) {
        process(event.dataTransfer, event);
      }
    };

    const onPaste = (event: any) => {
      process(event.clipboardData, event);
    };

    on(document, 'dragover', onDragOver);
    on(document, 'dragenter', onDragEnter);
    on(document, 'dragleave', onDragLeave);
    on(document, 'dragexit', onDragExit);
    on(document, 'drop', onDrop);
    if (onText) {
      on(document, 'paste', onPaste);
    }

    return () => {
      console.log('OFF');
      off(document, 'dragover', onDragOver);
      off(document, 'dragenter', onDragEnter);
      off(document, 'dragleave', onDragLeave);
      off(document, 'dragexit', onDragExit);
      off(document, 'drop', onDrop);
      off(document, 'paste', onPaste);
    };
  }, [process, ...args]);

  return { over };
};

export default useDrop;
