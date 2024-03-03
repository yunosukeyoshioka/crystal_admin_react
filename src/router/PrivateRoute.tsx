import React from "react";
import { Route, RouteProps } from "react-router-dom";

interface PrivateRouteProps extends RouteProps {
  component: React.ComponentType<any>;
}
//トークンから有効時間をチェックする
const checkTokenExpired = () => {
  const token = sessionStorage.getItem("token");
  if (!token) {
    //トークンがなかったらnull
    return null;
  }
  //トークン有効時間判定
  const payloadBase64 = token!.split(".")[1];
  const decodedPayload = JSON.parse(atob(payloadBase64));
  const currentTime = Date.now() / 1000;

  return decodedPayload.exp < currentTime; //期限過ぎてたらtrue
};

export const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component: Component,
  ...rest
}) => {
  const isTokenExpired = checkTokenExpired();
  return (
    <Route
      {...rest}
      render={(props) => {
        //トークン有効
        if (isTokenExpired === false) {
          return <Component {...props} />;
        } else if (isTokenExpired === null) {
          //トークンがない
          window.location.href = "/admin_map/Login";
          return null;
        } else {
          alert("タイムアウトしました");
          sessionStorage.clear();
          window.location.href = "/admin_map/Login";
        }
      }}
    />
  );
};
