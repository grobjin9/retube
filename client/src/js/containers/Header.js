import React from 'react';
import { connect } from 'react-redux';

import requireAuth from './requireAuth';
import ProfileMenu from '../components/header/ProfileMenu';
import Avatar from '../components/header/Avatar';
import { userSignoutRequest } from '../actions/authActions';

class Header extends React.Component {
  
  static propTypes = {
    username: React.PropTypes.string.isRequired,
    avatar: React.PropTypes.string.isRequired,
    userSignoutRequest: React.PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      isMenuHidden: true
    };

    this.userFrameOnClick = this.userFrameOnClick.bind(this);
    this.signoutOnClick = this.signoutOnClick.bind(this);
  }

  signoutOnClick() {
    this.props.userSignoutRequest();
  }

  userFrameOnClick() {
    this.setState({
      isMenuHidden: !this.state.isMenuHidden
    });
  }

  render() {
    const { isMenuHidden } = this.state;
    const { username, avatar } = this.props;

    const activeUserFrameClass = isMenuHidden ? "" : "user-frame--active";
    const activeUserFrameArrowClass = isMenuHidden ?  "" : "user-frame__arrow--active";

    return (
      <header className="header container-fluid clearfix">
        <div className="header__container container">
          <div className="header__logotype"> RE:tube </div>
          
          <div onClick={this.userFrameOnClick} className={"header__user-frame user-frame " + activeUserFrameClass}>
            <div className="user-frame__username"> {username} </div>

            <Avatar src={avatar} />

            <div className={"user-frame__arrow " + activeUserFrameArrowClass}></div>

            { !this.state.isMenuHidden && <ProfileMenu signoutOnClick={this.signoutOnClick} /> }
          </div>
        </div>
      </header>
    );
  }
}

const mapStateToProps = ({ user: { username, avatar }}) => ({ username, avatar });

export default requireAuth(connect(mapStateToProps, { userSignoutRequest })(Header));