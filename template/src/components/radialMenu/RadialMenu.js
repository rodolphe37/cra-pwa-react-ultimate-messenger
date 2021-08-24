import { useState } from "react";
import "./radialMenu.css";
const RadialMenu = () => {
  const [clickedRadialMenu, setClickedRadialMenu] = useState(false);

  const handleClickMenu = () => {
    setClickedRadialMenu((prevState) => !prevState);
    console.log(clickedRadialMenu);
  };
  return (
    <div className="radialMenu-container">
      <ul className={clickedRadialMenu ? "gooeyNav active" : "gooeyNav"}>
        <li
          onClick={handleClickMenu}
          className={clickedRadialMenu ? "gooeyTrigger active" : "gooeyTrigger"}
        >
          <svg
            version="1.1"
            id="Capa_1"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            viewBox="0 0 54 54"
            style={{ enableBackground: "new 0 0 54 54" }}
            space="preserve"
          >
            <circle style={{ fill: "#556080" }} cx="7" cy="47" r="7" />
            <circle style={{ fill: "#556080" }} cx="27" cy="47" r="7" />
            <circle style={{ fill: "#556080" }} cx="47" cy="47" r="7" />
            <circle style={{ fill: "#556080" }} cx="7" cy="27" r="7" />
            <circle style={{ fill: "#556080" }} cx="27" cy="27" r="7" />
            <circle style={{ fill: "#556080" }} cx="47" cy="27" r="7" />
            <circle style={{ fill: "#556080" }} cx="7" cy="7" r="7" />
            <circle style={{ fill: "#556080" }} cx="27" cy="7" r="7" />
            <circle style={{ fill: "#556080" }} cx="47" cy="7" r="7" />
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
          </svg>
        </li>
        <li className="icons-menu">
          <a href="/" className="nav-bar__link block p-2 text-black">
            <svg
              data-id="icon-home"
              className="nav-bar__icon block mx-auto overflow-visible stroke-red-pale s-28px"
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              viewBox="0 0 28 28"
            >
              <path
                fill="none"
                stroke="#000000"
                strokeDasharray="60,42"
                strokeDashoffset="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit="10"
                strokeWidth="1.2"
                d="M2.7 26.8h7.5v-7.2s-.4-3.9 3.4-3.9c3.4 0 3.4 3.9 3.4 3.9v7.3h7.5V11.8L13.7 1 2.8 11.9l-.1 14.9z"
              ></path>
              <path
                fill="none"
                strokeDasharray="27,75"
                strokeDashoffset="33"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit="10"
                strokeWidth="1.2"
                d="M2.7 26.8h7.5v-7.2s-.4-3.9 3.4-3.9c3.4 0 3.4 3.9 3.4 3.9v7.3h7.5V11.8L13.7 1 2.8 11.9l-.1 14.9z"
              ></path>
              <path
                fill="none"
                stroke="#000000"
                strokeDasharray="0,102"
                strokeDashoffset="35"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit="10"
                strokeWidth="1.2"
                d="M2.7 26.8h7.5v-7.2s-.4-3.9 3.4-3.9c3.4 0 3.4 3.9 3.4 3.9v7.3h7.5V11.8L13.7 1 2.8 11.9l-.1 14.9z"
              ></path>
              <path
                fill="none"
                stroke="currentColor"
                strokeDasharray="7,95"
                strokeDashoffset="44"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit="10"
                strokeWidth="1.2"
                d="M2.7 26.8h7.5v-7.2s-.4-3.9 3.4-3.9c3.4 0 3.4 3.9 3.4 3.9v7.3h7.5V11.8L13.7 1 2.8 11.9l-.1 14.9z"
              ></path>
            </svg>
            <p>Home</p>
          </a>
        </li>
        <li className="icons-menu">
          <a
            href="https://github.com/rodolphe37/cra-react-ultimate-messenger"
            target="new"
          >
            <svg
              data-id="icon-pen"
              className="nav-bar__icon block mx-auto overflow-visible fill-yellow-sun s-34px lg:s-28px relative z-1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 28 28"
            >
              <path d="M15.2 26.1h.2l.4.5-.1.5c-.1.2-.4.3-.6.2l-.3-.1-.1-.1-.1-.1-.1-.2v-.1c0-.3.1-.5.4-.6H15.2zm5.8-1.4c.2.3.1.7-.2.9-1 .5-2 1-3 1.3-.4.1-.7-.1-.8-.5-.1-.4.1-.7.5-.8a13 13 0 002.7-1.2c.2-.1.6 0 .8.3zM4.8 21.9a12 12 0 005.1 3.5c.3.1.5.5.4.8-.1.3-.5.5-.8.4a13 13 0 01-5.6-3.9c-.2-.3-.2-.7.1-.9.2-.2.6-.2.8.1zm21.4-3.8c.3.1.6.5.4.9-.9 2.2-2.3 4.1-4.1 5.5-.3.2-.7.2-1-.1-.2-.3-.2-.7.1-.9 1.6-1.3 2.9-3 3.7-5 .1-.3.5-.5.9-.4zm-23.7-.4l1.2 2.7a.7.7 0 11-1.1.7c-.6-.9-1-1.9-1.4-3-.1-.4.1-.8.5-.9.3 0 .7.2.8.5zm-1.2-2.9c.3 0 .5.1.7.4v.5l-.1.2-.4.3-.5-.1c-.2-.1-.3-.4-.3-.6v-.1l.1-.1.1-.1.1-.1.2-.1.1-.2zM6 4.1c.2.3.2.7-.1.9a11.6 11.6 0 00-2.8 3.8l-.3.7-.3.7-.3.4-.5.1c-.2 0-.3-.2-.4-.3v-.5l.3-.9.4-.8.8-1.5C3.4 5.7 4.1 4.8 5 4c.3-.2.7-.2 1 .1zm4.1-2.8c.3.2.5.6.3.9-.1.2-.2.3-.4.3l-.7.3-.6.4c-.5.1-.9.4-1.3.7-.3.2-.7.1-.9-.2-.3-.3-.2-.7.1-.9L8 2l.7-.4.8-.3h.6zm2.2-.6l.3.1.1.1.1.1.1.1v.1l-.1.5-.2.2-.1.1h-.2-.1-.1l-.4-.5.1-.5c0-.2.3-.3.5-.3z"></path>
              <circle
                cx="14"
                cy="14"
                r="7"
                fill="none"
                stroke="#fff"
                strokeDasharray="0 44"
                strokeWidth="14"
                className="svg-pen__circle"
                transform="scale(-1,1) translate(-28,0) rotate(-90 14 14)"
              ></circle>
              <path
                fill="#000"
                d="M16.5 5.2c.3.2.5.6.3 1l-4.5 8.1c-1.3 2.4-2 5.2-2.1 8 2.3-1.5 4.3-3.5 5.6-5.9l4.4-7.9-1.7-.9-3.6 6.5c-.2.3-.6.4-1 .2-.3-.2-.4-.6-.3-.9l3.7-6.6c.4-.5.7-.7 1-.8.3-.1.7-.1 1 .1l1.9 1.1c.3.2.5.5.6.8.1.3 0 .7-.1.9L17.2 17c-1.5 2.7-3.7 5-6.4 6.6l-.7.2-.6-.2c-.4-.2-.6-.6-.6-1.1-.1-3.1.7-6.2 2.2-8.9l4.5-8.1c.2-.4.6-.5.9-.3zM19.3 1c.9-.2 1.8-.1 2.6.3 1.6.9 2.2 3 1.3 4.6l-.3.6c-.1.2-.3.4-.6.3l-.3-.1-4.7-2.6c-.2-.1-.3-.2-.3-.4l.1-.5.3-.6A3 3 0 0119.3 1z"
              ></path>
            </svg>
            <p>Repo</p>
          </a>
        </li>
        <li className="icons-menu">
          <a
            href="https://react-ultimate-messenger-documentation.netlify.app/docs/intro"
            target="new"
          >
            <svg
              data-id="icon-bottle"
              className="nav-bar__icon block mx-auto overflow-visible fill-blue-primary s-28px"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 28 28"
            >
              <g fill="#000" className="svg-sos-bottle">
                <path d="M17.1 11.6V7c.2-.2.3-.6.3-.9V3.7l-.3-.9V1.4c0-.8-.6-1.4-1.4-1.4h-3.6c-.8 0-1.4.6-1.4 1.4v1.5c-.2.2-.3.5-.3.8v2.5c0 .3.1.6.3.8v4.6c-2 .3-3.5 2.1-3.5 4.1v11.8h1.4V15.7c0-1.3 1-2.5 2.3-2.7.7-.1 1.2-.7 1.2-1.4V7v-.2h3.7v4.8c0 .7.5 1.3 1.2 1.4 1.4.2 2.5 1.3 2.5 2.7v11.8h1.4V15.7a4.3 4.3 0 00-3.8-4.1zm-5-10.2h3.6v1.1h-3.6V1.4zm3.9 4h-4.2V3.9H16v1.5z"></path>
                <path d="M10.9 15.7c-.4 0-.7.3-.7.7v4.9c0 .4.3.7.7.7s.7-.3.7-.7v-4.9c0-.4-.3-.7-.7-.7z"></path>
              </g>
              <path fill="#FFF" d="M0 25.5h28V28H0z"></path>
              <path d="M28 24.4c-1.2 0-1.8.7-2.3 1.4-.4.6-.7.8-1.2.8-.4 0-.7-.3-1.2-.9s-1.1-1.4-2.3-1.4c-1.3 0-1.9.8-2.4 1.4-.4.5-.7.8-1.2.8-.4 0-.7-.3-1.2-.9s-1.1-1.4-2.3-1.4c-1.3 0-1.9.8-2.3 1.4-.4.5-.7.8-1.2.8-.4 0-.7-.3-1.2-.9s-1.1-1.4-2.3-1.4c-1.3 0-1.9.8-2.3 1.4-.4.5-.7.8-1.2.8-.4 0-.7-.3-1.2-.9-.5-.6-1-1.3-2.2-1.4h-.1v1.4c.5 0 .7.3 1.1.8.6 1 1.2 1.8 2.4 1.8s1.8-.8 2.3-1.4.7-.8 1.3-.8c.5 0 .8.3 1.2.8.4.6 1.1 1.4 2.3 1.4s1.8-.8 2.3-1.4.7-.9 1.2-.9.8.3 1.2.8c.4.6 1.1 1.4 2.3 1.4s1.8-.8 2.3-1.4.7-.9 1.2-.9.8.3 1.2.8c.4.6 1.1 1.4 2.3 1.4s1.9-.8 2.3-1.4c.5-.6.7-.9 1.2-.9v-1.1"></path>
            </svg>
            <p>Sos</p>
          </a>
        </li>
        <li className="icons-menu">
          <a
            href="https://react-ultimate-messenger-documentation.netlify.app/prices"
            target="new"
          >
            <svg
              data-id="icon-dices"
              className="nav-bar__icon block mx-auto overflow-visible fill-pink-loterie s-28px"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 28 28"
            >
              <g fill="#000" className="svg-dices__sparkles">
                <g className="svg-dices__sparkle-tl">
                  <path d="M6.9 8.1c.4 0 .7.3.7.7 0 .4-.3.7-.7.7H3.4c-.4 0-.7-.4-.7-.7 0-.4.3-.7.7-.7h3.5z"></path>
                  <path d="M9.2 1.1c.4 0 .7.3.7.7v3.5c0 .3-.3.7-.7.7-.4 0-.7-.4-.7-.7V1.8c0-.4.3-.7.7-.7z"></path>
                  <path d="M4 2.3l2.3 2.3c.3.3.3.7 0 1-.3.3-.7.3-1 0L3 3.3c-.2-.3-.2-.8 0-1s.8-.3 1 0z"></path>
                </g>
                <g className="svg-dices__sparkle-br">
                  <path d="M19.1 20.3c.4 0 .7.3.7.7v3.5c0 .4-.3.7-.7.7a.7.7 0 01-.7-.7V21c0-.4.3-.7.7-.7z"></path>
                  <path d="M23.3 21.5l2.3 2.3c.3.3.3.7 0 1s-.7.3-1 0l-2.3-2.3c-.3-.3-.3-.7 0-1s.7-.3 1 0z"></path>
                  <path d="M26.1 18c.4 0 .7.3.7.7 0 .4-.3.7-.7.7h-3.5a.7.7 0 01-.7-.7c0-.4.3-.7.7-.7h3.5z"></path>
                </g>
              </g>
              <g className="svg-dices__dice-bl">
                <path d="M14.7 14.7l-7.5-3.2H7l-.9-.1a3 3 0 00-2.7 1.8L.2 20.7l-.1.2a3 3 0 001.6 3.7l7.5 3.2.2.1c1.4.5 3-.2 3.6-1.6l2.1-4.9 1.1-2.6.1-.2c.6-1.7-.1-3.3-1.6-3.9zM15 18l-1.1 2.6-2.1 4.9-.1.1c-.4.7-1.2 1-1.9.7l-7.5-3.2-.1-.1c-.3-.2-.5-.4-.7-.8-.2-.4-.2-.8 0-1.2l3.2-7.5.1-.1c.2-.4.7-.7 1.3-.7l.6.1 7.5 3.2.1.1c.7.3 1 1.2.7 1.9zm-8.7-1.1c-.7-.3-.9-1-.6-1.6.3-.6.9-.8 1.5-.6.6.2.9.9.7 1.5-.3.6-1 .9-1.6.7zm-.7 4.7c-.2.6-.9.9-1.5.7H4c-.6-.3-.8-1-.6-1.6.3-.5.9-.8 1.5-.6.6.2.9.9.7 1.5zm2.2-.9c-.6-.2-.9-.9-.6-1.5.2-.6.9-.9 1.5-.6.6.2.9.9.6 1.5s-.9.8-1.5.6zm5.4-2.2c-.2.6-.9.9-1.5.7h-.1c-.6-.3-.9-.9-.6-1.5.3-.6.9-.9 1.5-.6.6.1.9.8.7 1.4zm-2.3 5.3s0 .1 0 0c-.3.6-1 .9-1.5.6-.6-.3-.9-.9-.6-1.5.2-.6.9-.9 1.5-.6.6.3.9.9.6 1.5z"></path>
                <path
                  fill="#000"
                  d="M14.7 14.7l-7.5-3.2H7l-.9-.1a3 3 0 00-2.7 1.8L.2 20.7l-.1.2a3 3 0 001.6 3.7l7.5 3.2.2.1c1.4.5 3-.2 3.6-1.6l2.1-4.9 1.1-2.6.1-.2c.6-1.7-.1-3.3-1.6-3.9zM15 18l-1.1 2.6-2.1 4.9-.1.1c-.4.7-1.2 1-1.9.7l-7.5-3.2-.1-.1c-.3-.2-.5-.4-.7-.8-.2-.4-.2-.8 0-1.2l3.2-7.5.1-.1c.2-.4.7-.7 1.3-.7l.6.1 7.5 3.2.1.1c.7.3 1 1.2.7 1.9z"
                ></path>
              </g>
              <path
                fill="#000"
                d="M24.9 0a3 3 0 012.9 2.7V11.1c0 1.6-1.2 2.8-2.7 2.9H16.5a2.9 2.9 0 01-2.7-2.7V2.9A3 3 0 0116.5 0H24.9zm0 1.4h-8.2c-.8 0-1.4.6-1.5 1.4V11.1c0 .8.6 1.4 1.4 1.5H24.9c.4 0 .8-.2 1.1-.4.2-.2.4-.6.4-.9V2.9c.1-.8-.6-1.5-1.5-1.5zm-1.1 7.4c.6 0 1.2.5 1.2 1.2s-.5 1.2-1.2 1.2-1.2-.5-1.2-1.2.5-1.2 1.2-1.2zm-2.9-3c.6 0 1.2.5 1.2 1.1s-.5 1.2-1.1 1.2h-.1c-.6 0-1.2-.6-1.1-1.2-.1-.6.4-1 1.1-1.1zm-3-2.9c.6 0 1.2.5 1.2 1.1s-.4 1.2-1.1 1.3h-.1c-.6 0-1.2-.6-1.1-1.2 0-.7.5-1.2 1.1-1.2z"
                className="svg-dices__dice-tr"
              ></path>
            </svg>
            <p>Prices</p>
          </a>
        </li>
        <li className="icons-menu">
          <a href="https://github.com/rodolphe37/rum-open-sources" target="new">
            <svg
              data-id="icon-user"
              className="nav-bar__icon block mx-auto overflow-visible fill-blue-primary s-28px"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 29 29"
            >
              <path d="M1.3 23.8c.4 0 .8.3.8.8V26c0 .4-.3.8-.8.8s-.8-.4-.8-.8v-1.4c0-.5.3-.8.8-.8zm13.2-7.9l2.7.3c2.6.4 5.4 1.1 5.5 1.2.4.1.7.5.6.9s-.5.7-.9.6c0 0-2.8-.8-5.4-1.1-1-.2-1.8-.2-2.4-.2-2.5 0-7.7 1.4-7.8 1.4h-.1c-2 .4-4.2 1.5-4.6 3.4-.1.4-.5.7-.9.6s-.6-.5-.6-.9c.4-2.3 2.6-4 5.8-4.6.4-.3 5.4-1.6 8.1-1.6z"></path>
              <path
                fill="#000"
                d="M17.8 12.4a5.5 5.5 0 01-5.1.8 5.4 5.4 0 01-3.4-6.9c.6-1.7 2-3 3.7-3.4 1-.3.8-1.9-.6-1.5a6.6 6.6 0 00-4.6 4.3 7 7 0 004.4 8.9c2.2.8 4.7.4 6.6-1 .4-.3.4-.8.2-1.1a1 1 0 00-1.2-.1zm7 6c3 1.3 3.6 3.3 3.6 4.7v4.1c.1.4-.1.8-.5.9H4.7a.7.7 0 01-.7-.7c0-.4.3-.7.7-.7h22.2v-3.5c0-1.4-.9-2.5-2.7-3.3-.4-.2-.6-.6-.4-1 .2-.5.6-.6 1-.5zM15.8.9c.4 0 .8.4.7.8 0 .4-.4.7-.8.7h-.5a.8.8 0 01-.8-.8c0-.4.3-.8.7-.8l.7.1z"
              ></path>
              <path
                d="M20.6 9.6a.9.9 0 01-.9-.9V2.1c0-.5.4-.9.9-.9s.9.4.9.9v6.5c0 .6-.4 1-.9 1z"
                className="svg-user__vertical"
              ></path>
              <path
                d="M23.9 6.3h-6.5c-.5 0-.9-.4-.9-.9s.4-.9.9-.9h6.5c.5 0 .9.4.9.9s-.4.9-.9.9z"
                className="svg-user__horizontal"
              ></path>
            </svg>
            <p style={{ fontSize: 11 }}>Contribute</p>
          </a>
        </li>
      </ul>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        style={{ display: "none" }}
      >
        <defs>
          <filter id="gooSVG">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="10"
              result="blur"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>
    </div>
  );
};

export default RadialMenu;
