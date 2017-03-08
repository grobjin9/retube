import React from 'react';
import ErrorNotifier from './ErrorNotifier';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { fadeAnimation } from '../../utils/animationSettings';

class SignIn extends React.Component {

  static propTypes = {
    formOnSubmit: React.PropTypes.func.isRequired,
    errors: React.PropTypes.object
  };

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      status: ''
    };

    this.inputOnChange = this.inputOnChange.bind(this);
    this.signInOnSubmit = this.signInOnSubmit.bind(this);
  }

  inputOnChange(e) {
    const {name, value} = e.target;

    this.setState({
      [name]: value
    });
  }

  signInOnSubmit(e) {
    e.preventDefault();

    this.props.formOnSubmit('in', this.state);
  }

  render() {
    const { username, password } = this.state;
    const { username: usernameError, password: passwordError, status: statusError } = this.props.errors;

    return (
      <ReactCSSTransitionGroup component="form" {...fadeAnimation} className="login-form" onSubmit={this.signInOnSubmit}>
        <div className="login-form__body">
          <fieldset className="form-group">
            <label className="control-label login-form__control-label">Username</label>
            <input name="username" onChange={this.inputOnChange} type="text" class="form-control" value={username}/>
            <ErrorNotifier key={usernameError} error={usernameError}/>
          </fieldset>

          <fieldset className="form-group">
            <label className="control-label login-form__control-label">Password</label>
            <input name="password" onChange={this.inputOnChange} type="password" class="form-control" value={password}/>
            <ErrorNotifier key={passwordError} error={passwordError}/>
          </fieldset>

          <ErrorNotifier key={statusError} error={statusError}/>

          <button type="submit" className="login-form__submit-btn"> Sign In &#8250; </button>

          <div className="login-form__separator">
            <span className="login-form__separator-content">or</span>
          </div>

          <div className="row">
            <div className="col-md-12">
              <a href="/auth/facebook" className="login-form__soc-auth login-form__soc-auth--facebook">
                <i className="fa fa-facebook-f login-form__soc-icon" aria-hidden="true"></i>
                facebook
              </a>
            </div>
          </div>
        </div>
      </ReactCSSTransitionGroup>
    );
  }
}

export default SignIn;