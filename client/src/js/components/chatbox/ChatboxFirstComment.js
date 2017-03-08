import React from 'react';

const FirstComment = ({ onCommentPost }) => {

  const handleLinkClick = (e) => {
    e.preventDefault();

    onCommentPost("FIRST!!");
  };

  return (
    <div className="chatbox__first-comment first-comment">
      <div className="first-comment__content">
        <i class="fa fa-comments-o first-comment__icon" aria-hidden="true"> </i>
        <p className="first-comment__text">There are no comments yet...
          <a onClick={handleLinkClick} className="first-comment__link">become the first</a>
        </p>
      </div>
    </div>
  );
};

FirstComment.propTypes = {
  onCommentPost: React.PropTypes.func.isRequired
};

export default FirstComment