import React, { useEffect, useState } from "react";
import "./baseLayoutApp.css";
import { isMobile } from "react-device-detect";
import BottomMenu from "../components/bottomMenu/BottomMenu";
import { withBottomMenu } from "../postInstallConfig/withBottomMenu";
import { withRadialMenu } from "../postInstallConfig/withRadialMenu";
import RadialMenu from "../components/radialMenu/RadialMenu";
import HeaderApp from "../components/HeaderApp";
import isAdminAtom from "../chatComponents/stateManager/atoms/isAdminAtom";
import { useRecoilState } from "recoil";
import axios from "axios";
import { useTranslation } from "react-i18next";
import isLanguageAtom from "../chatComponents/stateManager/atoms/isLanguageAtom";
import Alert from "../chatComponents/customAlert/Alert";
import { getToken, removeUserSession, setUserSession } from "../Utils/Common";
import isOnlineAtom from "../chatComponents/stateManager/atoms/isOnlineAtom";
import useWebPush from "../chatComponents/hooks/useWebPush";
import clickedOffChatAtom from "../chatComponents/stateManager/atoms/clickedOffChatAtom";
import OfflineMessage from "../chatComponents/components/offlineMessage/OfflineMessage";
import Routes from "../Utils/routes";
import { useGeolocation } from "../hooks/useGeolocation";

const BaseLayoutApp = (props) => {
  const { children } = props;
  const [isAdmin, setIsAdmin] = useRecoilState(isAdminAtom);
  // eslint-disable-next-line no-unused-vars
  const [language, setLanguage] = useRecoilState(isLanguageAtom);
  const { i18n, t } = useTranslation();
  // eslint-disable-next-line no-unused-vars
  const [authLoading, setAuthLoading] = useState(true);

  // function for changing languages
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setLanguage(lng);
  };

  const handleClickIsAdmin = () => {
    if (isAdmin) {
      setIsAdmin(false);
    }
    if (!isAdmin) {
      setIsAdmin(true);
    }
  };

  const [loadWelcomeAlert, setLoadWelcomeAlert] = useState(true);

  const handleLoadAlert = () => {
    setIsAdmin(false);
    setTimeout(() => {
      setLoadWelcomeAlert(false);
    }, 2000);
  };

  useEffect(() => {
    handleLoadAlert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const [isOnline] = useRecoilState(isOnlineAtom);

  const { customWebPush } = useWebPush();
  const [clickedOffChat] = useRecoilState(clickedOffChatAtom);

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

  return (
    <div className="layout-container-App">
      {!loadWelcomeAlert && sessionStorage.getItem("welcome") === null ? (
        <Alert
          title={`${t("exampleReUseAlertTitle")} ${t("exampleReUseAlertMood")}`}
          confirmMessage={`${t("exampleReUseAlertconfirmMood")}`}
          buttonYes={`${t("exampleReUseAlertGoesWell")}`}
          buttonNo={`${t("exampleReUseAlertPissesOff")}`}
        />
      ) : null}
      <HeaderApp
        changeLanguage={changeLanguage}
        handleClickIsAdmin={handleClickIsAdmin}
      />
      <main className="cover-App">
        {isOnline === "offline" && clickedOffChat ? (
          <OfflineMessage type="danger" content="offlineMessage" />
        ) : null}
        <div className="wrapper-App">{children}</div>
      </main>
      <div className="MenuApp">
        {withBottomMenu && isMobile && !isAdmin ? <BottomMenu /> : null}
        {withRadialMenu && isMobile && !isAdmin ? <RadialMenu /> : null}
      </div>
      <Routes />
    </div>
  );
};

export default BaseLayoutApp;
