import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import FirstComment from './ChatboxFirstComment';
import DateMessage from './ChatboxDateMessage';
import Message from './ChatboxMessage';
import ChatboxSpinner from './ChatboxSpinner';
import {fadeAnimation} from '../../utils/animationSettings';
import scrollify from '../HOCs/scrollify';

class ChatboxBody extends React.PureComponent {

  static propTypes = {
    isLoading: React.PropTypes.bool.isRequired,
    done: React.PropTypes.bool.isRequired,
    messages: React.PropTypes.array.isRequired,
    userId: React.PropTypes.string.isRequired,
    onFirstCommentPost: React.PropTypes.func.isRequired,
    onTopHit: React.PropTypes.func.isRequired,
    chatroomId: React.PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);

    this._lastScrollHeight = null;

    this.renderMessages = this.renderMessages.bind(this);
    this.chatboxBodyOnScroll = this.chatboxBodyOnScroll.bind(this);
    this.scrollToBottom = this.scrollToBottom.bind(this);
    this.scrollToPosition = this.scrollToPosition.bind(this);
  }

  componentDidUpdate(prevProps) {
    const prevChatroomId = prevProps.chatroomId;
    const currentChatroomId = this.props.chatroomId;
    const {messages, userId, isLoading} = this.props;

    if (prevChatroomId !== currentChatroomId) {
      this.list.scrollTop = this.list.scrollHeight;
    } else if (messages.length) {
      const nextLastMessage = messages[messages.length - 1];
      const messageDate = new Date(nextLastMessage.createdAt);
      const list = this.list;

      const shouldScrollToBottom = (
        (prevProps.messages.length === 0 && messages.length) ||
        (nextLastMessage.creator._id === userId && messageDate.getSeconds() === new Date().getSeconds())
      );
      const shouldScrollToPosition = messages.length - prevProps.messages.length <= 2 && isLoading;

      if (shouldScrollToBottom) {
        this.scrollToBottom();
      } else if (shouldScrollToPosition) {
        this.scrollToPosition();
      } else {
        list.scrollHeight === this._lastScrollHeight ? this.scrollToBottom() : this.scrollToPosition();
      }
    }
  }

  renderMessages() {
    const {messages, userId} = this.props;

    if (!messages.length) {
      return <FirstComment onCommentPost={this.props.onFirstCommentPost}/>;
    }

    let nextDate = new Date();

    return messages.map(message => {
      const {_id, creator: {avatar, username, _id: creatorId}, text, createdAt} = message;
      const isOwner = creatorId === userId;
      let list = [
        <ReactCSSTransitionGroup component="div" key={_id} {...fadeAnimation} >
          <Message avatar={avatar} username={username} text={text} date={createdAt} self={isOwner}/>
        </ReactCSSTransitionGroup>
      ];
      const currentDate = new Date(createdAt);

      if (nextDate !== currentDate.getDate()) {
        nextDate = currentDate.getDate();

        list.unshift(<DateMessage key={nextDate} date={currentDate}/>);
      }

      return list;
    });
  }

  scrollToBottom() {
    this.list.scrollTop = this.list.scrollHeight - this.list.offsetHeight;
  }

  scrollToPosition() {
    this.list.scrollTop = this.list.scrollHeight - this._lastScrollHeight;
  }

  chatboxBodyOnScroll() {
    const {onTopHit, done, isLoading} = this.props;

    if (this.list.scrollTop === 0 && !done && !isLoading) onTopHit();
  }

  render() {
    const {isLoading, messages, done} = this.props;
    const isInitialRender = isLoading && !messages.length;

    if (this.list) {
      this._lastScrollHeight = this.list.scrollHeight;
    }

    return (
      <div onScroll={this.chatboxBodyOnScroll} ref={list => this.list = list} className="chatbox__body">
        {
          !done && <div className="chatbox__load-indicator" style={{visibility: isLoading ? "visible" : "hidden"}}>
            { !isInitialRender ? <ChatboxSpinner /> : "" }
          </div>
        }
        { isInitialRender ? <ChatboxSpinner /> : this.renderMessages() }
      </div>
    );
  }
}

export default scrollify(ChatboxBody, {
  adjustPosition: true,
  styles: {
    thumb: {
      height: "80px"
    }
  },
  classNames: {
    list: "scroller",
    thumb: "scroller__thumb"
  }
});