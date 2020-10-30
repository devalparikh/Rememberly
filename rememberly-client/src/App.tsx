import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

// Navbar
import NavBarCustom from './components/navbar/NavBarCustom'

// Landing Page
import LandingPage from './components/home/LandingPage'

// Main Memory Section
import Memory from './components/memory/Memory'

import Journal from './components/journal/Journal'

function App() {

  return (
    <div>
      {/* Nav Bar */}
      <NavBarCustom title="Rememberly"></NavBarCustom>


      <Router>
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
          <Route path="/journal">
            {/* Journal Section */}
            <Journal></Journal>
          </Route>
          <Route path="/travel">
            {/* Travel Section */}

          </Route>
          <Route path="/settings">
            {/* Settings Section */}

          </Route>
        </Switch>
      </Router>

    </div>
  );
}

export default App;
