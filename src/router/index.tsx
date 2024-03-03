import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";
import Login from "../features/login/LoginView";
import OnRent from "../features/onRent/OnRentView";
import RentLog from "../features/rentLog/RentLogView";
import Subscriber from "../features/subscriber/SubscriberView";
import Layout from "./Layout";

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        {/* サイドメニュー必要ないコンポーネント*/}
        <Route path="/admin_map/Login" component={Login} />

        {/* サイドメニューが必要なコンポーネント */}
        <Route>
          <Layout>
            <Switch>
              <PrivateRoute path="/admin_map/Rent_log" component={RentLog} />
              <PrivateRoute path="/admin_map/" component={OnRent} />
            </Switch>
          </Layout>
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
