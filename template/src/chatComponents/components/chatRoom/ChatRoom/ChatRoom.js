/* eslint-disable no-unused-vars */
// MODULES IMPORTS
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useSpeechRecognition } from "react-speech-recognition";
import { Fragment, useEffect, useState, useRef } from "react";
import { useRecoilState } from "recoil";
import { useTranslation } from "react-i18next";
// import { v4 as uuidv4 } from "uuid";
// CSS IMPORTS
import "./ChatRoom.css";
// HOOKS & SERVICES IMPORTS
import useChat from "chatComponents/hooks/useChat";
import UploadService from "chatComponents/services/FileUploadService";
import useGetUserInfos from "chatComponents/hooks/useGetUserInfos";
import useWebPush from "hooks/useWebPush";
// STATEMANAGMENT IMPORTS
import imageInfoAtom from "chatComponents/stateManager/atoms/imageInfoAtom";
import seeMediaAtom from "chatComponents/stateManager/atoms/seeMediaAtom";
import clickedParamsAtom from "chatComponents/stateManager/atoms/clickedParamsAtom";
import selectedDarkThemeAtom from "chatComponents/stateManager/atoms/selectedDarkThemeAtom";
import clickedSoundGuitarAtom from "chatComponents/stateManager/atoms/clickedSoundGuitarAtom";
import clickedSoundSoftwareAtom from "chatComponents/stateManager/atoms/clickedSoundSoftwareAtom";
import fileFromPictureAtom from "chatComponents/stateManager/atoms/fileFromPictureAtom";
import isReceivedMediasMessageToUserAtom from "chatComponents/stateManager/atoms/receiveMediasMessageToUserAtom";
import speechToTextAtom from "chatComponents/stateManager/atoms/speechToTextAtom";
import plusSectionAtom from "chatComponents/stateManager/atoms/plusSectionAtom";
import messageForBotAtom from "chatComponents/stateManager/atoms/messageForBotAtom";
import roomIdAtom from "chatComponents/stateManager/atoms/roomIdAtom";
import usernameAtom from "chatComponents/stateManager/atoms/usernameAtom";
import isOnlineAtom from "chatComponents/stateManager/atoms/isOnlineAtom";
import clickedAlertAtom from "baseLayout/shared/alertComponent/customAlert/clickedAlertAtom";
import clickedOffChatAtom from "chatComponents/stateManager/atoms/clickedOffChatAtom";
import openVideoChatAtom from "chatComponents/stateManager/atoms/openVideoChatAtom";
// COMPONENTS IMPORTS
import EmptyChatMessage from "./components/EmptyChatMessage";
import Loader from "chatComponents/components/loader/Loader";
import Weather from "chatComponents/components/weatherComponent/WeatherComponent";
import OfflineMessage from "baseLayout/shared/offlineMessage/OfflineMessage";
import MessagesComponents from "./components/MessagesComponent";
import BottomChatComponent from "./components/BottomChatComponent";
import HeaderChatComponent from "./components/HeaderChatComponent";
import Alert from "baseLayout/shared/alertComponent/customAlert/Alert";
// ASSETS IMPORTS
import Bavarder from "chatComponents/assets/chat.svg";
import sound from "chatComponents/assets/sounds/mixkit-guitar-notification-alert-2320.mp3";
import sound2 from "chatComponents/assets/sounds/mixkit-software-interface-back-2575.mp3";
import VideoCall from "chatComponents/assets/video-chat-icon.svg";
import plus from "chatComponents/assets/plus.svg";
import cloud from "chatComponents/assets/cloudy.svg";
import Thumb from "chatComponents/assets/thumbs-up-facebook.svg";
import DeleteConvButton from "chatComponents/assets/x-button.svg";

const ChatRoom = (props) => {
  const { t } = useTranslation();
  const messagesEndRef = useRef(null);
  const [roomToken, setRoomToken] = useRecoilState(roomIdAtom);
  const [isLoaded, setIsLoaded] = useState(true);
  let roomId = { roomToken };
  const [username] = useRecoilState(usernameAtom);
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
  const [isOnline] = useRecoilState(isOnlineAtom);

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

  // set date for each message
  let d = new Date();
  let n = d.toLocaleString();

  // CUSTOM WEBPUSH SECTION
  const { customWebPush } = useWebPush();

  useEffect(() => {
    // CHECK THE MESSAGE CONTENT
    const youAreCalled = messages.map((res) => res.body);
    // CHECK THE USERNAME FROM USERNAME ATOM STATE
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

  //  Primitif useEffect hook for roomToken gestion (state & session storage)
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
    // Loader time at the first render
    if (isLoaded) {
      setTimeout(() => {
        setIsLoaded(false);
      }, 3500);
    }
    // Function equal to componentDidUnmount
    return () => {
      setRoomToken("");
      sessionStorage.removeItem("roomName");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Scroll to bottom messages list function
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    // If messages List is more than 4 --> auto scrool to the bottom
    if (messages.length >= 4) {
      scrollToBottom();
    }
    // Video chat invitation (receiver only), when the id is clicked --> auto delete of the last message( invitation)
    if (clickedCopyId) {
      messages.pop();
      //  And redirect to video chat component with roomName in url
      setTimeout(() => {
        window.location.replace(`/video/${roomToken}`);
      }, 1200);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages, userAllInfos]);

  // New message section
  const handleNewMessageChange = (event) => {
    // If not media, set the new message with the target value
    if (!isReceiveMediaToUser) {
      setNewMessage(event.target.value);
    }
    // If is media (picture) then set the new message with the name of the picture
    if (isReceiveMediaToUser && isImageList) {
      setNewMessage(state.currentFile?.name);
    }
  };

  // Plus function for extand & reduce bottom chat tools section
  const handlePlusSection = () => {
    if (plusSection) {
      setplusSection(false);
    }
    if (!plusSection) {
      setplusSection(true);
    }
  };

  // Function to send content message input with one click to the enter key on keyboard
  const handleKeypress = (e) => {
    //it triggers by pressing the enter key
    if (e.code === "Enter" || e.code === "NumpadEnter") {
      handleSendMessage();
    }
  };

  // Close chat window boolean value for the custom alert
  const [clickedAlert, setClickedAlert] = useRecoilState(clickedAlertAtom);

  const handleClickAlert = () => {
    setClickedAlert(true);
  };

  // Function for sending NewMessage to messages array
  const handleSendMessage = (e) => {
    //  If the input is empty, is equal to preventDefault()
    if (newMessage === "") {
      return;
    }
    //  If newMessage(input field) is not empty, send message
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
    // If the input content (newMessage) is picture name,
    // then you have an comment picture input for displaying text at the same time of the picture
    if (pictComment !== "") {
      setplusSection(false);
      setNewMessage("");
      setTimeout(() => {
        setPictComment("");
        setNewMessage("");
      }, 200);
    }
  };
  // Thumbs up facebook message functionality, set the values here
  const handleSendThumb = () => {
    setIsSendThumb(true);
    setNewMessage("thumbs-up-facebook.svg");
  };

  // If you click on name of the message sender,
  // you have the ip that display for 15 seconds and then display the name automaticly
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

  //  Function with boolean values for reduce chat window
  const handleClickedOffChat = () => {
    if (clickedOffChat) {
      setClickedOffChat(false);
    }
    if (!clickedOffChat) {
      setClickedOffChat(true);
    }
  };

  // Primitif hook for displaying picture on the messages list after is sended to the server
  useEffect(() => {
    UploadService.getFiles().then((response) => {
      setState({
        imageInfos: response.data,
      });
    });
  }, [setState]);

  // This function is for display or hidden the emoji's section
  const handleClickChevron = () => {
    if (!clickedChevron) {
      setClickedChevron(true);
    }
    if (clickedChevron) {
      setClickedChevron(false);
      setplusSection(false);
    }
    // If the emoji's section is open, that display the typing animation for the other chat users
    if (clickedChevron) {
      setIsTaping(true);
    }
    if (!clickedChevron) {
      setIsTaping(false);
    }
  };

  // The typing animation function
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
    // Thumbs up facebook message functionality, send the message here
    if (newMessage.includes("thumbs-up-facebook.svg")) {
      setTimeout(() => {
        sendMessage(newMessage);
        setNewMessage("");
      }, 300);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newMessage]);

  //  Function for getting the users infos & construct the object here
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
    // For knowing if the message is sended by you or the other user
    messages.map((message, i) => setOwnedByMe(message.ownedByCurrentUser));
    // Function for getting time for each message
    function getDateTime() {
      setDateTime(n);
    }
    getDateTime();

    // Set to the localStorage the messages array of objects
    localStorage.setItem("messages", JSON.stringify(messages));

    // If the current file (picture) name exist, then --> automatic set The newMessage state with the picture name
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

  // Function for setting the newMessage with emoji
  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject);
    //  If you have already one message text --> add emoji to the text
    if (newMessage) {
      setNewMessage(newMessage + emojiObject.emoji);
      // If you don't have any message text, then set the emoji to newMessage state
    } else if (!newMessage) {
      setNewMessage(emojiObject.emoji);
    }
  };

  // Typing animation function with conditions & return div that content the dot-typing animation
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

  // Boolean state for opening the video chat window
  const [openVideoChat, setOpenVideChat] = useRecoilState(openVideoChatAtom);
  // Open video chat function
  const handleVideoChat = () => {
    if (openVideoChat) {
      setOpenVideChat(false);
    }
    if (!openVideoChat) {
      setOpenVideChat(true);
    }
  };

  useEffect(() => {
    // If the message come from speech to text functionality
    //  That set NewMessage state with the transcription content
    if (speechToTextConversion !== "") {
      setNewMessage(speechToTextConversion);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [speechToTextConversion]);

  // Bot chat messages --> If # is include in the newMessage state
  //  Then send that for chatbot
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
  //  Function for displaying the delete bubble conversation on each bubble chat
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
