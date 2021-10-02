import { atom } from "recoil";
import { FileT } from "../schema";

export const currentFileState = atom<FileT | null>({
  key: "currentFileState",
  default: null,
});
