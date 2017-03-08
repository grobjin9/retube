import React from 'react';
import { connect } from 'react-redux';

import ChatboxHeader from './ChatboxHeader';
import ChatboxBody from '../components/chatbox/ChatboxBody';
import ChatboxForm from '../components/chatbox/ChatboxForm';

import socket from '../utils/socket';

import { fetchChatroomMessagesRequest, fetchPartialChatroomMessagesRequest } from '../actions/chatroomActions';

class ChatBox extends React.Component {

  static propTypes = {
    user: React.PropTypes.shape({
      id: React.PropTypes.string.isRequired,
      username: React.PropTypes.string.isRequired,
      avatar: React.PropTypes.string.isRequired,
      favoriteRoomsCount: React.PropTypes.number.isRequired
    }),
    chatroom: React.PropTypes.shape({
      id: React.PropTypes.string.isRequired,
      name: React.PropTypes.string.isRequired,
      messages: React.PropTypes.arrayOf(React.PropTypes.object),
      done: React.PropTypes.bool.isRequired,
      isLoading: React.PropTypes.bool.isRequired,
      error: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.bool]),
      counter: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number])
    }),
    fetchChatroomMessagesRequest: React.PropTypes.func.isRequired,
    fetchPartialChatroomMessagesRequest: React.PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.formOnSubmit = this.formOnSubmit.bind(this);
  }

  componentDidMount() {
    const currentChatroomId = this.props.routeParams.chatroomId;

    socket.emit('join chatroom', {
      id: currentChatroomId
    });

    this.props.fetchChatroomMessagesRequest(currentChatroomId);
  }

  shouldComponentUpdate(nextProps) {
    return  nextProps.chatroom.id !== this.props.chatroom.id ||
            nextProps.chatroom.messages.length !== this.props.chatroom.messages.length ||
            nextProps.chatroom.counter !== this.props.chatroom.counter ||
            nextProps.chatroom.isLoading !== this.props.chatroom.isLoading ||
            nextProps.chatroom.done !== this.props.chatroom.done ||
            nextProps.location.key !== this.props.location.key;
  }

  componentDidUpdate(prevProps) {
    const prevChatroomId = prevProps.routeParams.chatroomId;
    const currentChatroomId = this.props.routeParams.chatroomId;
    const { fetchChatroomMessagesRequest } = this.props;

    if (prevChatroomId !== currentChatroomId) {
      if (prevChatroomId) {
        socket.emit('leave chatroom', {id: prevChatroomId});
      }

      socket.emit('join chatroom', {id: currentChatroomId});

      fetchChatroomMessagesRequest(currentChatroomId);
    }
  }

  formOnSubmit(text) {
    socket.emit('message', text);
  }

  render() {
    const {
      chatroom: { id, name, counter, messages, isLoading, done },
      user: { id: userId },
      fetchPartialChatroomMessagesRequest
    } = this.props;

    return (
      <div className="chatbox">
        <ChatboxHeader roomName={name} usersCounter={counter} />

        <ChatboxBody
          ref={body => this.body = body}
          isLoading={isLoading}
          done={done}
          messages={messages}
          chatroomId={id}
          userId={userId}
          onFirstCommentPost={this.formOnSubmit}
          onTopHit={fetchPartialChatroomMessagesRequest}
        />

        { messages.length ? <ChatboxForm ref={form => this.form = form} formOnSubmit={this.formOnSubmit}/> : "" }
      </div>
    );
  }
}

const mapStateToProps = ({ user, chatroom }) => ({ user, chatroom });

export default connect(mapStateToProps, { fetchChatroomMessagesRequest, fetchPartialChatroomMessagesRequest })(ChatBox);