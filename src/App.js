import React, { useEffect, useReducer, useState } from "react";
import "./App.css";
import Profile from "./Components/Profile/Profile";
import { Route, Switch } from "react-router-dom";
import Login from "./Components/Login/Login";
import UserContext from "./Context/UserContext";
import UserReducer from "./Reducers/UserReducer";
import { auth, database } from "./firebase";
import Feed from "./Components/Feed/Feed";

function App() {
  const [user, dispatch] = useReducer(UserReducer, null);

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        dispatch({
          type: "LOGIN",
          user: {
            displayName: user.displayName,
            photoURL: user.photoURL,
            likedPhoto: false,
          },
        });
      }
    });
  }, []);

  return (
    <UserContext.Provider value={{ user, dispatch }} className="app">
      {console.log(user)}
      {!user ? (
        <Route path="/" component={Login} />
      ) : (
        <Switch>
          <Route exact path="/" component={Profile} />
          <Route path="/feed" component={Feed} />
        </Switch>
      )}
    </UserContext.Provider>
  );
}

export default App;
