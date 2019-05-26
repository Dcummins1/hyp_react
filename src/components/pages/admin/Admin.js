import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import withAuthorization from '../../util/withAuthorization';
import { db } from '../../../firebase';
import { firebase } from '../../../firebase';


class AdminPage extends Component {
    componentDidMount() {
      const { onSetUsers } = this.props;
  
      db.onceGetUsers().then(snapshot =>
        onSetUsers(snapshot.val())
      );
    }

  render() {
    const { users } = this.props;
    var myid = firebase.auth.currentUser.uid;
    return (
      <div>
        <h1>Admin</h1>
        <p>Hi {myid} </p>
        <p>The admin Page is accessible by every signed in admin user. It will allow Admins to approve Promoters and edit the Database and users</p>
        { !!users && <UserList users={users} /> }
      </div>
    );
  }
}


  const UserList = ({ users }) =>
  <div>
    <h2>List of Usernames of Users and roles</h2>
    <p>(Saved on Sign Up in Firebase Database)</p>
    {Object.keys(users).map(key =>
      <div key={key}>{users[key].username} : {users[key].role} : {key}</div>
    )}
    <p>If any Users have requested promoter permissions:  </p>
    {Object.keys(users).map(key =>
      <div key={key}>{users[key].username} : {users[key].role} : {users[key].request} </div> 
    )} 
  </div>
const mapStateToProps = (state) => ({
    users: state.userState.users,
  });

  const mapDispatchToProps = (dispatch) => ({
    onSetUsers: (users) => dispatch({ type: 'USERS_SET', users }),
  });
const authCondition = (authUser) => !!authUser;

export default compose(
    withAuthorization(authCondition),
    connect(mapStateToProps, mapDispatchToProps)
  )(AdminPage);