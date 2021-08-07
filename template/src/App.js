import React, { Fragment, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import HomeChat from "./chatComponents/components/chatRoom/HomeChat/HomeChat";
import logo from "./logo.svg";
import "./App.css";
import ChatRoom from "./chatComponents/components/chatRoom/ChatRoom/ChatRoom";
import Join from "./chatComponents/components/Join/Join";
import ButtonChat from "./chatComponents/components/ButtonChat";
import { useRecoilState } from "recoil";
import selectedDarkThemeAtom from "./chatComponents/stateManager/atoms/selectedDarkThemeAtom";
import VideoChatComponent from "./chatComponents/components/videoChatComponent/VideoChatComponent";
import Loader from "./chatComponents/components/loader/Loader";
import { useTranslation } from "react-i18next";
import BottomDrawer from "./chatComponents/components/bottomDrawer/BottomDrawer";
import Weather from "./chatComponents/components/weatherComponent/WeatherComponent";
// THIS TWO IMPORTS ARE ONLY FOR THE EXAMPLE
import exampleSelector from "./chatComponents/stateManager/selectors/exampleSelector";
import exampleClickedAtom from "./chatComponents/stateManager/atoms/exampleClicked";
import isLanguageAtom from "./chatComponents/stateManager/atoms/isLanguageAtom";
import Alert from "./chatComponents/customAlert/Alert";
import roomIdAtom from "./chatComponents/stateManager/atoms/roomIdAtom";
import AdminPanel from "./adminDashboard/AdminPanel";
import LoginIcon from "./chatComponents/assets/reglages.svg";
import AdminPanel2 from "./adminDashboard/AdminPanel2";
import useWebPush from "./chatComponents/hooks/useWebPush";
import pwaPass from "./chatComponents/assets/pwa-pass-3.svg";
import isOnlineAtom from "./chatComponents/stateManager/atoms/isOnlineAtom";
import OfflineMessage from "./chatComponents/components/offlineMessage/OfflineMessage";
import clickedOffChatAtom from "./chatComponents/stateManager/atoms/clickedOffChatAtom";

const App = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [selectedDarkTheme] = useRecoilState(selectedDarkThemeAtom);
  // eslint-disable-next-line no-unused-vars
  const [language, setLanguage] = useRecoilState(isLanguageAtom);
  const { i18n, t } = useTranslation();
  // function for changing languages
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    // setLanguage(lng);
  };
  // Natif hook for loading during the render of the app page i18n language in language global state
  useEffect(() => {
    setLanguage(i18n.language);
    console.log("lng :", language);
  }, [language, setLanguage, i18n]);

  const [roomId] = useRecoilState(roomIdAtom);
  // eslint-disable-next-line no-unused-vars
  const [isOnline, setIsOnline] = useRecoilState(isOnlineAtom);
  // EXAMPLE OF HOW TO USE RECOIL (ATOM AND SELECTOR) WITH EASE
  const [exampleState] = useRecoilState(exampleSelector);
  const [clickedExample, setClickedExample] =
    useRecoilState(exampleClickedAtom);
  const { customWebPush } = useWebPush();
  const [clickedOffChat] = useRecoilState(clickedOffChatAtom);

  useEffect(() => {
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

  const handleClickExampleSelector = () => {
    if (!clickedExample) {
      setClickedExample(true);
    }
    if (clickedExample) {
      setClickedExample(false);
    }
  };
  // END OF EXAMPLE RECOIL STATE MANAGMENT
  const [loadWelcomeAlert, setLoadWelcomeAlert] = useState(true);

  const handleLoadAlert = () => {
    setTimeout(() => {
      setLoadWelcomeAlert(false);
    }, 2000);
  };

  useEffect(() => {
    handleLoadAlert();
    console.log("selector :", exampleState);
    console.log("clicked :", clickedExample);
    console.log("clicked off :", clickedOffChat);
    console.log("isOnline :", isOnline);
  }, [exampleState, clickedOffChat, clickedExample, isOnline]);

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
    console.log("is admin :", isAdmin);
  }, [isAdmin, setIsAdmin]);

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
            <div className="header-headContent">
              <div className="changeLanguague-container">
                <span
                  className="buttonLanguage"
                  style={{
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    position: "absolute",
                    zIndex: "888",
                    width: 87,
                  }}
                >
                  <span
                    className="tradButtonfr"
                    style={{ marginRight: "15px" }}
                    onClick={() => changeLanguage("fr")}
                  >
                    <span role="img" aria-label="france flag">
                      🇨🇵
                    </span>
                  </span>
                  <span
                    className="tradButtonen"
                    onClick={() => changeLanguage("en")}
                  >
                    <span role="img" aria-label="england flag">
                      🇬🇧
                    </span>
                  </span>
                </span>
              </div>
              <div className="admin-button">
                <button onClick={handleClickIsAdmin} className="adminButton">
                  <img src={LoginIcon} alt="" />
                </button>
              </div>
            </div>
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
              <span
                style={{ cursor: "pointer" }}
                onClick={handleClickExampleSelector}
              >
                <img src={logo} className="App-logo" alt="logo" />
              </span>
              <p style={{ fontSize: 18, maxWidth: 300, marginBottom: 22 }}>
                {t("exampleRecoil")}
              </p>
              <p style={{ fontSize: 15, maxWidth: 300 }}>{exampleState}</p>
            </header>
          </div>
        </Fragment>
      ) : null}

      <Router>
        <Switch>
          <Route exact path="/">
            {isAdmin ? <Redirect to="/login" /> : <ButtonChat />}
          </Route>
          <Route path="/login">
            <Join isAdmin={isAdmin} setIsAdmin={setIsAdmin} />
          </Route>
          <Route path="/home">
            <HomeChat />
          </Route>
          <Route path={`/chat/${roomId}`}>
            <ChatRoom />
          </Route>
          <Route path={`/video/${roomId}`}>
            <VideoChatComponent roomId={roomId} />
          </Route>
          <Route path="/load">
            <Loader />
          </Route>
          <Route path="/intro">
            <BottomDrawer />
          </Route>
          <Route path="/meteo">
            <Weather />
          </Route>
          <Route path="/admin">
            <AdminPanel2 isAdmin={isAdmin} setIsAdmin={setIsAdmin} />
          </Route>
          <Route path="/admin-alternate">
            <AdminPanel isAdmin={isAdmin} setIsAdmin={setIsAdmin} />
          </Route>
          <Route path="/alert">
            <Alert />
          </Route>
        </Switch>
      </Router>
    </Fragment>
  );
};

export default App;
