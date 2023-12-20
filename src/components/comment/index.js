// // Comment.js

// import React, { useCallback, useState } from "react";
// import { cn as bem } from "@bem-react/classname";
// import "../comment/styles.css";
// import Input from "../input";

// const CommentForm = ({ onCommentSubmit, parentCommentId }) => {
//   const [data, setData] = useState("");
//   const cn = bem("Comment");

//   const onChange = useCallback((value) => {
//     setData(value);
//   }, []);

//   const handleCommentSubmit = useCallback(() => {
//     onCommentSubmit(data, parentCommentId); // Передаем идентификатор родительского комментария
//     setData(""); // Очищаем поле ввода после отправки комментария
//   }, [data, onCommentSubmit, parentCommentId]);

//   return (
//     <div className={cn("container")}>
//       <p className={cn("title")}>Новый комментарий</p>
//       <Input value={data} theme={"field"} name={"comment"} onChange={onChange} />
//       <button className={cn("button")} onClick={handleCommentSubmit}>
//         Отправить
//       </button>
//     </div>
//   );
// };

// export default React.memo(CommentForm);

// CommentForm.js
// CommentForm.js

// CommentForm.js

import React, { useCallback, useState, useEffect } from "react";
import { cn as bem } from "@bem-react/classname";
import "../comment/styles.css";
import Input from "../input";

const CommentForm = ({ onCommentSubmit, parentCommentId, onCancelReply }) => {
  const [data, setData] = useState("");
  const [isReply, setIsReply] = useState(!!parentCommentId);
  const [isVisible, setIsVisible] = useState(true);
  // const [showMainForm, setShowMainForm] = useState(true); // Дополнительное состояние

  const cn = bem("Comment");

  useEffect(() => {
    setIsReply(!!parentCommentId);
    setIsVisible(true);// При смене родительского комментария форму создания нового комментария снова делаем видимой
  }, [parentCommentId]);

  const onChange = useCallback((value) => {
    setData(value);
  }, []);

  const handleCommentSubmit = useCallback(() => {
    onCommentSubmit(data, parentCommentId);
    setData("");
  }, [data, onCommentSubmit, parentCommentId]);

  const handleCancel = useCallback(() => {
    setData("");
    setIsReply(false);
    setIsVisible(false);

    // При нажатии "Отменить" на форме ответа на комментарий, снова показываем форму создания нового комментария внизу
    if (onCancelReply) {
      onCancelReply();
    }
  }, [onCancelReply]);

  return (
    isVisible && (
      <div className={cn("container")}>
        <p className={cn("title")}>{isReply ? "Новый ответ" : "Новый комментарий"}</p>
        <Input value={data} theme={"field"} name={"comment"} onChange={onChange} />
        <div>
          <button className={cn("button")} onClick={handleCommentSubmit}>
            Отправить
          </button>
          {isReply && (
            <button className={cn("button")} onClick={handleCancel}>
              Отменить
            </button>
          )}
        </div>
      </div>
    )
  );
};

export default React.memo(CommentForm);
