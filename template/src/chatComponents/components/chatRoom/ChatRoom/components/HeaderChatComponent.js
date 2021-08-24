import Parameters from "../../../parameters/Parameters";

const HeaderChatComponent = ({
  selectedDarkTheme,
  Bavarder,
  t,
  handleClickAlert,
  handleClickedOffChat,
}) => {
  return (
    <div>
      <span
        className={
          !selectedDarkTheme
            ? "room-name light-background"
            : "room-name dark-background"
        }
      >
        <img src={Bavarder} alt="icon" />
        <span className="head-text-chat">
          <h1>React Ultimate Messenger</h1>
          <sub>{t("subTitle")}</sub>
        </span>

        <div className="close-and-reduce-button">
          <Parameters />
          <div className="section-right-top-button">
            <button
              onClick={handleClickAlert}
              className={
                !selectedDarkTheme
                  ? "closed-button-container black"
                  : "closed-button-container white"
              }
            >
              X
            </button>
            <span className="reduceIcon-chat">
              <div
                onClick={handleClickedOffChat}
                className="icon-menuRight icon-right-chat"
              >
                <svg
                  style={{ marginLeft: 6 }}
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    filrule="evenodd"
                    clipRule="evenodd"
                    d="M18.3334 13H5.66675C5.11441 13 4.66675 12.5523 4.66675 12C4.66675 11.4477 5.11441 11 5.66675 11H18.3334C18.8857 11 19.3334 11.4477 19.3334 12C19.3334 12.5523 18.8857 13 18.3334 13Z"
                    fill={selectedDarkTheme ? "#ffffff" : "#000000"}
                  ></path>
                </svg>
              </div>
            </span>
          </div>
        </div>
      </span>
    </div>
  );
};

export default HeaderChatComponent;
