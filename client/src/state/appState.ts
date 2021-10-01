import { atom } from "recoil";
import { FileT } from "shared";

interface AppStateT {
  draggingFile: boolean;
  uploadProgress: number;
  currentFile: FileT | null;
  uploadedFile: FileT | null;
}

export const appState = atom<AppStateT>({
  key: "appState",
  default: {
    draggingFile: false,
    uploadProgress: 0,
    uploadedFile: null,
    currentFile: null,
  },
});
