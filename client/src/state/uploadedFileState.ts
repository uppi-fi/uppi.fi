import { atom } from "recoil";
import { FileT } from "shared";

export const uploadedFileState = atom<FileT | null>({
  key: "uploadedFileState",
  default: null,
});
