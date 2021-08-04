import { atom } from "recoil";

const passwordAtom = atom({
  key: "passwordState",
  default:
    localStorage.getItem("password") !== null
      ? localStorage.getItem("password")
      : "",
});

export default passwordAtom;
