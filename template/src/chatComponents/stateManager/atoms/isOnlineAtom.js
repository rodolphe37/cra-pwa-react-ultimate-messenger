import { atom } from "recoil";

const isOnlineAtom = atom({
  key: "isOnlineState",
  default: "online",
});

export default isOnlineAtom;
