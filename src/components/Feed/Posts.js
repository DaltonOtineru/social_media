import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/userSlice';
import './Posts.scss';
import './Post.scss';
import { db } from '../../firebase-config';
import {
  doc,
  onSnapshot,
  query,
  orderBy,
  collection,
} from '@firebase/firestore';

import Post from './Post';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const user = useSelector(selectUser);

  useEffect(
    () =>
      onSnapshot(
        query(collection(db, 'posts'), orderBy('timestamp', 'desc')),
        (snapshot) => {
          setPosts(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              uid: doc.uid,
              data: doc.data(),
            }))
          );
        }
      ),

    [db]
  );

  const convertTimestamp = (firebaseTimestamp) => {
    const newTimestamp = new Date(firebaseTimestamp.toDate()).toUTCString();

    return newTimestamp;
  };

  return (
    <div className="posts">
      {posts &&
        posts.map(({ id, data, post }) => (
          <Post id={id} key={id} data={data} post={post} />
        ))}
    </div>
  );
};

export default Posts;
