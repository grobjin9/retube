import React from 'react';
import { emojify } from 'react-emojione';

class ChatboxHeader extends React.Component {

  static propTypes = {
    usersCounter: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string]),
    roomName: React.PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.usersCounter !== this.props.usersCounter || nextProps.roomName !== this.props.roomName;
  }

  render() {
    const { roomName, usersCounter } = this.props;

    return (
      <div className="chatbox__header">
        <div className="chatbox__title">
          { emojify(roomName, {
            styles: {
              display: "inline"
            }
          }) }
          <span className="label label-success chatbox__counter">{usersCounter}</span>
        </div>
      </div>
    );
  }
}

export default ChatboxHeader;