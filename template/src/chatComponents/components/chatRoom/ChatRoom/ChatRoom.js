/* eslint-disable no-unused-vars */
// MODULES IMPORTS
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useSpeechRecognition } from "react-speech-recognition";
import { Fragment, useEffect, useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { useRecoilState } from "recoil";
import { useTranslation } from "react-i18next";
// import { v4 as uuidv4 } from "uuid";
// CSS IMPORTS
import "./ChatRoom.css";
// HOOKS & SERVICES IMPORTS
import useChat from "../../../hooks/useChat";
import UploadService from "../../../services/FileUploadService";
import useGetUserInfos from "../../../hooks/useGetUserInfos";
// STATEMANAGMENT IMPORTS
import imageInfoAtom from "../../../stateManager/atoms/imageInfoAtom";
import seeMediaAtom from "../../../stateManager/atoms/seeMediaAtom";
import clickedParamsAtom from "../../../stateManager/atoms/clickedParamsAtom";
import selectedDarkThemeAtom from "../../../stateManager/atoms/selectedDarkThemeAtom";
import clickedSoundGuitarAtom from "../../../stateManager/atoms/clickedSoundGuitarAtom";
import clickedSoundSoftwareAtom from "../../../stateManager/atoms/clickedSoundSoftwareAtom";
import fileFromPictureAtom from "../../../stateManager/atoms/fileFromPictureAtom";
import isReceivedMediasMessageToUserAtom from "../../../stateManager/atoms/receiveMediasMessageToUserAtom";
import speechToTextAtom from "../../../stateManager/atoms/speechToTextAtom";
import plusSectionAtom from "../../../stateManager/atoms/plusSectionAtom";
import callEndedAtom from "../../../stateManager/atoms/callEndedAtom";
import messageForBotAtom from "../../../stateManager/atoms/messageForBotAtom";
import roomIdAtom from "../../../stateManager/atoms/roomIdAtom";
import usernameAtom from "../../../stateManager/atoms/usernameAtom";
// COMPONENTS IMPORTS
import EmptyChatMessage from "./components/EmptyChatMessage";
import Loader from "../../loader/Loader";
import Weather from "../../weatherComponent/WeatherComponent";
// ASSETS IMPORTS
import Bavarder from "../../../assets/chat.svg";
import sound from "../../../assets/sounds/mixkit-guitar-notification-alert-2320.mp3";
import sound2 from "../../../assets/sounds/mixkit-software-interface-back-2575.mp3";
import VideoCall from "../../../assets/video-chat-icon.svg";
import plus from "../../../assets/plus.svg";
import cloud from "../../../assets/cloudy.svg";
import Thumb from "../../../assets/thumbs-up-facebook.svg";
import DeleteConvButton from "../../../assets/x-button.svg";
import Alert from "../../../customAlert/Alert";
import clickedAlertAtom from "../../../customAlert/clickedAlertAtom";
import clickedOffChatAtom from "../../../stateManager/atoms/clickedOffChatAtom";
import openVideoChatAtom from "../../../stateManager/atoms/openVideoChatAtom";
import useWebPush from "../../../hooks/useWebPush";
import isOnlineAtom from "../../../stateManager/atoms/isOnlineAtom";
import OfflineMessage from "../../offlineMessage/OfflineMessage";
import MessagesComponents from "./components/MessagesComponent";
import BottomChatComponent from "./components/BottomChatComponent";
import HeaderChatComponent from "./components/HeaderChatComponent";

const ChatRoom = (props) => {
  const { t } = useTranslation();
  const messagesEndRef = useRef(null);
  const [roomToken, setRoomToken] = useRecoilState(roomIdAtom);
  const [isLoaded, setIsLoaded] = useState(true);
  let roomId = { roomToken };
  const [username] = useRecoilState(usernameAtom);
  // const { customAlert, ok } = useCustomAlert();
  const {
    messages,
    setMessages,
    sendMessage,
    dateTime,
    setDateTime,
    newMessage,
    setNewMessage,
    isTaping,
    setIsTaping,
    pictComment,
    setPictComment,
    userAllInfos,
    setUserAllInfos,
    writingUsers,
    senderIdNotif,
    senderIdTyping,
    isNotAlphaNumeric,
  } = useChat(roomId); // Creates a websocket and manages messaging
  const [clickedOffChat, setClickedOffChat] =
    useRecoilState(clickedOffChatAtom);
  const [clickedOnName, setClickedOnName] = useState(false);
  const [ownedByMe, setOwnedByMe] = useState(false);
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const [clickedChevron, setClickedChevron] = useState(true);
  const [clickedSound1] = useRecoilState(clickedSoundGuitarAtom);
  const [clickedSound2] = useRecoilState(clickedSoundSoftwareAtom);
  const [selectedDarkTheme] = useRecoilState(selectedDarkThemeAtom);
  const [filePictFromList, setFilePictFromList] = useState([]);
  const [filePictFromMess, setFilePictFromMess] = useState("");
  const [plusSection, setplusSection] = useRecoilState(plusSectionAtom);
  const [isReceiveMediaToUser, setIsReceiveMediaToUser] = useRecoilState(
    isReceivedMediasMessageToUserAtom
  );
  const [clickedParams, setClickedParams] = useRecoilState(clickedParamsAtom);
  const [state, setState] = useRecoilState(fileFromPictureAtom);
  const [isImageList] = useRecoilState(imageInfoAtom);
  const [seingMedia] = useRecoilState(seeMediaAtom);
  const [speechToTextConversion, setSpeechToTextConversion] =
    useRecoilState(speechToTextAtom);
  const { userInfos, ipAddress, setClickedOnApp } = useGetUserInfos();
  const { resetTranscript } = useSpeechRecognition();
  const [messageForBot, setMessageForBot] = useRecoilState(messageForBotAtom);
  const [clickedCopyId, setClickedCopyId] = useState(false);
  const [idChatInvitation, setIdChatInvitation] = useState("");
  const [toggleDeleteButton, setToggleDeleteButton] = useState(false);
  const [isSendThumb, setIsSendThumb] = useState(false);
  const [isOnline, setIsOnline] = useRecoilState(isOnlineAtom);

  // const { me } = useVideoChat();
  // if you want to catch roomId from URL
  // const { roomId } = props.match.params; // Gets roomId from URL

  // USE UUIDV4 FOR GENERATE ID ROOM FOR CHAT IF YOU WANT
  // useEffect(() => {
  //   if (!roomToken) {
  //     setRoomToken(uuidv4());
  //   }else{

  //   }
  //   return () => {
  //     setRoomToken("");
  //   };
  // }, []);

  let d = new Date();
  let n = d.toLocaleString();

  // CUSTOM WEBPUSH SECTION
  const { customWebPush } = useWebPush();

  useEffect(() => {
    // CHECK THE MESSAGE CONTENT
    const youAreCalled = messages.map((res) => res.body);
    // CHECK THE USERNAME FROM USERNAMEATOM STATE
    const yourUserName = username;
    // ONLY IF THE CHAT WINDOW IS REDUCED
    if (clickedOffChat === true) {
      // THIS WEBPUSH IS WHEN THE OTHER USER CALL YOU IN MESSAGE CHAT
      if (messages.length > 0) {
        if (youAreCalled.includes(`${yourUserName}`)) {
          console.log("on parle de toi!!!");
          customWebPush({
            NotificationMessage:
              "Une personne a écrit votre nom d'utilisateur dans le chat !",
          });
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username, messages]);
  // END OF WEBPUSH SECTION

  useEffect(() => {
    if (!roomToken && sessionStorage.getItem("roomName") !== null) {
      setRoomToken(sessionStorage.getItem("roomName"));
    }
    if (roomToken) {
      sessionStorage.setItem("roomName", roomToken);
    }
    if (!roomToken && !sessionStorage.getItem("roomName")) {
      const roomId = props.match.params; // Gets roomId from URL
      setRoomToken(roomId.roomToken);
    }
    if (isLoaded) {
      setTimeout(() => {
        setIsLoaded(false);
      }, 3500);
    }
    return () => {
      setRoomToken("");
      sessionStorage.removeItem("roomName");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    if (messages.length >= 4) {
      scrollToBottom();
    }
    if (clickedCopyId) {
      messages.pop();

      setTimeout(() => {
        window.location.replace(`/video/${roomToken}`);
      }, 1200);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages, userAllInfos]);

  const handleNewMessageChange = (event) => {
    if (!isReceiveMediaToUser) {
      setNewMessage(event.target.value);
    }
    if (isReceiveMediaToUser && isImageList) {
      setNewMessage(state.currentFile?.name);
    }
  };

  const handlePlusSection = () => {
    if (plusSection) {
      setplusSection(false);
    }
    if (!plusSection) {
      setplusSection(true);
    }
  };

  const handleKeypress = (e) => {
    //it triggers by pressing the enter key
    if (e.code === "Enter" || e.code === "NumpadEnter") {
      handleSendMessage();
    }
  };
  const [clickedAlert, setClickedAlert] = useRecoilState(clickedAlertAtom);

  const handleClickAlert = () => {
    setClickedAlert(true);
  };

  const handleSendMessage = (e) => {
    if (newMessage === "") {
      return;
    }
    if (newMessage !== "") {
      setplusSection(false);
      setDateTime(n);
      sendMessage(newMessage);
      setNewMessage("");
      setIsTaping(false);
      setSpeechToTextConversion("");
      setClickedChevron(true);
      setIsReceiveMediaToUser(false);
      resetTranscript();
    }
    if (pictComment !== "") {
      setplusSection(false);
      setNewMessage("");
      setTimeout(() => {
        setPictComment("");
        setNewMessage("");
      }, 200);
    }
  };
  const handleSendThumb = () => {
    setIsSendThumb(true);
    setNewMessage("thumbs-up-facebook.svg");
  };

  const handleClickOnName = () => {
    if (clickedOnName) {
      setClickedOnName(false);
    }
    if (!clickedOnName) {
      setClickedOnName(true);
      setTimeout(() => {
        setClickedOnName(false);
      }, 15000);
    }
  };

  const handleClickedOffChat = () => {
    if (clickedOffChat) {
      setClickedOffChat(false);
    }
    if (!clickedOffChat) {
      setClickedOffChat(true);
    }
  };

  useEffect(() => {
    UploadService.getFiles().then((response) => {
      setState({
        imageInfos: response.data,
      });
    });
  }, [setState]);

  const handleClickChevron = () => {
    if (!clickedChevron) {
      setClickedChevron(true);
    }
    if (clickedChevron) {
      setClickedChevron(false);
      setplusSection(false);
    }
    if (clickedChevron) {
      setIsTaping(true);
    }
    if (!clickedChevron) {
      setIsTaping(false);
    }
  };
  const handleTypingInput = () => {
    if (!isTaping) {
      setplusSection(false);
      setIsTaping(true);
      setTimeout(() => {
        setIsTaping(false);
      }, 2000);
    }
  };
  useEffect(() => {
    if (newMessage.includes("thumbs-up-facebook.svg")) {
      setTimeout(() => {
        sendMessage(newMessage);
        setNewMessage("");
      }, 300);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newMessage]);

  function allInfos() {
    userInfos.map((res) =>
      setUserAllInfos({
        ip: ipAddress.ip,
        // postalCode: response.postcode,
        // locality: response.locality,
        timezone: res.timezone.name,
        flag: res.country.emoji,
        architecture: res.cpu.architecture,
        navigator: res.browser.name,
        os: res.os.name,
        version: res.os.version,
        device: res.device.model,
        trade: res.device.vendor,
      })
    );
  }

  useEffect(() => {
    messages.map((message, i) => setOwnedByMe(message.ownedByCurrentUser));
    function getDateTime() {
      setDateTime(n);
    }
    getDateTime();

    localStorage.setItem("messages", JSON.stringify(messages));

    if (state.currentFile?.name) {
      setNewMessage(state.currentFile?.name);
    }

    if (messages) {
      setFilePictFromList(isImageList.imageInfos.map((resLink) => resLink));
      setFilePictFromMess(messages.map((resBody) => resBody.body));
    }
    let someMess = messages.map((res) =>
      res.body.includes("Invitation vidéo, copiez l'id afin de vous connecter:")
    );

    if (someMess.includes(true)) {
      // console.log("id for chat:", idChatInvitation);
      messages.map((message, i) =>
        setIdChatInvitation(message.body.split(":").pop())
      );
    }

    allInfos();
    sessionStorage.setItem("infos user", JSON.stringify(userAllInfos));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    messages,
    chosenEmoji,
    dateTime,
    n,
    setDateTime,
    isImageList,
    setNewMessage,
    state,
  ]);

  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject);
    if (newMessage) {
      setNewMessage(newMessage + emojiObject.emoji);
    } else if (!newMessage) {
      setNewMessage(emojiObject.emoji);
    }
  };

  function IsTyping() {
    if (clickedChevron) {
      setTimeout(() => {
        setIsTaping(false);
      }, 4000);
    }
    if (!clickedChevron) {
      setTimeout(() => {
        setIsTaping(false);
      }, 10000);
    }
    if (senderIdTyping) {
      setTimeout(() => {
        setIsTaping(false);
      }, 4000);
    }
    return <div className="dot-typing" />;
  }

  const [openVideoChat, setOpenVideChat] = useRecoilState(openVideoChatAtom);
  const handleVideoChat = () => {
    if (openVideoChat) {
      setOpenVideChat(false);
    }
    if (!openVideoChat) {
      setOpenVideChat(true);
      // if(window.location.pathname === `"/video/${roomId}`){
      //   return <VideoChatComponent />
      // }
    }
  };

  useEffect(() => {
    if (speechToTextConversion !== "") {
      setNewMessage(speechToTextConversion);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [speechToTextConversion]);

  useEffect(() => {
    if (newMessage.includes("#")) {
      setMessageForBot(newMessage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newMessage, messageForBot]);

  // DELETE MESSAGE SECTION
  const [idForDeleteButton, setIdForDeleteButton] = useState("");
  const [messageIdToDelete, setMessageIsToDelete] = useState("");
  const newMessages = messages.filter((i) => i);

  function onDelete() {
    for (let i = 0; i < newMessages.length; i++) {
      if (newMessages[i].id === messageIdToDelete) {
        newMessages.splice(i, 1);
        i--; //re-adjust the counter.
      }
    }
    setMessages(newMessages);
  }
  const handletoggleDeleteButton = () => {
    // setIdForDeleteButton(newMessage.id);
    if (toggleDeleteButton) {
      setToggleDeleteButton(false);
    }
    if (!toggleDeleteButton) {
      setToggleDeleteButton(true);
      setTimeout(() => {
        setToggleDeleteButton(false);
      }, 6000);
    }
  };
  useEffect(() => {
    if (messageIdToDelete) {
      onDelete();
      // setIsSoundNotification(false);
      setMessageIsToDelete("");
      // setIsSoundNotification(true);
    }
    // console.log("id for button :", idForDeleteButton);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messageIdToDelete, idForDeleteButton]);

  // END OF DELETE MESSAGE SECTION

  return (
    <Fragment>
      {clickedAlert && (
        <Alert
          title={t("alertCloseChatTitle")}
          subTitle={`${t("alertMessIfMessagesList")}`}
          erasedBubbles={`${t("erasedBubbles")}`}
          notErasedBubbles={`${t("notErasedBubbles")}`}
          confirmMessage={`${t("confirmActionCloseChat")}`}
          buttonYes={`${t("yesButton")}`}
          buttonNo={`${t("noButton")}`}
        />
      )}
      <div
        onClick={() => setClickedOnApp(true)}
        className={`${clickedOffChat ? "chat-room-container-closed" : ""}
          ${
            !selectedDarkTheme
              ? "chat-room-container slide-in-blurred-bottom light-background"
              : "chat-room-container slide-in-blurred-bottom dark-background"
          }
        `}
      >
        <HeaderChatComponent
          selectedDarkTheme={selectedDarkTheme}
          Bavarder={Bavarder}
          t={t}
          handleClickAlert={handleClickAlert}
          handleClickedOffChat={handleClickedOffChat}
        />
        {isOnline === "offline" ? (
          <OfflineMessage type="warning" content="offlineMessage" />
        ) : null}
        {openVideoChat && window.location.replace(`/video/${roomToken}`)}
        {isLoaded ? (
          <div
            className={`${
              !selectedDarkTheme
                ? "messages-container messages-container-spiner light-background"
                : "messages-container messages-container-spiner dark-background"
            }`}
          >
            <Loader />
          </div>
        ) : (
          <div
            onClick={() => setClickedParams(false)}
            className={`${clickedOffChat ? "messages-container-closed" : ""}
            ${
              !selectedDarkTheme
                ? "messages-container light-background"
                : "messages-container dark-background"
            }
          `}
          >
            {messages.length === 0 ? (
              <EmptyChatMessage messages={messages} />
            ) : null}
            <MessagesComponents
              messages={messages}
              openVideoChat={openVideoChat}
              clickedSound1={clickedSound1}
              sound={sound}
              clickedSound2={clickedSound2}
              sound2={sound2}
              handleClickOnName={handleClickOnName}
              clickedOnName={clickedOnName}
              userAllInfos={userAllInfos}
              isNotAlphaNumeric={isNotAlphaNumeric}
              setIdForDeleteButton={setIdForDeleteButton}
              handletoggleDeleteButton={handletoggleDeleteButton}
              seingMedia={seingMedia}
              toggleDeleteButton={toggleDeleteButton}
              messagesEndRef={messagesEndRef}
              t={t}
              clickedCopyId={clickedCopyId}
              CopyToClipboard={CopyToClipboard}
              idChatInvitation={idChatInvitation}
              setClickedCopyId={setClickedCopyId}
              Thumb={Thumb}
              cloud={cloud}
              Weather={Weather}
              idForDeleteButton={idForDeleteButton}
              setMessageIsToDelete={setMessageIsToDelete}
              DeleteConvButton={DeleteConvButton}
            />
          </div>
        )}

        {senderIdNotif !== "" && writingUsers.isTaping ? (
          <div className="animTyping" id="typing_on">
            <IsTyping />
          </div>
        ) : null}
        <BottomChatComponent
          selectedDarkTheme={selectedDarkTheme}
          handleSendMessage={handleSendMessage}
          plusSection={plusSection}
          state={state}
          Thumb={Thumb}
          handleSendThumb={handleSendThumb}
          handleKeypress={handleKeypress}
          setIsTaping={setIsTaping}
          VideoCall={VideoCall}
          handleVideoChat={handleVideoChat}
          plus={plus}
          handlePlusSection={handlePlusSection}
          t={t}
          handleNewMessageChange={handleNewMessageChange}
          newMessage={newMessage}
          handleTypingInput={handleTypingInput}
          isLoaded={isLoaded}
          clickedOffChat={clickedOffChat}
          setClickedParams={setClickedParams}
          onEmojiClick={onEmojiClick}
          clickedChevron={clickedChevron}
          handleClickChevron={handleClickChevron}
        />
      </div>
    </Fragment>
  );
};

export default ChatRoom;
