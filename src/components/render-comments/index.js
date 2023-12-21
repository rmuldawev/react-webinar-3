import React from 'react';
import CommentContainer from "../comment-container";
import CommentForm from "../comment";
import { formatDate } from '../../utils/date-format';

const RenderComments = ({ 
  comments, 
  currentUserId, 
  depth = 0, 
  parentCommentId, 
  onReplyClick, 
  onCommentSubmit, 
  onCancelReply, 
  isUserLoggedIn 
}) => {
  return (
    <>
      {comments.map((comment) => {
        return (
          <div key={comment._id} style={{ marginLeft: `${depth * 30}px`, paddingLeft: "10px" }}>
          <CommentContainer
            name={comment.author.profile.name}
            dateUpdate={formatDate(comment.dateCreate)}
            text={comment.text}
            onReplyClick={() => onReplyClick(comment._id)}
            isAuthor={comment.author._id === currentUserId}
          />
          {comment.children && comment.children.length > 0 && (
            <RenderComments
              comments={comment.children}
              currentUserId={currentUserId}
              depth={depth + 1}
              parentCommentId={parentCommentId}
              onReplyClick={onReplyClick}
              onCommentSubmit={onCommentSubmit}
              onCancelReply={onCancelReply}
              isUserLoggedIn={isUserLoggedIn}
            />
          )}
          {parentCommentId === comment._id && isUserLoggedIn && (
            <CommentForm
              onCommentSubmit={onCommentSubmit}
              parentCommentId={parentCommentId}
              isUserLoggedIn={isUserLoggedIn}
              onCancelReply={onCancelReply} 

            />
          )}
        </div>
        )
      })}
    </>
  );
};

export default RenderComments;
