import React, { useEffect, useState } from 'react';
import Moment from 'react-moment';
import { db } from '../../firebase-config';
import {
  doc,
  onSnapshot,
  addDoc,
  collection,
  serverTimestamp,
} from '@firebase/firestore';
import { useRecoilState } from 'recoil';
import { modalState, postIdState, postPageState } from '../../atoms/modalAtom';
import {
  CalendarIcon,
  ChartBarIcon,
  EmojiHappyIcon,
  PhotographIcon,
  XIcon,
} from '@heroicons/react/outline';

import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/userSlice';
import { useNavigate } from 'react-router-dom';
import uuid from 'react-uuid';
import EmojiPicker from '../Feed/EmojiPicker';

const Modal = () => {
  const user = useSelector(selectUser);
  // const [post, setPost] = useState('');
  const [comment, setComment] = useState('');
  const [isOpen, setIsOpen] = useRecoilState(modalState);
  const [postId, setPostId] = useRecoilState(postIdState);
  const [postPage, setPostPage] = useRecoilState(postPageState);
  const [showEmojis, setShowEmojis] = useState(false);

  const navigate = useNavigate();
  console.log(postPage);
  useEffect(
    () =>
      onSnapshot(doc(db, 'posts', postId), (snapshot) => {
        setPostPage(snapshot.data());
      }),
    [db, postId]
  );

  const sendComment = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, 'posts', postId, 'comments'), {
      uid: user.uid,
      name: user.displayName,
      email: user.email,
      // username: user.username || '',
      id: uuid(),
      photoUrl: user.photoUrl || '',
      comment: comment,
      timestamp: serverTimestamp(),
    });
    setIsOpen(false);
    setComment('');

    navigate(`/${postId}`);
  };

  const addEmoji = (e) => {
    let sym = e.unified.split('-');
    let codesArray = [];
    sym.forEach((el) => codesArray.push('0x' + el));
    let emoji = String.fromCodePoint(...codesArray);
    setComment(comment + emoji);
    setShowEmojis(false);
  };

  return (
    <div
      className={isOpen ? 'modal' : 'modal__hidden'}
      onClick={(e) => e.stopPropagation()}
    >
      <XIcon
        className="modal__xIcon"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(false);
        }}
      />
      <div className="modal__inner2">
        <div className="modal__postInfo">
          <div className="modal__posterInfo">
            <img
              src={postPage?.photoUrl}
              alt=""
              className="modal__avatar__poster"
            />
            <div className="block__1">
              <div className="block__2">
                <p className="modal__name">{postPage?.name}</p>
                {/* <p className="modal__email">{postPage?.email}</p> */}
                <p className="modal__timestamp">
                  <Moment fromNow className="post__timestamp">
                    {postPage?.timestamp?.toDate()}
                  </Moment>
                </p>
              </div>
              <div className="block__3">
                <p className="modal__postText">{postPage?.text}</p>
                <p className="modal__replyingTo">
                  Replying to{' '}
                  <span className="reply__handle">{postPage?.name}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="modal__inner_2">
        {/* <div className="modal__userInfo"> */}
        <img src={user.photoUrl} alt="" className="modal__avatar__viewer" />
        <textarea
          className="modal__textArea"
          rows="4"
          placeholder="Tweet your reply"
          value={comment}
          // onClick={(e) => e.stopPropagation()}
          onChange={(e) => setComment(e.target.value)}
        />
      </div>
      <div className="modal__actions">
        <div className="modal__emojis">
          <div className="modal__emoji">
            <PhotographIcon className="modal__emojiBtn" />
          </div>
          <div className="modal__emoji">
            <ChartBarIcon className="modal__emojiBtn" />
          </div>
          <div
            className="modal__emoji"
            onClick={(e) => {
              e.stopPropagation();
              setShowEmojis(!showEmojis);
            }}
          >
            <EmojiHappyIcon className="modal__emojiBtn" />
          </div>
          <div className="modal__emoji">
            <CalendarIcon className="modal__emojiBtn" />
          </div>
        </div>
        <div className="modal__btnWrap">
          <button className="modal__btn" onClick={sendComment}>
            Reply
          </button>
        </div>
        {showEmojis && (
          <EmojiPicker
            className="emoji__modalComment"
            theme="dark"
            onEmojiSelect={addEmoji}
          />
        )}
      </div>
    </div>
  );
};

export default Modal;
