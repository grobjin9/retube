import React from 'react';
import { connect } from 'react-redux';
import Spinner from 'react-spinkit';

import SignUp from '../components/loginForm/SignUp';
import SignIn from '../components/loginForm/SignIn';
import Tab from '../components/loginForm/Tab';

import { userSignupRequest, userSigninRequest, userAuthCheckRequest, authenticateUser } from '../actions/authActions';
import { updateUser } from '../actions/userActions';
import { reroute } from '../actions/routingActions';

class LoginForm extends React.Component {

  static propTypes = {
    userSignupRequest: React.PropTypes.func.isRequired,
    userSigninRequest: React.PropTypes.func.isRequired,
    userAuthCheckRequest: React.PropTypes.func.isRequired,
    updateUser: React.PropTypes.func.isRequired,
    authenticateUser: React.PropTypes.func.isRequired,
    reroute: React.PropTypes.func.isRequired
  };

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      activeTab: 'in',
      errors: {},
      isLoading: false
    };

    this.onTabChange = this.onTabChange.bind(this);
    this.formOnSubmit = this.formOnSubmit.bind(this);
  }

  onTabChange(e) {
    const tabName = e.target.value;

    if (tabName === this.state.activeTab) return;

    this.setState({
      activeTab: tabName,
      errors: {}
    });
  }

  formOnSubmit(formType, userData) {
    const { userSigninRequest, userSignupRequest, userAuthCheckRequest, reroute, authenticateUser, updateUser } = this.props;

    const onSigninSuccess = () => {

      this.setState({
        isLoading: false,
        errors: {}
      });

      userAuthCheckRequest()
        .then(user => {
          updateUser(user.data);
          authenticateUser();
          reroute('push', '/');
        })
        .catch(() => {
          reroute('push', '/login');
        });
    };

    const onSigninError = (error) => {
      if (error.response) {
        this.setState({
          isLoading: false,
          errors: error.response.data
        });
      }

      return error;
    };

    this.setState({
      isLoading: true
    });

    setTimeout(() => {
      if (formType === 'up') {
        return userSignupRequest(userData)
          .then(onSigninSuccess)
          .catch(onSigninError)
      } else if (formType === 'in') {
        return userSigninRequest(userData)
          .then(onSigninSuccess)
          .catch(onSigninError);
      }
    }, 500);
  }

  render() {
    const { activeTab, isLoading } = this.state;
    const ActiveTabContent = activeTab === 'up' ? SignUp : SignIn;

    const Loader = (
      <div className="login-form__cover">
        <Spinner overrideSpinnerClassName="spinner" spinnerName='circle' noFadeIn/>
      </div>
    );

    return (
      <div className="col-md-4 col-md-offset-4 login-form__container">
        { isLoading && Loader }

        <div className="login-form__tabs">
          <Tab tabName="in" activeTab={this.state.activeTab} onTabChange={this.onTabChange}/>
          <span className="login-form__slash">/</span>
          <Tab tabName="up" activeTab={this.state.activeTab} onTabChange={this.onTabChange}/>
        </div>

        <ActiveTabContent errors={this.state.errors} formOnSubmit={this.formOnSubmit} key={activeTab}/>
      </div>
    );
  }
}

export default connect(null, {
  userSignupRequest,
  userSigninRequest,
  userAuthCheckRequest,
  authenticateUser,
  updateUser,
  reroute
})(LoginForm);


