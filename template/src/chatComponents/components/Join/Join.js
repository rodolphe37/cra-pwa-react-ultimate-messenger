import React, { Fragment, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { useRecoilState } from "recoil";
import Alert from "baseLayout/shared/alertComponent/customAlert/Alert";
import isOnlineAtom from "chatComponents/stateManager/atoms/isOnlineAtom";
import OfflineMessage from "baseLayout/shared/offlineMessage/OfflineMessage";
import axios from "axios";
import { setUserSession } from "Utils/Common";

import "./Join.css";

const Join = ({ isAdmin, setIsAdmin, ...props }) => {
  let history = useHistory();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const username = useFormInput("");
  const password = useFormInput("");
  const [error, setError] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [authToken, setAuthToken] = useState("");
  const [isOnline] = useRecoilState(isOnlineAtom);

  // handle button click of login form
  const handleLogin = () => {
    setError(null);
    setLoading(true);

    axios
      .post(`${process.env.REACT_APP_UPLOAD_WEBSERVICE}/users/signin`, {
        username: username.value,
        password: password.value,
      })
      .then((response) => {
        setUserSession(response.data.token, response.data.user);
        setAuthToken(response.data.token);
        setIsAdmin(true);
        console.log(response.data);
        setTimeout(() => {
          setLoading(false);
          history.push("/admin");
        }, 2000);
      })
      .catch((error) => {
        setLoading(false);
        setIsAdmin(true);
        console.log(error.message);
        if (error.message.status === 400)
          setError("All fields must be completed");
        else setError("Your password or your username is Wrong.");
      });
  };

  const handleCloseLogin = () => {
    setIsAdmin(false);
    setTimeout(() => {
      history.push("/");
    }, 50);
  };

  useEffect(() => {
    console.log("isOnline:", isOnline);
  }, [isOnline]);
  return (
    <div className="join-container">
      <div style={{ width: "100%", position: "absolute", zIndex: 888, top: 0 }}>
        {isOnline === "offline" ? (
          <OfflineMessage type="danger" content={`${t("offlineMessage")}`} />
        ) : null}
      </div>
      <div className="joinOuterContainer">
        <div
          className="messagesLogin"
          style={{ textTransform: "lowercase !important" }}
        >
          <Alert
            title={`${t("adminAlertTitle")} ${t("adminAlertSubtitle")}`}
            buttonNo={`${t("adminAlertButton")}`}
          />
        </div>

        <div className="joinInnerContainer">
          <div className="title-login">
            <h1 className="heading">{t("loginTitle")}</h1>
            <button onClick={handleCloseLogin} className="closeJoinButton">
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
            <div className="loginForm" style={{ color: "#fff" }}>
              <br />
              <br />
              <div>
                Username
                <br />
                <input
                  type="text"
                  {...username}
                  placeholder="admin"
                  autoComplete="new-password"
                />
              </div>
              <div style={{ marginTop: 10 }}>
                Password
                <br />
                <input
                  placeholder="p@ssword"
                  type="password"
                  {...password}
                  autoComplete="new-password"
                />
              </div>
              {error && (
                <Fragment>
                  <small style={{ color: "red" }}>{error}</small>
                  <br />
                </Fragment>
              )}
              <br />
              <input
                type="button"
                value={loading ? "Loading..." : "Login"}
                onClick={handleLogin}
                disabled={loading}
              />
              <br />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const useFormInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (e) => {
    setValue(e.target.value);
  };
  return {
    value,
    onChange: handleChange,
  };
};

export default Join;
