
import './App.css';
import React from 'react';

import { Routes,Route,BrowserRouter } from "react-router-dom";
import User from './function/User';
import OpenendShow from './show/OpenendShow';
import RankingShow from './show/RankingShow';
import WordcloudShow from './show/WordcloudShow';
import MultipleShow from './show/MultipleShow';

import Open from './pages/Open';


const App = () => {


  return (
    <div>
      
        <BrowserRouter>
            <Routes>
              <Route path="User/:docId" element={<User />} />
              <Route path="Open/:docId" element={<Open />} />
              <Route path="/OpenendShow/:docId/:index" element={<OpenendShow />} />
              <Route path="/RankingShow/:docId/:index" element={<RankingShow />} />
              <Route path="/WordcloudShow/:docId/:index" element={<WordcloudShow />} />
              <Route path="/MultipleShow/:docId/:index" element={<MultipleShow />} />
            </Routes>
        </BrowserRouter>
      
      

    </div>
  );
};

export default App;
