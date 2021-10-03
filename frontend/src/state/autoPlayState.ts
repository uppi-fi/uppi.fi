import { atom } from "recoil";
import { localStorageEffect } from "./localStorageEffect";

export const autoPlayState = atom<{
  audio: boolean;
  video: boolean;
}>({
  key: "autoPlayState",
  default: {
    audio: false,
    video: false,
  },
  effects_UNSTABLE: [localStorageEffect("autoPlay")],
});
