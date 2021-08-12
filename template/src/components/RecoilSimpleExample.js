import { Fragment } from "react";
import { useRecoilState } from "recoil";
import exampleClickedAtom from "../chatComponents/stateManager/atoms/exampleClicked";
import exampleSelector from "../chatComponents/stateManager/selectors/exampleSelector";

const RecoilSimpleExample = ({ t, logo }) => {
  // EXAMPLE OF HOW TO USE RECOIL (ATOM AND SELECTOR) WITH EASE
  const [exampleState] = useRecoilState(exampleSelector);
  const [clickedExample, setClickedExample] =
    useRecoilState(exampleClickedAtom);

  const handleClickExampleSelector = () => {
    if (!clickedExample) {
      setClickedExample(true);
    }
    if (clickedExample) {
      setClickedExample(false);
    }
  };
  // END OF EXAMPLE RECOIL STATE MANAGMENT
  return (
    <Fragment>
      <span style={{ cursor: "pointer" }} onClick={handleClickExampleSelector}>
        <img src={logo} className="App-logo" alt="logo" />
      </span>
      <p style={{ fontSize: 18, maxWidth: 300, marginBottom: 22 }}>
        {t("exampleRecoil")}
      </p>
      <p style={{ fontSize: 15, maxWidth: 300 }}>{exampleState}</p>
    </Fragment>
  );
};

export default RecoilSimpleExample;
