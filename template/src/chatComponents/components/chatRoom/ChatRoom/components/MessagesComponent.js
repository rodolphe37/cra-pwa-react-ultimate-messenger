import { Fragment } from "react";
import { useAlert } from "react-alert";

const MessagesComponent = ({
  messages,
  openVideoChat,
  clickedSound1,
  clickedSound2,
  sound,
  sound2,
  handleClickOnName,
  clickedOnName,
  userAllInfos,
  isNotAlphaNumeric,
  setIdForDeleteButton,
  handletoggleDeleteButton,
  seingMedia,
  toggleDeleteButton,
  messagesEndRef,
  t,
  clickedCopyId,
  CopyToClipboard,
  idChatInvitation,
  setClickedCopyId,
  Thumb,
  cloud,
  Weather,
  idForDeleteButton,
  setMessageIsToDelete,
  DeleteConvButton,
}) => {
  const alert = useAlert();
  return (
    <div>
      <ol className="messages-list">
        {messages.map((message, i) => {
          return (
            <span key={i} className="messages-section">
              <span>
                {!message.ownedByCurrentUser && !openVideoChat ? (
                  <span>
                    {clickedSound1 && (
                      <audio autoPlay>
                        <source src={sound} />
                      </audio>
                    )}
                  </span>
                ) : null}

                {!message.ownedByCurrentUser && !openVideoChat ? (
                  <span>
                    {clickedSound2 && (
                      <audio autoPlay>
                        <source src={sound2} />
                      </audio>
                    )}
                  </span>
                ) : null}

                <ul className="message-date">{message.timeStamp}</ul>
                <p
                  onClick={handleClickOnName}
                  style={{
                    fontSize: 11,
                    marginBottom: -20,
                    marginTop: 5,
                  }}
                  className={`message-item ${
                    message.ownedByCurrentUser
                      ? "my-message-name"
                      : "received-message-name"
                  }`}
                >
                  {" "}
                  {!clickedOnName && message.username && message.ip
                    ? userAllInfos &&
                      userAllInfos.flag + " - " + message.username
                    : clickedOnName && message.username
                    ? userAllInfos &&
                      message.ip &&
                      userAllInfos.flag + "- Adresse ip :" + message.ip
                    : null}
                  {!clickedOnName && !message.username
                    ? userAllInfos &&
                      message.ip &&
                      userAllInfos.flag + "- Adresse ip :" + message.ip
                    : clickedOnName && !message.username
                    ? userAllInfos &&
                      message.ip &&
                      userAllInfos.flag + "- Adresse ip :" + message.ip
                    : null}
                  {!message.ip && "ChatBot"}
                </p>
                <li
                  style={{ position: "relative" }}
                  className={`message-item ${
                    isNotAlphaNumeric(message.body) ? "height45 jello" : ""
                  } ${
                    message.ownedByCurrentUser
                      ? "my-message"
                      : "received-message"
                  }`}
                  onClick={() => {
                    setIdForDeleteButton(message.id);
                    handletoggleDeleteButton();
                  }}
                >
                  {message.picture && (
                    <span className="messagesContent">
                      <img
                        className="chatbot-img"
                        src={message.picture}
                        alt="botPicture"
                      />
                      {isNotAlphaNumeric(message.body) ? (
                        <p
                          style={{
                            fontSize: 23,
                            marginTop: 0,
                            marginBottom: 0,
                          }}
                        >
                          {message.body}
                        </p>
                      ) : (
                        <p
                          style={{ marginTop: 0, marginBottom: 0 }}
                          className="chatbot-text"
                        >
                          {message.body}
                        </p>
                      )}
                    </span>
                  )}
                  {message.body?.includes("jpg", 0) ||
                  message.body?.includes("JPG", 0) ||
                  message.body?.includes("jpeg", 0) ||
                  message.body?.includes("JPEG", 0) ||
                  message.body?.includes("png", 0) ||
                  message.body?.includes("PNG", 0) ? (
                    <Fragment>
                      {seingMedia ? (
                        <span className="display-picture">
                          <img
                            style={{
                              borderRadius: 11,
                              maxWidth: 186,
                              maxHeight: 200,
                            }}
                            src={`${process.env.REACT_APP_UPLOAD_WEBSERVICE}/files/${message.body}`}
                            alt=""
                          />
                          {message.comment && (
                            <Fragment>
                              <p style={{ textAlign: "center" }}>
                                {message.comment}
                              </p>
                            </Fragment>
                          )}
                          {!toggleDeleteButton && <div ref={messagesEndRef} />}
                        </span>
                      ) : (
                        <span
                          className="button-display-picture"
                          style={{ textAlign: "center" }}
                        >
                          {message.ownedByCurrentUser ? (
                            <h2 className="seingMedia-title">
                              {t("sendPicture")}
                            </h2>
                          ) : (
                            <h2 className="seingMedia-title">
                              {t("receivePicture")}
                            </h2>
                          )}

                          <sub
                            style={{
                              fontWeight: "bold",
                              fontSize: 10,
                              color: "rgb(40 38 38)",
                            }}
                          >
                            {t("desactivatePicture")}
                          </sub>
                          <p className="seingMedia-text">
                            {t("functionSettingPicture")}
                          </p>
                          {!toggleDeleteButton && <div ref={messagesEndRef} />}
                        </span>
                      )}
                    </Fragment>
                  ) : !message.picture && isNotAlphaNumeric(message.body) ? (
                    <p
                      style={{
                        fontSize: 23,
                        marginTop: 0,
                        marginBottom: 0,
                      }}
                    >
                      {message.body}
                    </p>
                  ) : (
                    !message.picture &&
                    !message.body.includes("thumbs-up-facebook.svg") &&
                    message.body
                  )}
                  {message.body.includes("Invitation vidéo") ||
                  message.body.includes("Video invitation")
                    ? !message.ownedByCurrentUser &&
                      (!clickedCopyId ? (
                        <CopyToClipboard text={idChatInvitation}>
                          <button
                            disabled={clickedCopyId ? true : false}
                            className={
                              clickedCopyId
                                ? "idForCallInvitation-clicked"
                                : "idForCallInvitation"
                            }
                            onClick={() => {
                              setClickedCopyId(true);
                              alert.success(
                                `${t("youHaveCopiedId")}: ${idChatInvitation}.`
                              );
                            }}
                          >
                            Copiez
                          </button>
                        </CopyToClipboard>
                      ) : (
                        <Fragment>
                          <p>Le chat vidéo est entrain de démarrer...</p>
                        </Fragment>
                      ))
                    : null}
                  {message.body.includes("thumbs-up-facebook.svg") && (
                    <img
                      className="shake-bottom"
                      style={{ width: 40, cursor: "pointer" }}
                      src={Thumb}
                      alt="thumb"
                    />
                  )}
                  {message.body.includes("&météo") ||
                  message.body.includes("&weather") ? (
                    <div
                      className={
                        message.ownedByCurrentUser ? "weather-content" : ""
                      }
                    >
                      <img src={cloud} alt="cloud" className="weatherIcon" />
                      <Weather />
                    </div>
                  ) : null}

                  {message.id === idForDeleteButton ? (
                    <button
                      className={
                        message.ownedByCurrentUser
                          ? toggleDeleteButton
                            ? "deleteIconBubble scale-in-center"
                            : "deleteIconBubble hiddenParams"
                          : toggleDeleteButton
                          ? "deleteIconBubble leftBubble scale-in-center "
                          : "deleteIconBubble hiddenparams"
                      }
                      onClick={() => {
                        setMessageIsToDelete(message.id);
                      }}
                    >
                      <img
                        style={{
                          width: 24,
                        }}
                        src={DeleteConvButton}
                        alt="del"
                        className={
                          message.id && toggleDeleteButton
                            ? "delete-bubble"
                            : "hiddenParams"
                        }
                      />
                    </button>
                  ) : null}
                </li>
                {!toggleDeleteButton && <div ref={messagesEndRef} />}
              </span>
              {!toggleDeleteButton && <div ref={messagesEndRef} />}
            </span>
          );
        })}
      </ol>
    </div>
  );
};

export default MessagesComponent;
