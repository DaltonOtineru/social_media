import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import avatar from '../../assets/avatar.jpeg';
import { BsTrash, BsChatDots } from 'react-icons/bs';
import { DotsHorizontalIcon } from '@heroicons/react/outline';
import { VscArrowSwap } from 'react-icons/vsc';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { FiDownload } from 'react-icons/fi';
import { HiOutlineChartBar } from 'react-icons/hi';
import { selectUser } from '../../redux/userSlice';
import { db } from '../../firebase-config';
import {
  doc,
  deleteDoc,
  setDoc,
  onSnapshot,
  collection,
} from '@firebase/firestore';
import Moment from 'react-moment';
import '../Modal/Modal.scss';
import { useRecoilState } from 'recoil';
import { modalState, postIdState } from '../../atoms/modalAtom';
import { useNavigate } from 'react-router-dom';
import Modal from '../Modal/Modal';

const Post = ({
  id,
  data: { name, text, email, image, timestamp, uid, photoUrl, username },
}) => {
  const user = useSelector(selectUser);
  const [isOpen, setIsOpen] = useRecoilState(modalState);
  const [postId, setPostId] = useRecoilState(postIdState);

  const [likes, setLikes] = useState([]);
  const [liked, setLiked] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    onSnapshot(collection(db, 'posts', id, 'likes'), (snapshot) =>
      setLikes(snapshot.docs)
    );
    console.log(likes);
  }, [db, id]);

  useEffect(() => {
    setLiked(likes.findIndex((like) => like.id === uid) !== -1);
  }, [likes, uid]);

  const likePost = async () => {
    if (liked) {
      await deleteDoc(doc(db, 'posts', id, 'likes', uid));
    } else {
      await setDoc(doc(db, 'posts', id, 'likes', uid), {
        username: uid,
      });
      console.log(likes);
    }
  };

  const deletePost = async (id, e) => {
    // e.stopPropagation();
    const docRef = doc(db, 'posts', id);
    await deleteDoc(docRef);
  };

  const viewPost = () => {
    setPostId(id);
    navigate(`/:${postId}`);
  };

  return (
    <div className="post" key={id} id={id} onClick={() => viewPost()}>
      <div className="post__avatar">
        <img src={photoUrl} className="avatar__img" />
      </div>
      <div className="post__details">
        <div className="post__user">
          <p className="post__name">{name}</p>
          {/* <p className="post__handle">{email}</p> */}
          <span className="post__dot">•</span>
          <Moment fromNow className="post__timestamp">
            {timestamp?.toDate()}
          </Moment>
          <div className="post__dotsWrap">
            <DotsHorizontalIcon className="post__dots" />
          </div>
        </div>
        {text && <div className="post__text">{text}</div>}
        {image && (
          <div className="post__imgWrap">
            <img src={image} className="post__img" />
          </div>
        )}
        <div className="post__iconWrap">
          <div className="post__iconInner">
            <div
              className="post__icon"
              onClick={(e) => {
                e.stopPropagation();
                setPostId(id);
                setIsOpen(true);
              }}
            >
              <BsChatDots />
            </div>
          </div>
          <div className="post__icon repost">
            <VscArrowSwap className="post__repost" />
          </div>
          <div
            className="post__icon"
            onClick={(e) => {
              e.stopPropagation();
              likePost();
            }}
          >
            {likes.length > 0 ? (
              <>
                <AiFillHeart className="post__heartLiked" />
                <span className="post__likeCount">{likes.length}</span>{' '}
              </>
            ) : (
              <AiOutlineHeart className="post__heart" />
            )}
          </div>
          <div className="post__icon" onClick={(e) => e.stopPropagation()}>
            <FiDownload />
          </div>
          {user.uid === uid ? (
            <div
              className="post__icon"
              onClick={(e) => {
                e.stopPropagation();
                deletePost(id);
              }}
            >
              <BsTrash className="post__trash" />
            </div>
          ) : (
            <div className="post__icon" onClick={(e) => e.stopPropagation()}>
              <HiOutlineChartBar className="post__iconBlue" />
            </div>
          )}
        </div>
      </div>
      {isOpen && postId === id ? <Modal /> : ''}
    </div>
  );
};

export default Post;
