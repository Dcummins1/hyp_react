import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';

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

class MultiSelectChipsArray extends React.Component {
  render() {
    const { classes } = this.props;
    
    return (
      <div className={classes.root}>
        { this.props.data.map((chip) => {
              return (<Chip
                key={chip.name}
                clickable
                onClick={(e) => this.props.selectionListener(e, chip)}
                label={chip.name}
                className={classes.chip}
                color={this.props.color}
                variant={chip.selected ? "default" : "outlined"}
                onDelete={e => this.props.selectionListener(e, chip)}
                deleteIcon={chip.selected ? <DoneIcon/> : <ClearIcon/>}
              />);
            })
          }
      </div>
    );
  }
}

export default withStyles(styles)(MultiSelectChipsArray);