const fadeAnimation = {
  transitionName: 'fade',
  transitionAppear: true,
  transitionLeave: true,
  transitionAppearTimeout: 500,
  transitionLeaveTimeout: 500,
  transitionEnterTimeout: 500
};

const slideDownAnimation = {
  transitionName: 'slideDown',
  transitionAppear: true,
  transitionLeave: true,
  transitionAppearTimeout: 1000,
  transitionEnterTimeout: 1000,
  transitionLeaveTimeout: 1000
};

const roomShowUpAnimation = {
  transitionName: 'roomShowUp',
  transitionAppear: true,
  transitionLeave: true,
  transitionAppearTimeout: 1000,
  transitionEnterTimeout: 1000,
  transitionLeaveTimeout: 1000
};

const roomShowUpActiveAnimation = {
  ...roomShowUpAnimation,
  transitionName: 'roomShowUpActive'
};

const fadeInHighlighted = {
  transitionName: 'fadeInHighlighted',
  transitionAppear: true,
  transitionLeave: true,
  transitionAppearTimeout: 4000,
  transitionEnterTimeout: 4000,
  transitionLeaveTimeout: 4000
};

const slideUpAnimation = {};

export {
  fadeAnimation,
  roomShowUpAnimation,
  roomShowUpActiveAnimation,
  slideDownAnimation,
  slideUpAnimation,
  fadeInHighlighted
};