import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: theme.spacing.unit / 2,
  },
  chip: {
    margin: theme.spacing.unit / 2,
  },
  button: {
    position: "fixed",
    bottom: 0,
    left: "0",
    width: "100%",
    border: "1px solid"
  }
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
          <Button className={classes.button}>
            Lets Go!
          </Button>
      </div>
    );
  }
}

export default withStyles(styles)(MultiSelectChipsArray);