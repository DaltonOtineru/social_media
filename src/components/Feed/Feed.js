import React from 'react';
import './Feed.scss';
import { BsStars } from 'react-icons/bs';
import Input from './Input';
import Posts from './Posts';

const Feed = () => {
  return (
    <section className="feed">
      <div className="feed__header sticky">
        <div className="feed__headerInner">
          <span className="feed__homeHeader">Home</span>
          <BsStars className="feed__headerIcon" />
        </div>
      </div>

      <Input />
      {/* Posts */}
      <Posts />
    </section>
  );
};

export default Feed;
