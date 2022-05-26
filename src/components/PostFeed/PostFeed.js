import React from 'react';
import { BsStars } from 'react-icons/bs';
import Input from '../Feed/Input';
import SinglePost from './SinglePost';

const PostFeed = () => {
  return (
    <section className="feed">
      <div className="feed__header sticky">
        <div className="feed__headerInner">
          <span className="feed__homeHeader">Tweet</span>
          <BsStars className="feed__headerIcon" />
        </div>
      </div>
      <Input />
      <SinglePost />
    </section>
  );
};

export default PostFeed;
