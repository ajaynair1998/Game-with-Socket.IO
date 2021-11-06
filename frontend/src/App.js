import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

// pages
import HomePage from "./pages/HomePage";
import Control from "./pages/JoinGame";

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
      </Switch>
    </Router>
  );
}
