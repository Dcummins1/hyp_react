import React from 'react';
import { connect } from 'react-redux';

import { firebase } from '../../firebase';

const withAuthentication = (Component) => {
  class WithAuthentication extends React.Component {
    componentDidMount() {
      const { onSetAuthUser } = this.props;

      firebase.auth.onAuthStateChanged(authUser => {
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

              this.setState({ authUser });
            });
        } else {
          this.setState({ authUser: null });
        }
      },
      );
    }

    render() {
      return (
        <Component {...this.props} />
      );
    }
  }

  const mapDispatchToProps = (dispatch) => ({
    onSetAuthUser: (authUser) => dispatch({ type: 'AUTH_USER_SET', authUser }),
  });

  return connect(null, mapDispatchToProps)(WithAuthentication);
}

export default withAuthentication;