import { atom } from "recoil";
import { UserT } from "../schema";
import { localStorageEffect } from "./localStorageEffect";

export const currentUserState = atom<UserT | null>({
  key: "currentUserState",
  default: null,
  effects_UNSTABLE: [localStorageEffect("currentUser")],
});
