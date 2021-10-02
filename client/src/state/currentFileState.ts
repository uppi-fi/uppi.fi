import { atom } from "recoil";
import { FileT } from "shared";

export const currentFileState = atom<FileT | null>({
  key: "currentFileState",
  default: null,
});
