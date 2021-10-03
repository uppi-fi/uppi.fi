import { FileT } from "@shared/schema";
import { atom } from "recoil";

export const uploadedFileState = atom<FileT | null>({
  key: "uploadedFileState",
  default: null,
});
