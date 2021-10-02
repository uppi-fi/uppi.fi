import { atom } from "recoil";

export const uploadProgresState = atom<number>({
  key: "uploadProgresState",
  default: 0,
});
