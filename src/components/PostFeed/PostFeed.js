import { ArrowLeftIcon } from '@heroicons/react/outline';
import React, { useEffect, useState } from 'react';
import { BsStars } from 'react-icons/bs';
import Input from '../Feed/Input';
import SinglePost from './SinglePost';
import './PostFeed.scss';
import { useNavigate } from 'react-router-dom';
import { db } from '../../firebase-config';
import { postIdState } from '../../atoms/modalAtom';
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
} from '@firebase/firestore';
import Comments from './Comments';
import { useRecoilState } from 'recoil';
import CommentReply from './CommentReply';

const PostFeed = () => {
  const [postId, setPostId] = useRecoilState(postIdState);
  const [comments, setComments] = useState([]);

  const navigate = useNavigate();

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, 'posts', postId, 'comments'),
          orderBy('timestamp', 'desc')
        ),
        (snapshot) => setComments(snapshot.docs)
      ),
    [db, postIdState]
  );
  return (
    <section className="post__feed">
      <div className="postFeed__header sticky">
        <div className="postFeed__headerInner">
          <span className="postFeed__homeHeader">
            <ArrowLeftIcon
              className="postFeed__arrow"
              onClick={() => navigate('/')}
            />
            <h3 className="postFeed__headerText">Tweet</h3>
          </span>
          <BsStars className="postFeed__headerIcon" />
        </div>
      </div>
      <Input />
      <SinglePost />
      <CommentReply />
    </section>
  );
};

export default PostFeed;
