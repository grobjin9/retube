import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { fadeAnimation } from '../../utils/animationSettings';
import { formatMessageDate } from '../../utils/format';

const DateMessage = ({ date }) => {
  return (
    <ReactCSSTransitionGroup component="div" className="chatbox__date-message date-message clearfix" {...fadeAnimation} >
      <div>
        { formatMessageDate(date) }
      </div>
    </ReactCSSTransitionGroup>
  );
};

DateMessage.propTypes = {
  date: React.PropTypes.instanceOf(Date).isRequired
};

export default DateMessage;