import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import HomeChat from "../chatComponents/components/chatRoom/HomeChat/HomeChat";
import ChatRoom from "../chatComponents/components/chatRoom/ChatRoom/ChatRoom";
import Join from "../chatComponents/components/Join/Join";
import ButtonChat from "../chatComponents/components/ButtonChat";
import VideoChatComponent from "../chatComponents/components/videoChatComponent/VideoChatComponent";
import Loader from "../chatComponents/components/loader/Loader";
import BottomDrawer from "../chatComponents/components/bottomDrawer/BottomDrawer";
import Weather from "../chatComponents/components/weatherComponent/WeatherComponent";
import isAdminAtom from "../chatComponents/stateManager/atoms/isAdminAtom";
import { useRecoilState } from "recoil";
import roomIdAtom from "../chatComponents/stateManager/atoms/roomIdAtom";
import Alert from "../chatComponents/customAlert/Alert";
import { withAdminPanel } from "../postInstallConfig/withAdmin";
import WithAdminRoute from "./withAdminRoute";
const Routes = () => {
  const [isAdmin, setIsAdmin] = useRecoilState(isAdminAtom);
  const [roomId] = useRecoilState(roomIdAtom);

  return (
    <Router>
      <Switch>
        {withAdminPanel ? (
          <Route exact path="/">
            {isAdmin ? <Redirect to="/login" /> : <ButtonChat />}
          </Route>
        ) : (
          <Route exact path="/">
            <ButtonChat />
          </Route>
        )}
        <Route path="/login">
          <Join isAdmin={isAdmin} setIsAdmin={setIsAdmin} />
        </Route>
        <Route path="/home">
          <HomeChat />
        </Route>
        <Route path={`/chat/${roomId}`}>
          <ChatRoom />
        </Route>
        <Route path={`/video/${roomId}`}>
          <VideoChatComponent roomId={roomId} />
        </Route>
        <Route path="/load">
          <Loader />
        </Route>
        <Route path="/intro">
          <BottomDrawer />
        </Route>
        <Route path="/meteo">
          <Weather />
        </Route>
        {withAdminPanel ? <WithAdminRoute /> : null}
        <Route>
          <Alert />
        </Route>
      </Switch>
    </Router>
  );
};

export default Routes;
