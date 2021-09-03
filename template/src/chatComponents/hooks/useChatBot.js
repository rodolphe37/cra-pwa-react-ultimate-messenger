/* eslint-disable no-unused-vars */
// MODULES IMPORTS
import { useState, useEffect } from "react";
import { isMobile } from "react-device-detect";
import { useTranslation } from "react-i18next";
import { useRecoilState } from "recoil";
// CONSTANTS IMPORTS
import {
  prompts,
  replies,
  coronavirus,
  alternative,
  rock,
  stories,
  love,
  win,
} from "chatComponents/constants/constants";
import isLanguageAtom from "chatComponents/stateManager/atoms/isLanguageAtom";
// STATEMANAGMENT IMPORTS
import messageForBotAtom from "chatComponents/stateManager/atoms/messageForBotAtom";
import roomIdAtom from "chatComponents/stateManager/atoms/roomIdAtom";
import weatherAtom from "chatComponents/stateManager/atoms/weatherAtom";

const useChatBot = () => {
  const { t } = useTranslation;
  const [language] = useRecoilState(isLanguageAtom);
  const [messageForBot] = useRecoilState(messageForBotAtom);
  let [infosUser, setInfosUser] = useState(
    JSON.parse(sessionStorage.getItem("infos user"))
  );
  let [userName, setUserName] = useState(localStorage.getItem("username"));
  const [roomToken] = useRecoilState(roomIdAtom);
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useRecoilState(weatherAtom);
  const [cityLocation, setCityLocation] = useState(
    JSON.parse(localStorage.getItem("cityInfos"))
  );

  let product;
  // GET HOUR FOR HORLOGE COMMAND TO BOTCHAT
  let today = new Date();
  let time = `${today.getHours()} hours ${today.getMinutes()} minutes and  ${today.getSeconds()} seconds`;
  // GET DATE - TIME FOR COMMAND TO BOTCHAT
  let d = new Date();
  let n = d.toLocaleDateString("en-US");

  useEffect(() => {}, [infosUser, userName]);

  // Regex remove non word/space chars
  // Trim trailing whitespce
  // Remove digits - not sure if this is best
  // But solves problem of entering something like 'hi1'
  let text = messageForBot
    .toLowerCase()
    .replace(/[^\w\s]/gi, "")
    .replace(/[\d]/gi, "")
    .trim();
  text = text
    .replace(/ a /g, " ") // 'tell me a story' -> 'tell me story'
    .replace(/i feel /g, "")
    .replace(/whats/g, "what is")
    .replace(/please /g, "")
    .replace(/ please/g, "")
    .replace(/r u/g, "are you");

  function compare(promptsArray, repliesArray, string) {
    let reply;
    let replyFound = false;
    for (let x = 0; x < promptsArray.length; x++) {
      for (let y = 0; y < promptsArray[x].length; y++) {
        if (promptsArray[x][y] === string) {
          let replies = repliesArray[x];
          reply = replies[Math.floor(Math.random() * replies.length)];
          replyFound = true;
          // Stop inner loop when input value matches prompts
          break;
        }
      }
      if (replyFound) {
        // Stop outer loop when reply is found instead of interating through the entire array
        break;
      }
    }
    return reply;
  }

  if (compare(prompts, replies, text)) {
    // Search for exact match in `prompts`
    product = compare(prompts, replies, text);
  } else if (text.match(/chatbot|botchat|bootedchat/gi) && !userName) {
    product = `What can I do for you?`;
  } else if (text.match(/room|which room/gi) && roomToken) {
    product = `You are in the room - ${roomToken} 😉`;
  } else if (text.match(/room|wich room/gi) && !roomToken) {
    product = `I'm looking at you not being connected to a room anymore 😕. Reconnect by reopening the chat 😝`;
  } else if (text.match(/chatbot|botchat|bootedchat/gi) && userName) {
    product = `What can I do for you ${userName}?`;
  } else if (text.match(/thanx|thank you|super|great|awesome/gi)) {
    product = "You're welcome! 😁";
  } else if (text.match(/asshole|fucking|fucked/gi)) {
    product = "Hooo, no insults 🤬 young wanker!!!😡";
  } else if (text.match(/clock|What time/gi)) {
    product = `it is exactly ${time}`;
  } else if (text.match(/calendar|schedule|what day/gi)) {
    product = `We are the ${n}`;
  } else if (text.match(/who I am|I am who/gi)) {
    if (infosUser) {
      !isMobile &&
        (product = `Your name is : ${userName}, your country is ${infosUser.flag} - ${cityLocation.results[0].locations[0].adminArea1},
    your city is :${cityLocation.results[0].locations[0].adminArea5}, postal code : ${cityLocation.results[0].locations[0].postalCode},
    your street is :${cityLocation.results[0].locations[0].street},
    your ip is : ${infosUser.ip},
    your browser is  ${infosUser.navigator},
    your Operating System is ${infosUser.os} 😊😎`);
      isMobile &&
        (product = `Your name is : ${userName}, your country is ${infosUser.flag} - ${cityLocation.results[0].locations[0].adminArea1},
    your city is :${cityLocation.results[0].locations[0].adminArea5}, code postal : ${cityLocation.results[0].locations[0].postalCode},
    your street is :${cityLocation.results[0].locations[0].street},
    ton ip est : ${infosUser.ip},
    your mobile device is${infosUser.device}
    of brand : ${infosUser.trade},
    your OS is : ${infosUser.os},
    your browser is  ${infosUser.navigator} 😊😎,
    `);
    }
  } else if (text.match(/fuck/gi)) {
    product = "Fuck yourself, rude boy 🖕🏼🖕🏼";
  } else if (text.match(/(corona|covid|virus)/gi)) {
    // If no match, check if message contains `coronavirus`
    product = coronavirus[Math.floor(Math.random() * coronavirus.length)];
  } else if (
    text.match(/(we play|let's play together|stone|rock|paper|scissors)/gi)
  ) {
    // If no match, check if message contains `rock paper scissors`
    product = rock[Math.floor(Math.random() * rock.length)];
  } else if (text.match(/love|kiff|lovely|great/gi)) {
    // If no match, check if message contains `love conversation`
    product = love[Math.floor(Math.random() * love.length)];
  } else if (text.match(/tell me a joke|joke|make me laugh|another one/gi)) {
    // If no match, check if message contains `joke`
    product = stories[Math.floor(Math.random() * stories.length)];
  } else if (text.match(/I won|yeah|who beat him|super/gi)) {
    // If no match, check if message contains `game win conversation`
    product = win[Math.floor(Math.random() * win.length)];
  } else {
    // If all else fails: random alternative
    product = alternative[Math.floor(Math.random() * alternative.length)];
  }

  return {
    product,
    prompts,
    replies,
    coronavirus,
    alternative,
  };
};

export default useChatBot;
