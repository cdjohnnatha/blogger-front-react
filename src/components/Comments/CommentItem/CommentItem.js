import React from "react";

const CommentItem = ({ comment }) => (
  <div className="d-flex flex-column align-items-start">
    <span className="align-self-start">
      {comment.content}
    </span>
    <small className="align-self-end">
      {comment.lastUpdate}
    </small>
    {/* <span>
    {comment.user}
    </span> */}
  </div>
);

export default CommentItem;
