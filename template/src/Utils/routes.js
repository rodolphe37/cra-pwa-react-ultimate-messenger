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
import PublicRoute from "./PublicRoute";
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
        <PublicRoute path="/login">
          <Join isAdmin={isAdmin} setIsAdmin={setIsAdmin} />
        </PublicRoute>
        <PublicRoute path="/home">
          <HomeChat />
        </PublicRoute>
        <PublicRoute path={`/chat/${roomId}`}>
          <ChatRoom />
        </PublicRoute>
        <PublicRoute path={`/video/${roomId}`}>
          <VideoChatComponent roomId={roomId} />
        </PublicRoute>
        <PublicRoute path="/load">
          <Loader />
        </PublicRoute>
        <PublicRoute path="/intro">
          <BottomDrawer />
        </PublicRoute>
        <PublicRoute path="/meteo">
          <Weather />
        </PublicRoute>
        {withAdminPanel ? <WithAdminRoute /> : null}
        <PublicRoute>
          <Alert />
        </PublicRoute>
      </Switch>
    </Router>
  );
};

export default Routes;
