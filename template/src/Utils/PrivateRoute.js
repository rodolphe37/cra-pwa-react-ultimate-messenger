import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useRecoilState } from "recoil";
import isAdminAtom from "../chatComponents/stateManager/atoms/isAdminAtom";
import registerUserAtom from "../chatComponents/stateManager/atoms/registeruserAtom";

// handle the private routes
function PrivateRoute({ component: Component, ...rest }) {
  const [isAdmin] = useRecoilState(isAdminAtom);

  const [registerUser] = useRecoilState(registerUserAtom);
  return (
    <Route
      {...rest}
      render={(props) => {
        isAdmin && registerUser !== {} ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        );
      }}
    />
  );
}

export default PrivateRoute;
