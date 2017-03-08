import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { fadeAnimation } from '../../utils/animationSettings';

const ProfileMenu = ({ signoutOnClick }) => {

  const handleClick = function (e) {
    e.preventDefault();

    signoutOnClick();
  };

  return (
    <ReactCSSTransitionGroup component="div" className="user-frame__profile-menu profile-menu" {...fadeAnimation}>
      <a href="/auth/signout" className="profile-menu__link" onClick={handleClick}>Sign Out</a>
    </ReactCSSTransitionGroup>
  );
};

ProfileMenu.propTypes = {
  signoutOnClick: React.PropTypes.func.isRequired
};

export default ProfileMenu;