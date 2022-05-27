import React, { useState } from 'react';
import './CommentReply.scss';
import {
  CalendarIcon,
  ChartBarIcon,
  EmojiHappyIcon,
  PhotographIcon,
  XIcon,
} from '@heroicons/react/outline';
import avatar from '../../assets/avatar.jpeg';

const CommentReply = () => {
  const [reply, setReply] = useState('');
  return (
    <div className="post__commentWrap">
      <div className="post__commentTop">
        <img src={avatar} alt="user avatar" className="post__commentImg" />
      </div>
      <div className="post__commentBottom">
        <textarea
          placeholder="Tweet your reply"
          className="post__commentInput"
          value={reply}
          onChange={(e) => setReply(e.target.value)}
        />
        <div className="post__emojiOuter">
          <div className="post__emojiwrap">
            <div className="post__emoji">
              <PhotographIcon className="post__commentEmoji" />
            </div>
            <div className="post__emoji">
              <EmojiHappyIcon className="post__commentEmoji" />
            </div>
            <div className="post__emoji">
              <ChartBarIcon className="post__commentEmoji" />
            </div>
          </div>
          <button className="post__replyButton">Reply</button>
        </div>
      </div>
    </div>
  );
};

export default CommentReply;
