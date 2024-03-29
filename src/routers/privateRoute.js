import React from "react";
import { Redirect, Route } from "react-router-dom";
// import { checkCookie } from "../utils/cookies";

const PrivateRoute = ({ children, ...rest }) => {
    // починить крч сделать нормально
  let token = localStorage.getItem("token");
  return (
    <Route
      {...rest}
      render={(props) =>
        token ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
