import React from 'react';
import { Link } from 'react-router';

import requireAuth from './requireAuth';

const NavBar = () => {
  return (
    <ul role="nav" className="col-md-1 nav-bar">
      <Link to="/rooms" className="nav-bar__link" activeClassName="nav-bar__link--active">
        <i className="nav-bar__icon fa fa-commenting" aria-hidden="true"></i>
      </Link>
    </ul>
  );
};

export default requireAuth(NavBar);
