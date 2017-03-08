import React from 'react';
import ErrorNotifier from './ErrorNotifier';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { fadeAnimation } from '../../utils/animationSettings';

class SignUp extends React.Component {

  static propTypes = {
    formOnSubmit: React.PropTypes.func.isRequired,
    errors: React.PropTypes.object
  };

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      passwordConfirmation: '',
      showPassword: false
    };

    this.inputOnChange = this.inputOnChange.bind(this);
    this.signUpOnSubmit = this.signUpOnSubmit.bind(this);
    this.showPassword = this.showPassword.bind(this);
  }

  inputOnChange(e) {
    const {name, value} = e.target;

    this.setState({
      [name]: value
    });
  }

  signUpOnSubmit(e) {
    e.preventDefault();

    const { username, password, passwordConfirmation } = this.state;

    this.props.formOnSubmit('up', {username, password, passwordConfirmation});
  }

  showPassword() {
    this.setState({
      showPassword: !this.state.showPassword
    });
  }

  render() {
    const { username, password, passwordConfirmation } = this.state;
    const {
      username: usernameError,
      password: passwordError,
      passwordConfirmation: passwordConfirmationError,
      status: statusError
    } = this.props.errors;

    return (
      <ReactCSSTransitionGroup component="form" {...fadeAnimation} className="login-form" onSubmit={this.signUpOnSubmit}>
        <div className="login-form__body">

          <div className="form-group">
            <label className="control-label">Username</label>
            <input name="username" onChange={this.inputOnChange} type="text" className="form-control" value={username}/>
            <ErrorNotifier key={usernameError} error={usernameError}/>
          </div>

          <div className="form-group">
            <label className="control-label">Password</label>
            <div className="login-form__password-container">
              { password && <span
                onClick={this.showPassword}
                className="login-form__password-show-btn"
              >
                { this.state.showPassword ? 'hide' : 'show' }
              </span> }
              <input
                name="password"
                onChange={this.inputOnChange}
                type={this.state.showPassword ? "text" : "password"}
                className="form-control login-form__password"
                value={password}
              />
            </div>
            <ErrorNotifier key={passwordError} error={passwordError}/>
          </div>

          <div className="form-group">
            <label className="control-label">Confirm Password</label>
            <input
              name="passwordConfirmation"
              onChange={this.inputOnChange}
              type={this.state.showPassword ? "text" : "password"}
              className="form-control login-form__password"
              value={passwordConfirmation}
            />
            <ErrorNotifier key={passwordConfirmationError} error={passwordConfirmationError}/>
          </div>

          <ErrorNotifier key={statusError} error={statusError}/>

          <button type="submit" className="login-form__submit-btn"> Sign Up &#8250; </button>

        </div>
      </ReactCSSTransitionGroup>
    );

  }
}

export default SignUp;