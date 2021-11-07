import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

// pages
import HomePage from "./pages/HomePage";
import Control from "./pages/JoinGame";
import History from "./pages/History";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route exact path="/game">
          <Control />
        </Route>

        <Route exact path="/history">
          <History />
        </Route>
      </Switch>
    </Router>
  );
}
