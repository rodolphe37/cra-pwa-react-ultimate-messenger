import { isMobile } from "react-device-detect";
import { withAdminPanel } from "postInstallConfig/withAdmin";
import LoginIcon from "chatComponents/assets/reglages.svg";
import "./headerApp.css";

const HeaderApp = ({ changeLanguage, handleClickIsAdmin }) => {
  const withAdmin = withAdminPanel;

  return (
    <div className="header-headContent">
      <div
        className={
          withAdmin
            ? "changeLanguague-container"
            : "changeLanguague-container changeLanguague-container-without-admin"
        }
      >
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
          <span className="tradButtonen" onClick={() => changeLanguage("en")}>
            <span role="img" aria-label="england flag">
              🇬🇧
            </span>
          </span>
        </span>
      </div>
      {withAdmin ? (
        <div className="admin-button">
          <button onClick={handleClickIsAdmin} className="adminButton">
            <img src={LoginIcon} alt="" />
          </button>
        </div>
      ) : (
        <h1>
          Welcome to your PWA&nbsp;
          {isMobile ? <br /> : null}
          React template
        </h1>
      )}
    </div>
  );
};

export default HeaderApp;
