import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { fadeAnimation } from '../../utils/animationSettings';

const ErrorNotifier = ({ error }) => {
  return (
    <ReactCSSTransitionGroup {...fadeAnimation} >
      { error && <p className="login-form__error-notifier">{ error }</p> }
    </ReactCSSTransitionGroup>
  );
};

ErrorNotifier.propTypes = {
  error: React.PropTypes.string
};

export default ErrorNotifier;