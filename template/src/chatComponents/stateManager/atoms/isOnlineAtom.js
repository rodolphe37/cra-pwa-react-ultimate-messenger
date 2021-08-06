import { atom } from "recoil";

const isOnlineAtom = atom({
  key: "isOnlineState",
  default: "offline",
});

export default isOnlineAtom;
