import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import ButtonChat from "../chatComponents/components/ButtonChat";
import AdminPanel2 from "../adminDashboard/AdminPanel2";
import AdminPanel from "../adminDashboard/AdminPanel";
import isAdminAtom from "../chatComponents/stateManager/atoms/isAdminAtom";
import { useRecoilState } from "recoil";
import registerUserAtom from "../chatComponents/stateManager/atoms/registeruserAtom";
import PrivateRoute from "./PrivateRoute";
const WithAdminRoute = () => {
  const [isAdmin, setIsAdmin] = useRecoilState(isAdminAtom);
  const [registerUser] = useRecoilState(registerUserAtom);
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {isAdmin ? <Redirect to="/login" /> : <ButtonChat />}
        </Route>
        <PrivateRoute path="/admin">
          {isAdmin && registerUser !== {} ? (
            <AdminPanel2 isAdmin={isAdmin} setIsAdmin={setIsAdmin} />
          ) : (
            <Redirect to="/" />
          )}
        </PrivateRoute>
        <PrivateRoute path="/admin-alternate">
          {isAdmin && registerUser !== {} ? (
            <AdminPanel isAdmin={isAdmin} setIsAdmin={setIsAdmin} />
          ) : (
            <Redirect to="/" />
          )}
        </PrivateRoute>
      </Switch>
    </Router>
  );
};

export default WithAdminRoute;
