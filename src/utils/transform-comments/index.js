export function transformComments(comments) {
    const commentMap = new Map();
    const result = [];

    comments.forEach((comment) => {
      commentMap.set(comment._id, comment);
      comment.children = [];
    });

    comments.forEach((comment) => {
      const parentComment = commentMap.get(comment.parent._id);
      if (parentComment) {
        parentComment.children.push(comment);
      } else {
        result.push(comment);
      }
    });

    return result;
  }
