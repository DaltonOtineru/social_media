import React, { useEffect, useState } from 'react';
import Moment from 'react-moment';
import { db } from '../../firebase-config';
import {
  doc,
  onSnapshot,
  addDoc,
  collection,
  serverTimestamp,
  deleteDoc,
  setDoc,
} from '@firebase/firestore';
import { useRecoilState } from 'recoil';
import { modalState, postIdState, postPageState } from '../../atoms/modalAtom';
import { BsTrash, BsChatDots } from 'react-icons/bs';
import { DotsHorizontalIcon } from '@heroicons/react/outline';
import { VscArrowSwap } from 'react-icons/vsc';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import avatar from '../../assets/avatar.jpeg';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/userSlice';
import { useNavigate } from 'react-router-dom';
import { HiOutlineChartBar } from 'react-icons/hi';
import { FiDownload } from 'react-icons/fi';

// import '../Feed/Post.scss';

const SinglePost = () => {
  const user = useSelector(selectUser);
  const [post, setPost] = useState('');
  const [comment, setComment] = useState('');
  const [isOpen, setIsOpen] = useRecoilState(modalState);
  const [postId, setPostId] = useRecoilState(postIdState);
  const [postPage, setPostPage] = useRecoilState(postPageState);
  //   const [likes, setLikes] = useState([]);
  //   const [liked, setLiked] = useState(false);

  //   useEffect(() => {
  //     onSnapshot(collection(db, 'posts', postId, 'likes'), (snapshot) =>
  //       setLikes(snapshot.docs)
  //     );
  //     console.log(likes);
  //   }, [db, postId]);

  //   useEffect(() => {
  //     setLiked(likes.findIndex((like) => like.id === post.uid) !== -1);
  //   }, [likes, post.uid]);

  useEffect(
    () =>
      onSnapshot(doc(db, 'posts', postId), (snapshot) => {
        setPostPage(snapshot.data());
      }),
    [db, postId]
  );

  //   const likePost = async () => {
  //     if (liked) {
  //       await deleteDoc(doc(db, 'posts', postId, 'likes', post.uid));
  //     } else {
  //       await setDoc(doc(db, 'posts', postId, 'likes', post.uid), {
  //         username: user.uid,
  //       });
  //       console.log(likes);
  //     }
  //   };

  //   const deletePost = async (id) => {
  //     const docRef = doc(db, 'posts', id);
  //     await deleteDoc(docRef);
  //   };

  const sendComment = async (e) => {
    e.preventDefault();

    await addDoc(collection(db, 'posts', postId, 'comments'), {
      uid: user.uid,
      name: user.displayName,
      email: user.email,
      // photoUrl: user.photoUrl || '',
      comment: comment,
      timestamp: serverTimestamp(),
    });
    setIsOpen(false);
    setComment('');

    // navigate(`/${postId}`);
  };

  return (
    <div className="post" key={postPage?.id} id={postPage?.id}>
      <div className="post__avatar">
        <img src={avatar} className="avatar__img" />
      </div>
      <div className="post__details">
        <div className="post__user">
          <p className="post__name">{postPage?.name}</p>
          <p className="post__handle">{postPage?.email}</p>
          <span className="post__dot">•</span>
          <Moment fromNow className="post__timestamp">
            {postPage?.timestamp?.toDate()}
          </Moment>
          <div className="post__dotsWrap">
            <DotsHorizontalIcon className="post__dots" />
          </div>
        </div>
        {postPage?.text && <div className="post__text">{postPage?.text}</div>}
        {postPage?.image && (
          <div className="post__imgWrap">
            <img src={postPage?.image} className="post__img" />
          </div>
        )}
        <div className="post__iconWrap">
          <div className="post__icon repost">
            <VscArrowSwap className="post__repost" />
          </div>
          <div className="post__icon">
            {post ? (
              <>
                <AiFillHeart className="post__heartLiked" />
                <span className="post__likeCount">
                  {postPage?.likes.length}
                </span>{' '}
              </>
            ) : (
              <AiOutlineHeart className="post__heart" />
            )}
          </div>
          <div className="post__icon">
            <FiDownload />
          </div>
          {user.uid === postPage?.uid ? (
            <div className="post__icon">
              <BsTrash className="post__trash" />
            </div>
          ) : (
            <div className="post__icon">
              <HiOutlineChartBar className="post__iconBlue" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SinglePost;
