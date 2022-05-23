import React from 'react';
import './App.scss';
// import '../../styles/index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import Feed from '../Feed/Feed';
import Widgets from '../Widgets/Widgets';

const AppRouter = () => {
  return (
    <>
      <Router>
        <main className="app ">
          {/* Sidebar */}
          <Sidebar />
          {/* Feed */}
          <Feed />
          {/* Widgets */}
          <Widgets />
        </main>
      </Router>
    </>
  );
};

export default AppRouter;
