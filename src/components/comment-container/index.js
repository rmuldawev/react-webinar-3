import React from "react";
import '../comment-container/styles.css'
import { cn as bem } from "@bem-react/classname";
const CommentContainer = ({ name, dateUpdate, text, onReplyClick }) => {
  const cn = bem("Comment");

  return (
    <div className={cn()}>
      <div className={cn("title-container")}>
        <p className={cn("name")}>{name}</p>
        <p className={cn("date")}>{dateUpdate} </p>
      </div>
      <p className={cn("text")}>{text}</p>
      <button className={cn("answer")} onClick={onReplyClick}>
        Ответить
      </button>
    </div>
  );
};

export default React.memo(CommentContainer);
