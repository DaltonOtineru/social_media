import React from 'react';
import avatar from '../../assets/avatar.jpeg';
import Moment from 'react-moment';
import './Comment.scss';
import { BsTrash } from 'react-icons/bs';
import { selectUser } from '../../redux/userSlice';
import { useSelector } from 'react-redux';
import { postIdState, postPageState } from '../../atoms/modalAtom';
import { useRecoilState } from 'recoil';
import { db } from '../../firebase-config';
import { doc, deleteDoc, collection } from '@firebase/firestore';

const Comment = ({ comment, id }) => {
  const user = useSelector(selectUser);
  const [postId, setPostId] = useRecoilState(postIdState);
  const [postPage, setPostPage] = useRecoilState(postPageState);

  const deleteComment = async (id) => {
    const docRef = doc(db, 'posts', postId, 'comments', comment.id);
    await deleteDoc(docRef);
    console.log(docRef);
  };
  console.log(postPage);
  console.log(comment);
  return (
    <div className="comment">
      <div className="comment__inner">
        <div className="comment__left">
          <img
            src={comment?.photoUrl}
            alt="user avatar"
            className="comment__userImg"
          />
        </div>
        <div className="comment__right">
          <div className="comment__userInfo">
            <p className="comment__userName">{comment?.name}</p>
            {/* <span className="comment__userHandle">{comment?.email}</span> */}
            <span className="comment__dot">•</span>
            <Moment fromNow className="comment__timestamp">
              {comment?.timestamp?.toDate()}
            </Moment>
            {/* {comment?.uid === user?.uid && (
              <BsTrash className="comment__trash" onClick={deleteComment} />
            )} */}
          </div>
          <div className="comment__textWrap">
            <p className="comment__text">{comment?.comment}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;
