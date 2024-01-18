import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Index from "./components/pages/IndexPage";
import LoginPage from "./components/pages/LoginPage";
import RegisterPage from "./components/pages/RegisterPage";
import Dashboard from "./components/pages/DashboardPage";
import FeedsPage from "./components/pages/FeedsPage";
import EditorPage from "./components/pages/EditorPage";

export default function App() {
  // let [error, setError] = useState("null");

  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={Index} />
        <Route exact path="/register" component={RegisterPage} />
        <Route exact path="/Editor/:id" component={EditorPage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/dash" component={Dashboard} />
        <Route exact path="/feeds" component={FeedsPage} />
      </div>
    </Router>
  );
}
