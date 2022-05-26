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
import { modalState, postIdState } from '../../atoms/modalAtom';
import {
  CalendarIcon,
  ChartBarIcon,
  EmojiHappyIcon,
  PhotographIcon,
  XIcon,
} from '@heroicons/react/outline';
import avatar from '../../assets/avatar.jpeg';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/userSlice';
import { useNavigate } from 'react-router-dom';

const Modal = () => {
  const user = useSelector(selectUser);
  const [post, setPost] = useState('');
  const [comment, setComment] = useState('');
  const [isOpen, setIsOpen] = useRecoilState(modalState);
  const [postId, setPostId] = useRecoilState(postIdState);

  const navigate = useNavigate();

  useEffect(
    () =>
      onSnapshot(doc(db, 'posts', postId), (snapshot) => {
        setPost(snapshot.data());
      }),
    [db, postId]
  );

  const sendComment = async (e) => {
    e.preventDefault();

    await addDoc(collection(db, 'posts', postId, 'comments'), {
      uid: user.uid,
      name: user.name,
      email: user.email,
      photoUrl: user.photoUrl || '',
      comment: comment,
      timestamp: serverTimestamp(),
    });
    setIsOpen(false);
    setComment('');

    navigate(`/${postId}`);
  };

  return (
    <div className={isOpen ? 'modal' : 'modal__hidden'}>
      <XIcon className="modal__xIcon" />
      <div className="modal__inner">
        <div className="modal__postInfo">
          <div className="modal__posterInfo">
            <img src={avatar} alt="" className="modal__avatar__poster" />
            <div className="block__1">
              <div className="block__2">
                <p className="modal__name">{post?.name}</p>
                <p className="modal__email">{post?.email}</p>
                <p className="modal__timestamp">
                  <Moment fromNow className="post__timestamp">
                    {post?.timestamp?.toDate()}
                  </Moment>
                </p>
              </div>
              <div className="block__3">
                <p className="modal__postText">{post?.text}</p>
                <p className="modal__replyingTo">
                  Replying to{' '}
                  <span className="reply__handle">{post?.email}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="modal__inner_2">
        {/* <div className="modal__userInfo"> */}
        <img src={avatar} alt="" className="modal__avatar__viewer" />
        <textarea
          className="modal__textArea"
          rows="4"
          placeholder="Tweet your reply"
          value={comment}
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
          <div className="modal__emoji">
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
      </div>
    </div>
  );
};

export default Modal;