// MODULES IMPORTS
import { useEffect, useRef } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useRecoilState } from "recoil";
// import { useTranslation } from "react-i18next";
// HOOKS IMPORTS
import useChat from "./useChat";
// STATEMANAGMENT IMPORTS
import isListeningAtom from "chatComponents/stateManager/atoms/isListeningAtom";
import speechToTextAtom from "chatComponents/stateManager/atoms/speechToTextAtom";
import roomIdAtom from "chatComponents/stateManager/atoms/roomIdAtom";
import isLanguageAtom from "chatComponents/stateManager/atoms/isLanguageAtom";

const useSpeechToText = () => {
  const [isListening, setIsListening] = useRecoilState(isListeningAtom);
  const microphoneRef = useRef(null);
  const { setIsTaping, setNewMessage } = useChat(roomIdAtom);
  // eslint-disable-next-line no-unused-vars
  const [speechToTextConversion, setSpeechToTextConversion] =
    useRecoilState(speechToTextAtom);
  const [isLanguage] = useRecoilState(isLanguageAtom);

  const { transcript, resetTranscript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  const handleListing = () => {
    setNewMessage("");
    resetTranscript();
    setSpeechToTextConversion("");
    setIsListening(true);
    setIsTaping(true);
    SpeechRecognition.startListening({
      continuous: true,
      language:
        isLanguage === "fr" ? "fr-FR" : isLanguage === "pt" ? "pt-br" : "en-GB",
    });
  };
  const stopHandle = () => {
    setIsListening(false);
    setIsTaping(false);
    SpeechRecognition.stopListening();
    setSpeechToTextConversion(transcript);
    resetTranscript();
  };

  useEffect(() => {
    console.log(isLanguage);
  }, [transcript, isLanguage, resetTranscript]);

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }
  return {
    isListening,
    microphoneRef,
    handleListing,
    stopHandle,
  };
};

export default useSpeechToText;
