import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: theme.spacing.unit / 2,
  },
  chip: {
    margin: theme.spacing.unit / 2,
  },
});
/**
 * TODO: there must be a way in react to make this extend some kind of form value widget/ dropdown widget
 * this would help with accesibility and use in forms
 */
class SingleSelectChipsArray extends React.Component {
  render() {
    const { classes } = this.props;
    
    return (
      <div className={classes.root}>
        { this.props.data.map((chip) => {
              return (<Chip
                key={chip.name}
                clickable
                onClick={(e) => this.props.selectionListener(e, chip.name)}
                label={chip.name}
                className={classes.chip}
                color={this.props.color}
                variant={chip.name === this.props.selected ? "default" : "outlined"} 
              />);
            })
          }
      </div>
    );
  }
}

export default withStyles(styles)(SingleSelectChipsArray);