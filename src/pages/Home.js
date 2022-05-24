import React from 'react';
import Feed from '../components/Feed/Feed';
import Sidebar from '../components/Sidebar/Sidebar';
import Widgets from '../components/Widgets/Widgets';

const Home = () => {
  return (
    <main className="app">
      <Sidebar />
      <Feed />
      <Widgets />
    </main>
  );
};

export default Home;
