import React, { Component } from "react";

// Utilities
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import store from "./store";
import { Provider } from "react-redux";

// Auth
import jwt_decode from "jwt-decode";
import setAuthToken from "./util/setAuthToken";

// Components
import TopNav from "./components/layout/TopNav";
import BotNav from "./components/layout/BotNav";
import Footer from "./components/layout/Footer";

import Register from "./components/auth/Register";
import Login from "./components/auth/Login";

import Landing from "./components/layout/Landing";

// Style
import "./App.css";
import { Container } from "reactstrap";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <TopNav />
            <BotNav />
            <Route exact path="/" component={Landing} />
            <Container>
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
            </Container>

            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
