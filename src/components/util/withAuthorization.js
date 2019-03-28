import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';

import { firebase } from '../../firebase';
import * as routes from '../../constants/routes';

const withAuthorization = (condition) => (Component) => {
  class WithAuthorization extends React.Component {
    componentDidMount() {
      firebase.auth.onAuthStateChanged(authUser => {
        const { onSetAuthUser } = this.props;
        
        if (authUser) {
          onSetAuthUser.firebase
            .user(authUser.uid)
            .once('value')
            .then(snapshot => {
              const dbUser = snapshot.val();

              // default empty roles
              if (!dbUser.roles) {
                dbUser.roles = [];
              }

              // merge auth and db user
              authUser = {
                uid: authUser.uid,
                email: authUser.email,
                ...dbUser,
              };
              if (!condition(authUser)) {
                this.props.history.push(routes.SIGN_IN);
              }
            });
        } else {
          this.props.history.push(routes.SIGN_IN);
        }
      });
    }

    render() {
      return this.props.authUser ? <Component {...this.props} /> : null;
    }
  }

  const mapStateToProps = (state) => ({
    authUser: state.sessionState.authUser,
  });

  return compose(
    withRouter,
    connect(mapStateToProps),
  )(WithAuthorization);
}

export default withAuthorization;