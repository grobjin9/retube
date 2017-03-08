import React from 'react';
import { emojify } from 'react-emojione';

const options = {
  convertShortnames: true,
  convertUnicode: true,
  convertAscii: true,
  styles: {
    display: 'inline'
  },
  // this click handler will be set on every emoji
  handleClick: event => alert(event.target.title)
};

const Message = ({ avatar, text, username, date, self }) => {
  const selfMessageClass = self ? 'cb-message--self' : '';

  return (
    <div className={"chatbox__message cb-message clearfix " + selfMessageClass}>
      <div className="cb-message__avatar-container">
        <img src={avatar} className="img-circle img-responsive" alt="user"/>
      </div>
      <div className="cb-message__body">
        <div className="cb-message__info clearfix">
          <div className="cb-message__username">{username}</div>
          <div className="cb-message__date">{new Date(date).toLocaleTimeString()}</div>
        </div>
        <div className="cb-message__text">
          {emojify(text, options)}
        </div>
      </div>
    </div>
  );
};

Message.propTypes = {
  username: React.PropTypes.string.isRequired,
  avatar: React.PropTypes.string.isRequired,
  date: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.instanceOf(Date)]),
  text: React.PropTypes.string.isRequired,
  self: React.PropTypes.bool.isRequired
};

export default Message;