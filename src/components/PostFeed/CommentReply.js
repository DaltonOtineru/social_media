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
import { postIdState } from '../../atoms/modalAtom';
import { useRecoilState } from 'recoil';
import { db } from '../../firebase-config';
import {
  doc,
  onSnapshot,
  addDoc,
  collection,
  serverTimestamp,
} from '@firebase/firestore';
import { selectUser } from '../../redux/userSlice';
import { useSelector } from 'react-redux';

const CommentReply = () => {
  const user = useSelector(selectUser);
  const [reply, setReply] = useState('');
  const [postId, setPostId] = useRecoilState(postIdState);

  const sendComment = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, 'posts', postId, 'comments'), {
      uid: user.uid,
      name: user.displayName,
      email: user.email,
      photoUrl: user.photoUrl || '',
      comment: reply,
      timestamp: serverTimestamp(),
    });

    setReply('');

    // navigate(`/${postId}`);
    // console.log(postPage);
  };

  return (
    <div className="post__commentWrap">
      <div className="post__commentTop">
        <img
          src={user.photoUrl}
          alt="user avatar"
          className="post__commentImg"
        />
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
          <button className="post__replyButton" onClick={sendComment}>
            Reply
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentReply;
