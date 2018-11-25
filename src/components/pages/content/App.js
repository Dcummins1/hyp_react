import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import NavMenu from '../../nav/NavMenu';
import LandingPage from './Landing';
import SignUpPage from '../admin/SignUp';
import SignInPage from '../admin/SignIn';
import PasswordForgetPage from '../admin/PasswordForget';
import HomePage from './Home';
import AccountPage from '../admin/Account';
import AdminPage from '../admin/Admin';

import * as routes from '../../../constants/routes';
import withAuthentication from '../../util/withAuthentication';
import './App.css'

const App = () =>
  <Router>
    <div className="root">
      {/* <Navigation /> */}
      <header className="appHeader">
        <NavMenu></NavMenu>  
        Hyp
      </header>
      <main className="appBody">
        <Route exact path={routes.LANDING} component={LandingPage} />
        <Route exact path={routes.SIGN_UP} component={SignUpPage} />
        <Route exact path={routes.SIGN_IN} component={SignInPage} />
        <Route exact path={routes.PASSWORD_FORGET} component={PasswordForgetPage} />
        <Route exact path={routes.HOME} component={HomePage} />
        <Route exact path={routes.ACCOUNT} component={AccountPage} />
        <Route exact path={routes.ADMIN} component={AdminPage} />
      </main>
      <footer></footer>
    </div>
  </Router>

export default withAuthentication(App);