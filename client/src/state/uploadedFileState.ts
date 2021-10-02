import { atom } from "recoil";
import { FileT } from "../schema";

export const uploadedFileState = atom<FileT | null>({
  key: "uploadedFileState",
  default: null,
});
