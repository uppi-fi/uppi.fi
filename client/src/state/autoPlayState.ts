import { atom } from "recoil";
import { localStorageEffect } from "./localStorageEffect";

export const autoPlayState = atom<boolean>({
  key: "autoPlayState",
  default: false,
  effects_UNSTABLE: [localStorageEffect("autoPlay")],
});
