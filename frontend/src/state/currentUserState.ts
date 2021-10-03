import { UserT } from "@shared/schema";
import { atom } from "recoil";
import { localStorageEffect } from "./localStorageEffect";

export const currentUserState = atom<UserT | null>({
  key: "currentUserState",
  default: null,
  effects_UNSTABLE: [localStorageEffect("currentUser")],
});
