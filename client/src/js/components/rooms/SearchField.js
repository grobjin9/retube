import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { fadeAnimation } from '../../utils/animationSettings';

class SearchField extends React.Component {

  static propTypes = {
    searchFieldOnChange: React.PropTypes.func.isRequired,
    delay: React.PropTypes.number.isRequired,
    query: React.PropTypes.string
  };

  static defaultProps = {
    query: ''
  };

  constructor(props) {
    super(props);

    this.timer = null;
    this.lastTimeValue = null;

    this.state = {
      crossHidden: true,
      value: ''
    };

    this.inputOnChange = this.inputOnChange.bind(this);
    this.crossOnClick = this.crossOnClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { query } = nextProps;

    if (query) {
      this.setState({
        crossHidden: false,
        value: query
      });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.value !== this.state.value || nextProps.query !== this.props.query;
  }

  inputOnChange(e) {
    const { delay } = this.props;
    const newTimeValue = Date.now();

    this.setState({
      crossHidden: !this.input.value,
      value: e.target.value
    });

    if ((newTimeValue - this.lastTimeValue) < delay) {
      clearTimeout(this.timer);
    }

    this.timer = setTimeout(() => {
      this.props.searchFieldOnChange(this.input.value);
    }, delay);

    this.lastTimeValue = newTimeValue;
  }

  crossOnClick() {
    clearTimeout(this.timer);

    this.setState({
      crossHidden: true,
      value: ''
    });

    this.props.searchFieldOnChange('');
  }

  render() {
    const { crossHidden, value } = this.state;

    return (
      <div className="rooms__search-field search-field">
        <div className="search-field__content">
          <i class="search-field__icon fa fa-search" aria-hidden="true"> </i>
          <input
            onChange={this.inputOnChange}
            ref={(i) => this.input = i}
            type="text"
            placeholder="Search By Tag"
            class="search-field__input"
            value={value}
          />
          <ReactCSSTransitionGroup {...fadeAnimation} >
            { !crossHidden && <i onClick={this.crossOnClick} class="search-field__icon fa fa-times" aria-hidden="true"> </i> }
          </ReactCSSTransitionGroup>
        </div>
      </div>
    );
  }
}

export default SearchField;