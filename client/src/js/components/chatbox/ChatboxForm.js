import React from 'react';
import {emojify} from 'react-emojione';
import ChatboxEmojiBar from './ChatboxEmojiBar';

class ChatboxForm extends React.Component {

  static propTypes = {
    formOnSubmit: React.PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      emojiBarHidden: true
    };

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.emojiBarOnClick = this.emojiBarOnClick.bind(this);
    this.onEmojiClick = this.onEmojiClick.bind(this);
  }

  handleFormSubmit(e) {
    e.preventDefault();

    if (this.input && this.input.value) {
      this.props.formOnSubmit(this.input.value);

      this.input.value = '';
    }
  }

  handleKeyDown(e) {
    const enterKey = e.keyCode === 13;

    if (enterKey && this.input && !this.input.value) e.preventDefault();

    if (enterKey && e.shiftKey) return;

    if (enterKey && this.input && this.input.value) {
      e.preventDefault();

      this.props.formOnSubmit(this.input.value);

      this.input.value = '';
    }

  };

  emojiBarOnClick() {
    this.setState({
      emojiBarHidden: !this.state.emojiBarHidden
    });

  }

  onEmojiClick(shortcode) {
    this.input.value += shortcode;
    this.input.focus();
  }

  render() {
    return (
      <form onSubmit={this.handleFormSubmit} className="chatbox__form cb-form clearfix">
        <div className="cb-form-content clearfix">
          <div className="row chatbox__row">
            <div className="col-md-10 cb-form__textarea-block">
              <div className="cb-form__input-container clearfix">
                <textarea
                  onKeyDown={this.handleKeyDown}
                  type="text" ref={(i) => (this.input = i)}
                  class="cb-form__input"
                  placeholder="Enter a message"
                />

                <ChatboxEmojiBar
                  hidden={this.state.emojiBarHidden}
                  onEmojiClick={this.onEmojiClick}
                  onOpen={this.emojiBarOnClick}
                />
              </div>
            </div>
            <div className="col-md-2 cb-form__submit-block">
              <button type="submit" className="cb-form__submit-btn">
                <i class="fa fa-paper-plane" aria-hidden="true"></i>
              </button>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

export default ChatboxForm;