import React, {useState} from 'react';
import axios from 'axios';
import {API_BASE_URL, ACCESS_TOKEN_NAME} from './constants/apiCotants';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from './utils/PrivateRoute';

import { LoginForm } from "./components/LoginForm";
import { RegistrationForm } from "./components/RegistrationForm";
import { Dashboard } from "./components/Dashboard";
import { Home } from "./components/Home";
import { Enrollment } from './components/Enrollment';
import { Client } from './components/Client';
import { Institute } from './components/Institute';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact={true}>
          <Home />
        </Route>
        <Route path="/register">
          <RegistrationForm />
        </Route>
        <Route path="/login">
          <LoginForm />
        </Route>
        <PrivateRoute path="/dashboard">
          <Dashboard />
        </PrivateRoute>
        <PrivateRoute path="/institute">
          <Institute />
        </PrivateRoute>
        <PrivateRoute path="/client">
          <Client />
        </PrivateRoute>
        <PrivateRoute path="/enrollment">
          <Enrollment />
        </PrivateRoute>
      </Switch>
    </Router>
  )
}

export default App;
