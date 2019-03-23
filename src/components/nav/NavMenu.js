import React from 'react';
import Button from '@material-ui/core/Button';
import Fade from '@material-ui/core/Fade';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ClearIcon from '@material-ui/icons/Clear';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import SearchIcon from '@material-ui/icons/Search';
import MenuIcon from '@material-ui/icons/Menu';
import * as routes from '../../constants/routes';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { auth } from '../../firebase';
import './NavMenu.css'


const NoAuth = (props) => 
    [<MenuItem className="menuItem" key="search"
    onClick={ (e) => props.handleMenuSelection(e, routes.LANDING)}>
      <ListItemIcon className="icon">
        <SearchIcon />
      </ListItemIcon>
      <ListItemText inset primary="Search" />
    </MenuItem>,
    <MenuItem className="menuItem" key="signin"
    onClick={ (e) => props.handleMenuSelection(e, routes.ACCOUNT)}>
      <ListItemIcon className="icon">
        <AccountBoxIcon />
      </ListItemIcon>
      <ListItemText inset primary="Sign in" />
    </MenuItem>]

const StandardAuth = (props) => 
    [<MenuItem className="menuItem" key="search"
    onClick={ (e) => props.handleMenuSelection(e, routes.LANDING)}>
      <ListItemIcon className="icon">
        <SearchIcon />
      </ListItemIcon>
      <ListItemText inset primary="Search" />
    </MenuItem>,
    <MenuItem className="menuItem" key="account"
    onClick={ (e) => props.handleMenuSelection(e, routes.ACCOUNT)}>
      <ListItemIcon className="icon">
        <AccountBoxIcon />
      </ListItemIcon>
      <ListItemText inset primary="Account" />
    </MenuItem>,
    <MenuItem className="menuItem" key="newEvent"
    onClick={ (e) => props.handleMenuSelection(e, routes.EVENT_FORM)}>
      <ListItemIcon className="icon">
        <AccountBoxIcon />
      </ListItemIcon>
      <ListItemText inset primary="Create New Event" />
    </MenuItem>,
    <MenuItem className="menuItem" onClick={auth.doSignOut} key="signout">
      <ListItemIcon className="icon">
        <ClearIcon />
      </ListItemIcon>
      <ListItemText inset primary="Sign Out" />
    </MenuItem>]

class NavMenu extends React.Component {
  state = {
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleMenuSelection = (event, route) => {
    this.props.history.push(route);
  };

  signOut = () => {
    console.log("sign out");
  }

  
  render() {
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    return (
      <div>
        <Button 
        className="navigationButton"
        aria-owns={open ? 'fade-menu' : undefined}
        aria-haspopup="true"
        onClick={this.handleClick}
        title="Open Navigation Menu">
          <MenuIcon/>
        </Button>
        <Menu
        id="fade-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={this.handleClose}
        TransitionComponent={Fade}>
          { this.props.authUser
            ? <StandardAuth handleMenuSelection={this.handleMenuSelection}/>
            : <NoAuth handleMenuSelection={this.handleMenuSelection}/>
          }
        </Menu> 
      </div>
    );
  }

}
const mapStateToProps = (state) => ({
  authUser: state.sessionState.authUser,
});

export default connect(mapStateToProps)(withRouter(NavMenu))
