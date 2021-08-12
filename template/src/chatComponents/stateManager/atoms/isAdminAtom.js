import { atom } from "recoil";

const isAdminAtom = atom({
  key: "isAdminState",
  default: false,
});

export default isAdminAtom;
