/* eslint-disable no-unused-vars */
import React, { Fragment, useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Routes from "./Utils/routes";
import { useRecoilState } from "recoil";
import selectedDarkThemeAtom from "./chatComponents/stateManager/atoms/selectedDarkThemeAtom";
import { useTranslation } from "react-i18next";
import isLanguageAtom from "./chatComponents/stateManager/atoms/isLanguageAtom";
import Alert from "./chatComponents/customAlert/Alert";
import useWebPush from "./chatComponents/hooks/useWebPush";
import pwaPass from "./chatComponents/assets/pwa-pass-3.svg";
import isOnlineAtom from "./chatComponents/stateManager/atoms/isOnlineAtom";
import OfflineMessage from "./chatComponents/components/offlineMessage/OfflineMessage";
import clickedOffChatAtom from "./chatComponents/stateManager/atoms/clickedOffChatAtom";
import { getToken, removeUserSession, setUserSession } from "./Utils/Common";
import axios from "axios";
import registerUserAtom from "./chatComponents/stateManager/atoms/registeruserAtom";
import isAdminAtom from "./chatComponents/stateManager/atoms/isAdminAtom";
import HeaderApp from "./components/HeaderApp";
import RecoilSimpleExample from "./components/RecoilSimpleExample";
import { withRecoilExample } from "./postInstallConfig/withRecoilExample";
import { useGeolocation } from "./hooks/useGeolocation";
import Drops from "./components/drops/Drops";
import { isMobile } from "react-device-detect";
import BottomMenu from "./components/bottomMenu/BottomMenu";
import { withBottomMenu } from "./postInstallConfig/withBottomMenu";
import { withRadialMenu } from "./postInstallConfig/withRadialMenu";
import RadialMenu from "./components/radialMenu/RadialMenu";

const App = () => {
  const [isAdmin, setIsAdmin] = useRecoilState(isAdminAtom);
  const [selectedDarkTheme] = useRecoilState(selectedDarkThemeAtom);
  const [language, setLanguage] = useRecoilState(isLanguageAtom);
  const { i18n, t } = useTranslation();

  const geoObj = useGeolocation();
  if (geoObj) {
    let lat = geoObj.lat;
    let lng = geoObj.lng;

    const fetchLocationName = async () => {
      await fetch(
        process.env.REACT_APP_CITY_LOCATION +
          lat +
          "%2C" +
          lng +
          "&outFormat=json&thumbMaps=false"
      )
        .then((response) => response.json())
        .then((responseJson) => {
          localStorage.setItem("cityInfos", JSON.stringify(responseJson));
        });
    };
    fetchLocationName();
  }

  // function for changing languages
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setLanguage(lng);
  };
  // primitif hook for loading during the render of the app page i18n language in language global state
  useEffect(() => {
    setLanguage(i18n.language);
    console.log("lng :", language);
  }, [language, setLanguage, i18n]);

  // eslint-disable-next-line no-unused-vars
  const [isOnline, setIsOnline] = useRecoilState(isOnlineAtom);

  const { customWebPush } = useWebPush();
  const [clickedOffChat] = useRecoilState(clickedOffChatAtom);
  const [registerUser] = useRecoilState(registerUserAtom);

  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("token");
    // THIS WEBPUSH APPEAR ONLY IF IS BROWSER OR ANDROID PHONES

    // THIS FIRST WEBPUSH IS WELCOME MESSAGE
    if (sessionStorage.getItem("hello") === null) {
      customWebPush({
        NotificationMessage: "Bienvenue sur React Ultimate Chat!",
      });
      setTimeout(() => {
        sessionStorage.setItem("hello", true);
      }, 1200);
    }

    return () => {
      sessionStorage.removeItem("hello");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [loadWelcomeAlert, setLoadWelcomeAlert] = useState(true);

  const handleLoadAlert = () => {
    setIsAdmin(false);
    setTimeout(() => {
      setLoadWelcomeAlert(false);
    }, 2000);
  };

  useEffect(() => {
    handleLoadAlert();
    console.log("clicked off :", clickedOffChat);
    console.log("isOnline :", isOnline);
    console.log("register from App :", registerUser);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clickedOffChat, registerUser, isOnline]);

  useEffect(() => {
    setTimeout(() => {
      sessionStorage.setItem("welcome", true);
    }, 2570);

    return () => {
      return () => {
        sessionStorage.removeItem("welcome");
      };
    };
  }, []);
  const handleClickIsAdmin = () => {
    if (isAdmin) {
      setIsAdmin(false);
    }
    if (!isAdmin) {
      setIsAdmin(true);
    }
  };

  useEffect(() => {
    const token = getToken();
    if (!token) {
      return;
    }

    axios
      .get(
        `${process.env.REACT_APP_UPLOAD_WEBSERVICE}/verifyToken?token=${token}`
      )
      .then((response) => {
        setUserSession(response.data.token, response.data.user);
        setAuthLoading(false);
      })
      .catch((error) => {
        removeUserSession();
        setAuthLoading(false);
      });
  }, []);

  return (
    <Fragment>
      {!isAdmin ? (
        <Fragment>
          {!loadWelcomeAlert && sessionStorage.getItem("welcome") === null ? (
            <Alert
              title={`${t("exampleReUseAlertTitle")} ${t(
                "exampleReUseAlertMood"
              )}`}
              confirmMessage={`${t("exampleReUseAlertconfirmMood")}`}
              buttonYes={`${t("exampleReUseAlertGoesWell")}`}
              buttonNo={`${t("exampleReUseAlertPissesOff")}`}
            />
          ) : null}
          <div
            className={
              selectedDarkTheme
                ? "App light-background"
                : "App  dark-background"
            }
          >
            <HeaderApp
              changeLanguage={changeLanguage}
              handleClickIsAdmin={handleClickIsAdmin}
            />
            <header
              className={
                selectedDarkTheme
                  ? "App-header light-background black"
                  : "App-header dark-background "
              }
            >
              {isOnline === "offline" && clickedOffChat ? (
                <OfflineMessage type="danger" content="offlineMessage" />
              ) : null}
              <div className="card-ribbon pwa-ribbon">
                <span className="pwa">
                  <img
                    style={{ width: 80, marginLeft: -4, marginTop: 6 }}
                    src={pwaPass}
                    alt="pwa-logo"
                  />
                </span>
                <div className="drop-container">
                  <Drops />
                </div>
              </div>

              <p>
                {t("editAppText")} <code>src/App.js</code> {t("saveAppText")}
              </p>
              <a
                className="App-link"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("learnAppText")}
              </a>
              <br />
              {withRecoilExample ? (
                <RecoilSimpleExample t={t} logo={logo} />
              ) : (
                <span style={{ cursor: "pointer" }}>
                  <img src={logo} className="App-logo" alt="logo" />
                </span>
              )}
            </header>
          </div>
          {withBottomMenu && isMobile ? <BottomMenu /> : null}
          {withRadialMenu && isMobile ? <RadialMenu /> : null}
        </Fragment>
      ) : null}
      <Routes />
    </Fragment>
  );
};

export default App;
