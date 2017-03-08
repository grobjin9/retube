import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Spinner from 'react-spinkit';

import { fadeAnimation } from '../../utils/animationSettings';

class Avatar extends React.Component {

  static propTypes = {
    src: React.PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false,
      isLoading: true
    };

    this.imageOnLoad = this.imageOnLoad.bind(this);
  }

  imageOnLoad() {
    this.setState({
      isLoaded: true,
      isLoading: false
    });
  }

  render() {
    const { src } = this.props;

    return (
      <div className="user-frame__avatar avatar">
        <div className="avatar__image-container">
          <ReactCSSTransitionGroup {...fadeAnimation}>
            <div className="avatar__state avatar__state--online"></div>
            <img onLoad={this.imageOnLoad} src={src} alt="user avatar" className="avatar__image img-responsive img-circle"/>
          </ReactCSSTransitionGroup>

          { this.state.isLoading && <Spinner overrideSpinnerClassName="spinner" spinnerName='circle' noFadeIn/> }
        </div>
      </div>
    );
  }
}

export default Avatar;