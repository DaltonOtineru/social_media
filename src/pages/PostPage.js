import { Modal } from '@mui/material';
import React from 'react';
import { useRecoilState } from 'recoil';
import { modalState, postIdState } from '../atoms/modalAtom';
import Feed from '../components/Feed/Feed';
import PostFeed from '../components/PostFeed/PostFeed';
import Sidebar from '../components/Sidebar/Sidebar';
import Widgets from '../components/Widgets/Widgets';

const PostPage = () => {
  const [isOpen, setIsOpen] = useRecoilState(modalState);
  const [postId, setPostId] = useRecoilState(postIdState);
  return (
    <main className="app">
      <Sidebar />
      <PostFeed />
      <Widgets />
      {isOpen && <Modal />}
    </main>
  );
};

export default PostPage;
