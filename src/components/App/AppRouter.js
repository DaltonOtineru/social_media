import React from 'react';
import './App.scss';
import '../../styles/index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';

const AppRouter = () => {
  return (
    <>
      <Router>
        <main className="app bg-black min-h-screen flex max-w-[1500px] mx-auto">
          {/* Sidebar */}
          <Sidebar />
          {/* Feed */}
          {/* Widgets */}
        </main>
      </Router>
    </>
  );
};

export default AppRouter;
