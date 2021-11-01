import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

// pages
import HomePage from "./pages/HomePage/HomePage";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <HomePage />
        </Route>
      </Switch>
    </Router>
  );
}
