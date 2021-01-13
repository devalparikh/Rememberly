import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

// Navbar
import NavBarCustom from './components/navbar/NavBarCustom';
import NavBar2 from './components/navbar/NavBar2';

// Landing Page
import LandingPage from './components/home/landing/LandingPage';

// Main Memory Section
import Memory from './components/memory/Memory';

import { Journal } from './components/journal/Journal';
import { CreateJournal } from './components/journal/create_journal/CreateJournal';
import { CreateJournalMood } from './components/journal/create_journal/CreateJournalMood';
import { CreateJournalActivities } from './components/journal/create_journal/CreateJournalActivities';
import { CreateJournalConfirm } from './components/journal/create_journal/CreateJournalConfirm';


import { Login } from './components/auth/Login';
import { Register } from './components/auth/Register';
import { Logout } from './components/auth/Logout';

import { TransitionGroup, CSSTransition } from "react-transition-group";

import { AnimatePresence } from "framer-motion";
import axios from 'axios';

interface iUser {
  _id: string;
  email: string;
  username: string;
  custom_activities: [];
  createdAt: Date;
}

export interface iCheckin {
  user_id: string,
  title: string,
  mood: number,
  notes: string,

  // Selected Activities
  activities: [],
  selected_activities: [];

}

function App() {

  const currentUserDefault: iUser = {
    _id: "",
    email: "",
    username: "",
    custom_activities: [],
    createdAt: new Date()
  }
  const [currentUser, setCurrentUser] = useState<iUser>(currentUserDefault);

  const newCheckin: iCheckin = {
    user_id: "",
    title: "",
    mood: 0,
    notes: "",
    activities: [],
    selected_activities: [],
  }
  const [checkin, SetCheckin] = useState<iCheckin>(newCheckin);

  useEffect(() => {
    if (localStorage.usertoken) {

      // TODO: API call to get user info
      axios
        .get(`${process.env.REACT_APP_URL}/auth/user`, {
          headers: { "x-auth-token": `${localStorage.usertoken}` }
        })
        .then(res => {
          setCurrentUser(res.data);
        })
        .catch(err => {
          console.log(err);
        });
    }

  }, []);


  return (
    <div>
      {/* Nav Bar */}
      {/* <NavBarCustom title="Rememberly"></NavBarCustom> */}
      <NavBar2 />




      <Router>
        <AnimatePresence>

          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route exact path="/">
              {/* Landing Page */}
              <LandingPage></LandingPage>
            </Route>
            <Route path="/home">
              {/* Memory Section */}
              <Memory></Memory>
            </Route>
            <Route path="/habits">
              {/* Habits Section */}

            </Route>
            <Route exact path="/journal">
              {/* Journal Section */}
              {
                localStorage.usertoken
                  ?
                  <Journal
                    user_id={currentUser._id}
                    name={currentUser.username}
                    userCreatedAt={currentUser.createdAt}
                  ></Journal>
                  :
                  <Login></Login>
              }
            </Route>

            <Route exact path="/journal/create">
              {/* Journal Section */}
              {/* TODO: change to get name from API */}
              <CreateJournal
                name={currentUser.username}
                newCheckin={checkin}
                setCheckin={(updatedCheckin: iCheckin): void => { SetCheckin(updatedCheckin) }}
              ></CreateJournal>
            </Route>

            <Route exact path="/journal/create/mood/:mood">
              {/* Journal Section */}
              {/* TODO: change to get name from API */}
              <CreateJournalMood></CreateJournalMood>
            </Route>

            <Route exact path="/journal/create/mood/:mood/activities/:selectedActivities">
              {/* Journal Section */}
              {/* TODO: change to get name from API */}
              <CreateJournalActivities
                custom_activities={currentUser.custom_activities}
              ></CreateJournalActivities>
            </Route>

            <Route exact path="/journal/create/mood/:mood/activities/:selectedActivities/confirm">
              {/* Journal Section */}
              {/* TODO: change to get name from API */}
              <CreateJournalConfirm
                user_id={currentUser._id}
                name={currentUser.username}
                custom_activities={currentUser.custom_activities}
                newCheckin={checkin}
                setCheckin={(updatedCheckin: iCheckin): void => { SetCheckin(updatedCheckin) }}
              ></CreateJournalConfirm>
            </Route>

            <Route path="/travel">
              {/* Travel Section */}

            </Route>
            <Route path="/settings">
              {/* Settings Section */}

            </Route>

            <Route path="/login">
              <Login></Login>
            </Route>

            <Route path="/register">
              <Register></Register>
            </Route>

            <Route path="/logout">
              <Logout></Logout>
            </Route>

          </Switch>
        </AnimatePresence>
      </Router>

    </div>
  );
}

export default App;
