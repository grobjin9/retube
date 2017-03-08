import React from 'react';
import ChatboxEmojiList from './ChatboxEmojiList';
import ChatboxEmojiTab from './ChatboxEmojiTab';

class ChatboxEmojiBar extends React.Component {

  static propTypes = {
    hidden: React.PropTypes.bool.isRequired,
    onEmojiClick: React.PropTypes.func.isRequired,
    onOpen: React.PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      set: "faces",
      title: "Faces"
    };

    this.handleOnOpen = this.handleOnOpen.bind(this);
    this.onSetChange = this.onSetChange.bind(this);
    this.renderEmojiBar= this.renderEmojiBar.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.hidden !== this.props.hidden || nextState.set !== this.state.set;
  }

  handleOnOpen(e) {
    const isValid = e.target === this.emojiBar || e.target === this.emojiBarIcon;

    if (isValid) {
      this.props.onOpen();
    }
  }

  onSetChange(set, title) {
    this.setState({ set, title });
  }

  renderEmojiBar() {
    const { hidden } = this.props;

    return (
      <div style={{display: hidden ? "none" : "block"}} className="cb-form__emojiBar-list-wrapper">
        <div className="emoji-bar__header">
          <div className="emoji-bar__header-content">{this.state.title}</div>
        </div>

        <div className="emoji-bar__body">
          <ChatboxEmojiList onEmojiClick={this.props.onEmojiClick} set={this.state.set} />
        </div>

        <div className="emoji-bar__tabs clearfix">
          <ChatboxEmojiTab onSetChange={this.onSetChange} icon="fa-smile-o" currentSet={this.state.set} title="Faces" set="faces" />
          <ChatboxEmojiTab onSetChange={this.onSetChange} icon="fa-leaf" currentSet={this.state.set} title="Nature" set="nature" />
          <ChatboxEmojiTab onSetChange={this.onSetChange} icon="fa-cutlery" currentSet={this.state.set} title="Food & Drink" set="food" />
          <ChatboxEmojiTab onSetChange={this.onSetChange} icon="fa-plane" currentSet={this.state.set} title="Travel & Places" set="travel" />
          <ChatboxEmojiTab onSetChange={this.onSetChange} icon="fa-futbol-o" currentSet={this.state.set} title="Activity" set="activity" />
          <ChatboxEmojiTab onSetChange={this.onSetChange} icon="fa-building" currentSet={this.state.set} title="Objects" set="objects" />
          <ChatboxEmojiTab onSetChange={this.onSetChange} icon="fa-flag-o" currentSet={this.state.set} title="Flags" set="flags" />
          <ChatboxEmojiTab onSetChange={this.onSetChange} icon="fa-star-half-o" currentSet={this.state.set} title="Symbols" set="symbols" />
        </div>
      </div>
    );
  }

  render() {
    const { hidden } = this.props;
    const activeEmojiBarClass = hidden ? "" : "cb-form__emojiBar--active";

    return (
      <div onClick={this.handleOnOpen} className={"cb-form__emojiBar " + activeEmojiBarClass} ref={(e) => this.emojiBar = e}>
        { this.renderEmojiBar() }

        <i class="fa fa-smile-o cb-form__emojiBar-icon" aria-hidden="true" ref={(i) => this.emojiBarIcon = i}></i>
      </div>
    );
  }
}

export default ChatboxEmojiBar;