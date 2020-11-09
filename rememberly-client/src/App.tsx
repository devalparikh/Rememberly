import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

// Navbar
import NavBarCustom from './components/navbar/NavBarCustom';

// Landing Page
import LandingPage from './components/home/LandingPage';

// Main Memory Section
import Memory from './components/memory/Memory';

import Journal from './components/journal/Journal';
import CreateJournal from './components/journal/create_journal/CreateJournal';
import CreateJournalMood from './components/journal/create_journal/CreateJournalMood';
import CreateJournalActivities from './components/journal/create_journal/CreateJournalActivities';

import { TransitionGroup, CSSTransition } from "react-transition-group";

import { AnimatePresence } from "framer-motion";

interface State {
  name: string;
}

function App() {

  return (
    <div>
      {/* Nav Bar */}
      <NavBarCustom title="Rememberly"></NavBarCustom>


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
              <Journal></Journal>
            </Route>

            <Route exact path="/journal/create">
              {/* Journal Section */}
              {/* TODO: change to get name from API */}
              <CreateJournal name="Deval"></CreateJournal>
            </Route>

            <Route exact path="/journal/create/mood">
              {/* Journal Section */}
              {/* TODO: change to get name from API */}
              <CreateJournalMood></CreateJournalMood>
            </Route>

            <Route exact path="/journal/create/activities">
              {/* Journal Section */}
              {/* TODO: change to get name from API */}
              <CreateJournalActivities></CreateJournalActivities>
            </Route>

            <Route path="/travel">
              {/* Travel Section */}

            </Route>
            <Route path="/settings">
              {/* Settings Section */}

            </Route>
          </Switch>
        </AnimatePresence>
      </Router>

    </div>
  );
}

export default App;
