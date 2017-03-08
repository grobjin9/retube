import React from 'react';
import { connect } from 'react-redux';

function requireAuthWrapper(ComposedComponent) {
  class ProtectedComponent extends React.Component {

    static propTypes = {
      isAuthenticated: React.PropTypes.bool.isRequired
    };

    constructor(props) {
      super(props);
    }

    render() {
      const { isAuthenticated } = this.props;

      return (
        isAuthenticated && <ComposedComponent />
      );
    }
  }

  const mapStateToProps = ({ auth: { isAuthenticated} }) => ({ isAuthenticated });

  return connect(mapStateToProps)(ProtectedComponent);
}

export default requireAuthWrapper;