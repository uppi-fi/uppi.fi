import { useEffect } from "react";
import { useDropArea } from "react-use";
import { useSetRecoilState } from "recoil";
import { appState } from "../state/appState";
import { useUpload } from "./useUpload";

export function useDragAndDrop() {
  const upload = useUpload();
  const setAppState = useSetRecoilState(appState);

  const [bond, state] = useDropArea({
    onFiles: (files: File[]) => {
      if (files.length === 1) {
        upload(files[0]);
      }
    },
  });

  useEffect(() => {
    setAppState((old) => ({
      ...old,
      draggingFile: state.over,
    }));
  }, [state.over]);

  return bond;
}
