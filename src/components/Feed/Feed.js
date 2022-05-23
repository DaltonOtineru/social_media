import React from 'react';
import './Feed.scss';
import { BsStars } from 'react-icons/bs';
import TweetBox from './TweetBox';
import Input from './Input';

const Feed = () => {
  return (
    <section className="feed">
      {/* Header */}

      <div className="feed__header sticky">
        <div className="feed__headerInner">
          <span className="feed__homeHeader">Home</span>
          <BsStars className="feed__headerIcon" />
        </div>
      </div>

      {/* Tweetbox */}
      <Input />
      {/* Posts */}
    </section>
  );
};

export default Feed;
