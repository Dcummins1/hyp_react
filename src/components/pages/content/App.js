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
import SearchResultsPage from './Search'
import AccountPage from '../admin/Account';
import AdminPage from '../admin/Admin';
import EventFormPage from '../content/eventForm/EventFormBasic';
import EventFormTagsPage from '../content/eventForm/EventFormTags';
import EventFormImagePage from '../content/eventForm/EventFormImage';
import EventFormPreviewPage from './eventForm/EventFormPreview';

import * as routes from '../../../constants/routes';
import withAuthentication from '../../util/withAuthentication';
import './App.css'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

// const TransactionList = ({transactions}) => {
//   return (
//     <MuiThemeProvider>
//       <Table>
// ...
//       </Table>
//     </MuiThemeProvider>
//   );
// };

const App = () =>
<MuiThemeProvider>
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
        <Route exact path={routes.SEARCH} component={SearchResultsPage} />
        <Route exact path={routes.EVENT_FORM} component={EventFormPage} />
        <Route exact path={routes.EVENT_FORM_TAGS} component={EventFormTagsPage} />
        <Route exact path={routes.EVENT_FORM_IMAGE} component={EventFormImagePage} />
        <Route exact path={routes.EVENT_FORM_PREVIEW} component={EventFormPreviewPage} />
      </main>
      <footer></footer>
    </div>
  </Router>
  </MuiThemeProvider>

export default withAuthentication(App);