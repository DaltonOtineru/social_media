import React from 'react';
import Feed from '../components/Feed/Feed';
import Sidebar from '../components/Sidebar/Sidebar';
import Widgets from '../components/Widgets/Widgets';
import { modalState, postIdState } from '../atoms/modalAtom';

import { useRecoilState } from 'recoil';
import Modal from '../components/Modal/Modal';

const Home = () => {
  const [isOpen, setIsOpen] = useRecoilState(modalState);
  const [postId, setPostId] = useRecoilState(postIdState);
  console.log(postId);
  return (
    <main className="app">
      <Sidebar />
      <Feed />
      <Widgets />
      {isOpen && <Modal />}
    </main>
  );
};

export default Home;
