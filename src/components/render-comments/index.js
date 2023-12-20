import React from "react";
import { formatDate } from "../../utils/date-format";
import CommentContainer from "../comment-container";
import CommentForm from "../comment";

const renderComments = (comments, depth = 0, parentCommentId, handleReplyClick, handleCommentSubmit, onCancelReply, isUserLoggedIn) => {
  return (
    <>
      {comments.map((comment) => (
        <div
          key={comment._id}
          style={{ marginLeft: `${depth * 30}px`, paddingLeft: "10px" }}
        >
          <CommentContainer
            name={comment.author.profile.name && comment.author.profile.name}
            dateUpdate={formatDate(
              comment.dateUpdate ? comment.dateUpdate : comment.dateCreate
            )}
            text={comment.text}
            onReplyClick={() => handleReplyClick(comment._id)}
          />
          {comment.children &&
            comment.children.length > 0 &&
            renderComments(comment.children, depth + 1, parentCommentId, handleReplyClick, handleCommentSubmit, onCancelReply, isUserLoggedIn)}
          {parentCommentId === comment._id && (
            <CommentForm
              onCommentSubmit={handleCommentSubmit}
              parentCommentId={parentCommentId}
              onCancelReply={onCancelReply}
              isUserLoggedIn={isUserLoggedIn}
            />
          )}
        </div>
      ))}
    </>
  );
};
export default renderComments;
