import React from "react";
import { Redirect, Route } from "react-router-dom";
// import { checkCookie } from "../utils/cookies";

const PrivateRoute = ({ children, ...rest }) => {
  let kek = false;
  console.log(kek);
  return (
    <Route
      {...rest}
      render={(props) =>
        kek ? (
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
