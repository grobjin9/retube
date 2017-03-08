import React from 'react';
import { emojify } from 'react-emojione';

const ChatboxEmojiElement = ({ shortcode, onEmojiClick}) => {

  const emojifyOptions = {
    convertShortnames: true,
    convertUnicode: true,
    convertAscii: true,
    styles: {
      display: 'inline',
      margin: '0'
    },
    handleClick: event => {
      if (event.target.title) onEmojiClick(event.target.title);
    }
  };

  return (
    <a className="emoji-bar__emoji" key={shortcode}>
      { emojify(shortcode, emojifyOptions) }
    </a>
  );
};

ChatboxEmojiElement.propTypes = {
  shortcode: React.PropTypes.string.isRequired,
  onEmojiClick: React.PropTypes.func.isRequired
};

export default ChatboxEmojiElement;