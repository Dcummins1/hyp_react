import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import { withRouter } from 'react-router-dom';
import * as routes from '../../constants/routes';
import { db } from "../../firebase/"

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "column"
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2
  },
  button: {
      flex: 1
  }
});

class DiscoveryForm extends React.Component {
  state = {
    activity: "",
    activities: null,
    location: "",
    locations: null,
    date: "",
    conditionalInputs: []
  };

  constructor (props) {
      super(props);
      db.getActivities().then(function (activities) {
        this.setState({"activities": activities})
      }.bind(this));
      this._handleSubmit = this._handleSubmit.bind(this);
  }

  _handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  getMenuItems (data) {
    if (data) {
        const items = [];
        for (const a in data) {
            items.push(<MenuItem key={a} value={a}>{data[a].name}</MenuItem>);
        }
        return items;
    }
    return [];
  }

  _handleSubmit (e) {
    let queryString = "?";
    if (this.state.activity) {
        queryString += "act=" + this.state.activity + "&";
    }
    if (this.state.location) {
        queryString += "loc=" + this.state.location + "&";
    }
    if (this.state.date) {
        queryString += "t=" + this.state.date + "&";
    }
    this.props.history.push(routes.SEARCH + queryString);
  }

  render() {
    const { classes } = this.props;
    return (
        <form className={classes.root} autoComplete="off" onSubmit={this._handleSubmit}>
            <FormControl className={classes.formControl}>
            <InputLabel htmlFor="activity-selection">I want to</InputLabel>
            <Select
                value={this.state.activity}
                onChange={this._handleChange}
                inputProps={{
                name: "activity",
                id: "activity-selection"
                }}>
                <MenuItem value="">
                <em>Do nothing</em>
                </MenuItem>
                { this.getMenuItems(this.state.activities) }
            </Select>
        </FormControl>
        {this.state.activity ?
        <FormControl className={classes.formControl}>
            <InputLabel htmlFor="location-selection">in{/*this.state.activities[this.state.activity].nextLabel*/}</InputLabel>
            <Select
                value={this.state.location}
                onChange={this._handleChange}
                inputProps={{
                name: "location",
                id: "location-selection"
                }}>
                <MenuItem value="">
                <em>Nowhere</em>
                </MenuItem>
                <MenuItem value="DUB">
                    Dublin
                </MenuItem>
            </Select>
            </FormControl> : ""}
            {this.state.location && this.state.activity ? 
            <FormControl className={classes.formControl}>
            <InputLabel htmlFor="date-selection">When?{/*this.state.activities[this.state.activity].nextLabel*/}</InputLabel>
            <Select
                value={this.state.date}
                onChange={this._handleChange}
                inputProps={{
                name: "date",
                id: "date-selection"
                }}>
                
                <MenuItem value="">
                <em>Never</em>
                </MenuItem>
                <MenuItem value="Now">
                    Now
                </MenuItem>
                <MenuItem value="Today">
                    Today
                </MenuItem>
                <MenuItem value="Tomorrow">
                    Tomorrow
                </MenuItem>
                <MenuItem value="Weekend">
                    Next Weekend
                </MenuItem>
                <MenuItem value="Date">
                    Pick Date
                </MenuItem>
            </Select>
            </FormControl> : ""}
            <input type="submit" value="Lets Go!" />
        </form>
        );
  }
}

DiscoveryForm.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(withRouter(DiscoveryForm));
