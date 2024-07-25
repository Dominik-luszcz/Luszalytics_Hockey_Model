import './App.css';
import React from 'react';
import Navbar from "./components/Navbar/Navbar.js";
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'

import Home from './pages';
import PWAA from './pages/pwaa.js';
import TeamPWAA from './pages/team_pwaa.js';
import StatExplanations from './pages/stat_explanations.js';
import PlayersPWAA from './pages/players_pwaa.js';
import SearchPWAA from './pages/pwaa_search.js';
import PlayerComparisonPWAA from './pages/pwaa_player_comparison.js';
import Percentile from './pages/percentile.js';

function App() {

  return (
    <Router>
      <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/percentile-search" element={<Percentile/>} />
          <Route path="/pwaa" element={<PWAA />} />
          <Route path="/pwaa-team" element={<TeamPWAA/>} />
          <Route path="/pwaa-stat-explanations" element={<StatExplanations/>} />
          <Route path="/pwaa-players" element={<PlayersPWAA/>} />
          <Route path="/pwaa-search" element={<SearchPWAA/>} />
          <Route path="/pwaa-player-comparison" element={<PlayerComparisonPWAA/>} />
        </Routes>
    </Router>
  );
}


export default App;