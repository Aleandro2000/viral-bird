import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import Profile from "./components/Profile";
import LogIn from "./components/LogIn";
import SignUp from "./components/SignUp";
import NotFound from "./components/NotFound";
import { AuthProvider } from "./components/Auth";
import PostForm from "./components/PostForm";
import "./App.css";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/dashboard/profile" component={Profile} />
          <Route exact path="/login" component={LogIn} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/dashboard/postform" component={PostForm} />
          <Route component={NotFound}/>
        </Switch>
      </Router>
    </AuthProvider>
  );
};

export default App;