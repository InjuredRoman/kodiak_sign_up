
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {withRouter} from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    main: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit *
            3}px ${theme.spacing.unit * 3}px`,
    },
    button: {
      margin: theme.spacing.unit,
      backgroundColor: theme.palette.secondary.main,
    },
})


class NoMatch extends React.Component {
    constructor(props) {
        super(props);
        this.handleAdminClick = this.handleAdminClick.bind(this);
        this.handleParentClick = this.handleParentClick.bind(this);
    }

    handleAdminClick() {
        this.props.history.push('/login')
    }
    handleParentClick() {
        this.props.history.push('/signup')
    }
    render() {
        const {classes} = this.props;
        const parentButton = 
            <Button className={classes.button} onClick={this.handleParentClick} fullWidth variant="contained">
                Parent?
            </Button>
        const adminButton = 
            <Button className={classes.button} onClick={this.handleAdminClick} variant="contained" fullWidth>
                Admin?
            </Button>
        return (
            <div className={classes.main}>
                <Paper className={classes.paper}>
                    {parentButton}
                    {adminButton}
                </Paper>
            </div>
        );
    }
}

export default withRouter(withStyles(styles)(NoMatch));