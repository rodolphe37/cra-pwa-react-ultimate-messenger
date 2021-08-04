import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useHistory } from "react-router-dom";
import { useRecoilState } from "recoil";
import Alert from "../../customAlert/Alert";
import passwordAtom from "../../stateManager/atoms/passwordAtom";
import usernameAtom from "../../stateManager/atoms/usernameAtom";

import "./Join.css";
var CryptoJS = require("crypto-js");

const Join = ({ isAdmin, setIsAdmin }) => {
  let history = useHistory();
  const { t } = useTranslation();
  const [name, setName] = useRecoilState(usernameAtom);
  const [encryptPassword, setEncryptPassword] = useRecoilState(passwordAtom);
  const [password, setPassword] = useState("");
  const [notShowPass, setNotShowPass] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const [forDecrypt, setForDecrypt] = useState("");

  var ciphertext = CryptoJS.AES.encrypt(
    JSON.stringify(password),
    "my-secret-key@123"
  ).toString();

  // Decrypt
  var bytes = CryptoJS.AES.decrypt(ciphertext, "my-secret-key@123");
  var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

  useEffect(() => {
    if (password) {
      setEncryptPassword(ciphertext);
    }
    if (sessionStorage.getItem("password") !== null) {
      setForDecrypt(sessionStorage.getItem("password"));
      setPassword(password);
    }
    if (localStorage.getItem("username") !== null) {
      setName(localStorage.getItem("username"));
    }
    sessionStorage.setItem("password", encryptPassword);
    console.log("name :", name);
    //log encrypted data
    console.log("Encrypt Data -");
    console.log(ciphertext);
    console.log(password);
    console.log("encrypt Password :", encryptPassword);
    //log decrypted Data
    console.log("decrypted Data -");
    console.log(decryptedData);
    return () => {
      // setEncryptPassword("");
      // sessionStorage.removeItem("password");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [password]);

  const handleShowPass = () => {
    if (notShowPass) {
      setNotShowPass(false);
    }
    if (!notShowPass) {
      setNotShowPass(true);
      setTimeout(() => {
        setNotShowPass(false);
      }, 2500);
    }
  };
  return (
    <div className="join-container">
      <div className="joinOuterContainer">
        <div className="joinInnerContainer">
          <div className="title-login">
            <h1 className="heading">{t("loginTitle")}</h1>
            <button
              onClick={() => {
                setIsAdmin(false);
                history.push("/");
              }}
              className="closeJoinButton"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                width="28px"
                height="28px"
              >
                <linearGradient
                  id="hbE9Evnj3wAjjA2RX0We2a"
                  x1="7.534"
                  x2="27.557"
                  y1="7.534"
                  y2="27.557"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0" stopColor="#f44f5a" />
                  <stop offset=".443" stopColor="#ee3d4a" />
                  <stop offset="1" stopColor="#e52030" />
                </linearGradient>
                <path
                  fill="url(#hbE9Evnj3wAjjA2RX0We2a)"
                  d="M42.42,12.401c0.774-0.774,0.774-2.028,0-2.802L38.401,5.58c-0.774-0.774-2.028-0.774-2.802,0	L24,17.179L12.401,5.58c-0.774-0.774-2.028-0.774-2.802,0L5.58,9.599c-0.774,0.774-0.774,2.028,0,2.802L17.179,24L5.58,35.599	c-0.774,0.774-0.774,2.028,0,2.802l4.019,4.019c0.774,0.774,2.028,0.774,2.802,0L42.42,12.401z"
                />
                <linearGradient
                  id="hbE9Evnj3wAjjA2RX0We2b"
                  x1="27.373"
                  x2="40.507"
                  y1="27.373"
                  y2="40.507"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0" stopColor="#a8142e" />
                  <stop offset=".179" stopColor="#ba1632" />
                  <stop offset=".243" stopColor="#c21734" />
                </linearGradient>
                <path
                  fill="url(#hbE9Evnj3wAjjA2RX0We2b)"
                  d="M24,30.821L35.599,42.42c0.774,0.774,2.028,0.774,2.802,0l4.019-4.019	c0.774-0.774,0.774-2.028,0-2.802L30.821,24L24,30.821z"
                />
              </svg>
            </button>
          </div>
          <form>
            <div style={{ marginTop: 22 }}>
              <b style={{ color: "#fff" }}>{t("loginUsername")}</b>
              <input
                placeholder=""
                className="joinInput"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                marginTop: 12,
                position: "relative",
              }}
            >
              <b style={{ color: "#fff", marginTop: 12, marginBottom: -22 }}>
                {t("loginPassword")}
              </b>
              <input
                onClick={handleShowPass}
                placeholder=""
                className="joinInput mt-20"
                type={notShowPass ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                // autoComplete="current password"
                required
                id="funkystyling"
              />

              <p
                onClick={() => {
                  sessionStorage.removeItem("password");
                  setEncryptPassword("");
                  setPassword("");
                }}
                style={{
                  fontSize: 10,
                  color: "#fff",
                  marginTop: 10,
                  cursor: "pointer",
                }}
              >
                {t("loginDeletePassword")}
              </p>
            </div>
          </form>
          <Link
            onClick={(e) =>
              !name || !password
                ? e.preventDefault() && (
                    <Alert
                      title={"Vous devez entrer Vos Username et password"}
                      buttonNo={"ok, j'ai compris"}
                    />
                  )
                : null
            }
            to={`/admin/name=${name}&password=${ciphertext}`}
          >
            <button className="button mt-20" type="submit">
              {t("loginButton")}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Join;
