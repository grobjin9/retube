import React from 'react';
import ChatboxEmojiElement from './ChatboxEmojiElement';
import scrollify from '../HOCs/scrollify';
import * as emojis from '../../utils/emojiShortnames';

class ChatboxEmojiList extends React.Component {

  static propTypes = {
    set: React.PropTypes.string.isRequired,
    onEmojiClick: React.PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.set !== this.props.set;
  }

  render() {
    const { set, onEmojiClick } = this.props;

    return (
      <div ref={list => this.list = list} className="emoji-bar__list">
        { emojis[set].map(shortcode =>
          <ChatboxEmojiElement key={shortcode} shortcode={shortcode} onEmojiClick={onEmojiClick} />)
        }
      </div>
    );
  }
}

export default scrollify(ChatboxEmojiList, {
  renderRepass: true,
  styles: {
    list: {
      height: "100%"
    }
  },
  classNames: {
    list: "scroller",
    thumb: "scroller__thumb"
  }
});