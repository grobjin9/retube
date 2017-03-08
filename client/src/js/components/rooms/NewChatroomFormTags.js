import React from 'react';

import NewTag from './NewTag';
import ReadyTag from './ReadyTag';

const NewChatroomFormTags = ({ tags, onTagRemove, onTagCreate, onTagRemoveLast, highlightLastTag }) => {
  let tagsBlock = null;

  const tagsBlockOnClick = (e) => {
    if (e.target === tagsBlock) {
      document.querySelector('.new-cr-form__tag-container--new > .new-cr-form__tag-new').focus();
    }
  };

  const renderTags = () => {
    return tags
      .map((tag, index) => {
        return (
          <ReadyTag
            key={tag}
            highlighted={highlightLastTag && (index === tags.length - 1)}
            onTagRemove={onTagRemove}
            text={tag.trim()}
          />
        );
      })
      .concat(<NewTag
        highlightLastTag={highlightLastTag}
        onTagRemoveLast={onTagRemoveLast}
        onTagCreate={onTagCreate}
      />)
  };

  return (
    <ul
      onClick={tagsBlockOnClick}
      ref={el => tagsBlock = el}
      className="form-group new-cr-form__form-group new-cr-form__tags-block form-control clearfix"
    >
      { renderTags() }
    </ul>
  );
};

NewChatroomFormTags.propTypes = {
  tags: React.PropTypes.array.isRequired,
  onTagRemove: React.PropTypes.func.isRequired,
  onTagCreate: React.PropTypes.func.isRequired,
  onTagRemoveLast: React.PropTypes.func.isRequired,
  highlightLastTag: React.PropTypes.bool.isRequired
};

export default NewChatroomFormTags;