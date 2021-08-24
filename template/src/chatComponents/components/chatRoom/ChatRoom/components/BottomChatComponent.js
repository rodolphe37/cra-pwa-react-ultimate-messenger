import UploadImages from "../../../ImageUploadComponent";
import SpeechToText from "../../../speech-recognition/SpeechToText";
import Picker, { SKIN_TONE_MEDIUM_LIGHT } from "emoji-picker-react";

const BottomChatComponent = ({
  selectedDarkTheme,
  handleSendMessage,
  plusSection,
  state,
  Thumb,
  handleSendThumb,
  handleKeypress,
  setIsTaping,
  VideoCall,
  handleVideoChat,
  plus,
  handlePlusSection,
  t,
  handleNewMessageChange,
  newMessage,
  handleTypingInput,
  isLoaded,
  clickedOffChat,
  setClickedParams,
  onEmojiClick,
  clickedChevron,
  handleClickChevron,
}) => {
  return (
    <div>
      <div
        className={` ${clickedOffChat ? "emoji-chat-closed-off" : ""}
            ${
              clickedChevron
                ? "emoji-chat-closed"
                : selectedDarkTheme
                ? "emoji-chat-open emoji-chat-open-dark"
                : "emoji-chat-open"
            }
          `}
      >
        <button onClick={handleClickChevron} className="chevron">
          {!clickedChevron ? "👍🏼" : "😀"}
        </button>
        <Picker
          onEmojiClick={onEmojiClick}
          disableAutoFocus={true}
          skinTone={SKIN_TONE_MEDIUM_LIGHT}
          groupNames={{ smileys_people: "PEOPLE" }}
          native
        />
      </div>
      <div
        onClick={() => setClickedParams(false)}
        className={
          !clickedOffChat
            ? "sending-message-container"
            : "sending-message-container-closed"
        }
      >
        <span
          className={
            state.currentFile ? "not-visible" : plusSection ? "reduceInput" : ""
          }
        >
          <input
            disabled={isLoaded ? true : false}
            autoComplete="off"
            onSelect={handleTypingInput}
            id="chat-message-input"
            onKeyPress={handleKeypress}
            value={newMessage}
            onChange={handleNewMessageChange}
            placeholder={t("placeholderInputChat")}
            className={
              !selectedDarkTheme
                ? "new-message-input-field light-background"
                : "new-message-input-field dark-background"
            }
          />
        </span>
        <div
          onClick={handlePlusSection}
          className={
            !plusSection
              ? selectedDarkTheme
                ? "plusBottomChat ml37-mt5 dark-background"
                : "plusBottomChat ml37-mt5 light-background"
              : selectedDarkTheme
              ? "plusBottomChat margin-right14 dark-background"
              : "plusBottomChat margin-right14 light-background"
          }
        >
          <img style={{ width: 25 }} src={plus} alt="plus" />
        </div>
        <div className="bottom-left-chat">
          <img
            onClick={handleVideoChat}
            style={{
              width: 28,
              marginRight: 15,
              cursor: "pointer",
              marginTop: -5,
            }}
            src={VideoCall}
            alt="call"
            className={plusSection ? "" : "hiddenParams"}
          />
          <div className={plusSection ? "upload-container" : "hiddenParams"}>
            <UploadImages
              setIsTaping={setIsTaping}
              handleKeypress={handleKeypress}
              handleSendMessage={handleSendMessage}
            />
          </div>
          <span className={plusSection ? "" : "hiddenParams"}>
            <SpeechToText />
          </span>
          <span
            className={plusSection ? "" : "hiddenParams"}
            onClick={handleSendThumb}
          >
            <img
              style={{ width: 27, cursor: "pointer", marginRight: 15 }}
              src={Thumb}
              alt="thumb"
            />
          </span>
          <span
            className={
              state.currentFile
                ? "not-visible"
                : !plusSection
                ? "margin-left22"
                : ""
            }
          >
            <button onClick={handleSendMessage} className="send-message-button">
              <svg width="22px" height="22px" viewBox="0 0 22 22">
                <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                  <g
                    transform="translate(-5.000000, -5.000000)"
                    fill={selectedDarkTheme ? "#ffffff" : "#4d4d4d"}
                  >
                    <g>
                      <g transform="translate(5.000000, 5.000000)">
                        <path d="M2.0300068,0.145970044 L20.9662955,9.37015518 C22.3445682,10.0420071 22.3445682,11.9582654 20.9662955,12.6296618 L2.0300068,21.853847 C1.09728834,22.3084288 0,21.6475087 0,20.6317597 L0.806953417,13.8945654 C0.882225434,13.2659853 1.39089595,12.7699536 2.03608467,12.6957083 L12.0229514,11.6795038 C12.8612292,11.5943266 12.8612292,10.4054904 12.0229514,10.3203132 L2.03608467,9.30410872 C1.39089595,9.23031889 0.882225434,8.7342872 0.806953417,8.10525162 L0,1.36805729 C0,0.352308292 1.09728834,-0.3081563 2.0300068,0.145970044"></path>
                      </g>
                    </g>
                  </g>
                </g>
              </svg>
            </button>
          </span>
        </div>
      </div>
    </div>
  );
};

export default BottomChatComponent;
