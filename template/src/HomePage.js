import { Fragment } from "react";
import logo from "./logo.svg";
import { useRecoilState } from "recoil";
import selectedDarkThemeAtom from "./chatComponents/stateManager/atoms/selectedDarkThemeAtom";
import { useTranslation } from "react-i18next";
import pwaPass from "./chatComponents/assets/pwa-pass-3.svg";
import isAdminAtom from "./chatComponents/stateManager/atoms/isAdminAtom";
import RecoilSimpleExample from "./components/RecoilSimpleExample";
import { withRecoilExample } from "./postInstallConfig/withRecoilExample";
import Drops from "./components/drops/Drops";
import BaseLayoutApp from "./baseLayout/BaseLayout";

const HomePage = () => {
  const [isAdmin] = useRecoilState(isAdminAtom);
  const [selectedDarkTheme] = useRecoilState(selectedDarkThemeAtom);
  const { t } = useTranslation();

  return (
    <BaseLayoutApp>
      {!isAdmin ? (
        <Fragment>
          <div
            className={
              selectedDarkTheme
                ? "App light-background"
                : "App  dark-background"
            }
          >
            <header
              className={
                selectedDarkTheme
                  ? "App-header light-background black"
                  : "App-header dark-background "
              }
            >
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
        </Fragment>
      ) : null}
    </BaseLayoutApp>
  );
};

export default HomePage;
