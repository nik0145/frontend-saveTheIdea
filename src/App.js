import "./App.css";
import Layout from "./layouts/default";

import Login from "./page/Login";
import Register from "./page/Register";
import NoMatch from "./page/NoMatch";
import Dashboard from "./layouts/dashboard";
// <Dashboard>
//   <PrivateRoute path="/dashboard">
//     <Ideas />
//   </PrivateRoute>
//   <PrivateRoute path="/memes">
//     <Memes />
//   </PrivateRoute>
// </Dashboard>;
import PrivateRoute from "./routers/privateRoute";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Layout>
              <Container maxWidth="sm" component="main">
                <Typography
                  component="h1"
                  variant="h2"
                  align="center"
                  color="textPrimary"
                  gutterBottom
                >
                  Сохрани свою идею
                </Typography>
                <Typography
                  variant="h5"
                  align="center"
                  color="textSecondary"
                  component="p"
                >
                  И все остальное
                </Typography>
              </Container>
            </Layout>
          </Route>
          <Route path="/login">
            <Layout>
              <Login />
            </Layout>
          </Route>
          <Route path="/register">
            <Layout>
              <Register />
            </Layout>
          </Route>
          <PrivateRoute path="/dashboard">
            <Dashboard />
          </PrivateRoute>
          
          <Route path="*">
            <NoMatch />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
