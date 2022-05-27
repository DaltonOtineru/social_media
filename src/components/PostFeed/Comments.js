import React from 'react';
import Comment from './Comment';
import './Comment.scss';
import uuid from 'react-uuid';

const Comments = ({ comments }) => {
  return (
    <>
      {comments.length !== 0 &&
        comments.map((comment) => (
          <Comment
            comment={comment.data()}
            key={uuid()}
            uid={comment.uid}
            id={comment.id}
          />
        ))}
    </>
  );
};

export default Comments;
