import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import {fadeAnimation} from '../../utils/animationSettings';

const ReadyTag = ({text, onTagRemove, highlighted}) => {
  const highlightedTagContainerClass = highlighted ? "new-cr-form__tag-container--highlighted" : "";

  const handleRemoveClick = (e) => {
    onTagRemove(text);
  };

  return (
    <ReactCSSTransitionGroup
      component="li"
      {...fadeAnimation}
      className={"new-cr-form__tag-container " + highlightedTagContainerClass}
    >
      <span className="new-cr-form__tag-ready">{text}</span>
      <a onClick={handleRemoveClick} className="new-cr-form__tag-close">
        <span className="new-cr-form__tag-icon">×</span>
      </a>
    </ReactCSSTransitionGroup>
  );
};

ReadyTag.propTypes = {
  text: React.PropTypes.string.isRequired,
  onTagRemove: React.PropTypes.func.isRequired,
  highlighted: React.PropTypes.bool.isRequired
};

export default ReadyTag;