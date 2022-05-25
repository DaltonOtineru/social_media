import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/userSlice';
import './Posts.scss';
import './Post.scss';
import { db } from '../../firebase-config';
import { doc, onSnapshot } from '@firebase/firestore';
import avatar from '../../assets/avatar.jpeg';
import { BsChat } from 'react-icons/bs';
import { BiRepost } from 'react-icons/bi';
import { AiOutlineHeart } from 'react-icons/ai';
import { FiDownload } from 'react-icons/fi';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const user = useSelector(selectUser);

  useEffect(() => {
    db.collection('posts')
      .orderBy('timestamp', 'desc')
      .onSnapshot((snapshot) =>
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
            // name: doc.name,
            // email: doc.email,
            // photoUrl: doc.photoUrl || '',
            // text: doc.text,
            // timestamp: doc.timestamp,
            // image: doc.image,
          }))
        )
      );
  }, []);

  const convertTimestamp = (firebaseTimestamp) => {
    const newTimestamp = new Date(firebaseTimestamp.toDate()).toUTCString();

    return newTimestamp;
  };

  return (
    <div className="posts">
      {posts &&
        posts.map(({ id, data: { name, text, email, image, timestamp } }) => (
          <div className="post" key={id}>
            <div className="post__avatar">
              <img src={avatar} className="avatar__img" />
            </div>
            <div className="post__details">
              <div className="post__user">
                <p className="post__name">{name}</p>•
                <p className="post__handle">{email}</p>
                {/* <span>{timestamp ? convertTimestamp(timestamp) : ''}</span> */}
              </div>
              {text && <div className="post__text">{text}</div>}
              {image && (
                <div className="post__imgWrap">
                  <img src={image} className="post__img" />
                </div>
              )}
              <div className="post__iconWrap">
                <div className="post__icon">
                  <BsChat />
                </div>
                <div className="post__icon">
                  <BiRepost className="special" />
                </div>
                <div className="post__icon">
                  <AiOutlineHeart />
                </div>
                <div className="post__icon">
                  <FiDownload />
                </div>
              </div>
            </div>
            {/* <h1>{name && name}</h1>
            <h1>{email}</h1>
            <h1>{text}</h1>
            {image && <img src={image} />} */}
          </div>
        ))}
    </div>
  );
};

export default Posts;
