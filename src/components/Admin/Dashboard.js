import React, { Component } from 'react';
// import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
// import { Card, Button, Table } from 'react-bootstrap';
import GridContainer from 'components/Grid/GridContainer.jsx';
import GridItem from 'components/Grid/GridItem.jsx';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button'; 
import { withStyles } from '@material-ui/core/styles';

import ChartistGraph from 'react-chartist';

import { byCurrentActivity, confirmed, pending } from 'dummy_data/charts.jsx';
import { fetch_all_enrollments, fetch_all_activities, send_weekly_digest } from 'middleend/fetchers';
import {withSnackbar} from 'notistack';

const styles = theme => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing.unit * 2,
    },
    ctLine: {
        stroke: "blue",
        /* Control the thickness of your lines */
        strokeWidth: "5px",
        /* Create a dashed line with a pattern */
        strokeDasharray: "1px 2px",

    },
    main: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        // [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
        //     width: 400,
        //     marginLeft: 'auto',
        //     marginRight: 'auto',
        // },
    },
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit *
            3}px ${theme.spacing.unit * 3}px`,
    },
    header: {
        background: theme.palette.primary.main,
    },
    control: {
        padding: theme.spacing.unit * 2,
    },
    button: {
      margin: theme.spacing.unit,
    },
});

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            enrollments: [],
            loaded: false,
        };
        this.sendEmails = this.sendEmails.bind(this);
        this.successSnackbar = this.successSnackbar.bind(this);
        this.failSnackbar = this.failSnackbar.bind(this);
    }

    async componentDidMount() {
        fetch_all_enrollments(
            response => {
                this.setState({ enrollments: response, loaded: true })
            },
            error => {
                console.log("hihihiihihihihihihi")
                this.setState({

                    loaded: false,
                    placeholder: 'Something went wrong.',
                });
            }
        );
        fetch_all_activities(
            response => {
                this.setState({ activities: response, loaded: true }, () =>
                    console.log(this.state.activities)
                );
            },
            error => {
                this.setState({
                    loaded: false,
                    placeholder: 'Something went wrong.',
                });
            }
        );
    }

    successSnackbar() {
        this.props.enqueueSnackbar(
                'Successfully sent emails to all parents in system.',
                { variant: 'success' }
        );
    }

    failSnackbar() {
        this.props.enqueueSnackbar(
                'Something went wrong. Failed to send weekly digest to all parents.',
                { variant: 'error' }
        );
    }
    sendEmails() {
        send_weekly_digest(
            response => {
                this.setstate({emailsSent: true, emailSuccess: true}, this.successSnackbar());
            },
            error => {
                this.setstate({emailsSent: true, emailSuccess: false}, this.failSnackbar());
            }
        )
    }
    /*
    filterLastSevenDays(L) {
        if (L == null) {
            return [];
        }
        var today = new Date()
        var timeElapsedToday = (today.getHours() * 3600000) + (today.getMinutes() * 60000) + (today.getSeconds() * 1000)
        var todayString = today.toString()
        var sevenDays = L.map(
            enrollment => (Date.parse(todayString) - Date.parse(enrollment.updated_at) <= (604800000 - timeElapsedToday))
        );
        var result = [0, 0, 0, 0, 0, 0, 0]
        L.map((e, i) => {
          if(confirmed[i] === true) {
            var date = new Date(Date.parse(e.updated_at))
            result[date.getDay()] += 1;
          }
        });
        return result;
    }
    */

    // Returns a dictionary with keys as current activities and values as the number of enrollments per activity 
    currentActivityEnrollments(enrollments, activities){
      var result = {}
      if(enrollments == null || activities == null) {
            return result;
        }
      var today = new Date();
      var todayString = today.toString();
      var currentActivities = activities.filter(
        activity => (Date.parse(todayString) >= Date.parse(activity.start_date) && Date.parse(todayString) <= Date.parse(activity.end_date))
        );
      for(var i = 0; i < currentActivities.length; i++){
        result[currentActivities[i].title] = 0
      }
      for(var i = 0; i < enrollments.length; i++){
        if(enrollments[i].activity in currentActivities){
          result[enrollments[i].activity.title] = result[enrollments[i].activity.title]++;
        }
      }
      return result
    }

    filterConfirmedByDay(enrollments) {
        if (enrollments == null) {
            return [];
        }
        var today = new Date();
        var timeElapsedToday = (today.getHours() * 3600000) + (today.getMinutes() * 60000) + (today.getSeconds() * 1000);
        var todayString = today.toString();
        var sevenDays = enrollments.map(
            enrollment => (Date.parse(todayString) - Date.parse(enrollment.updated_at) <= (604800000 - timeElapsedToday))
        );
        var confirmed = enrollments.map(
            enrollment => (Date.parse(enrollment.updated_at) - Date.parse(enrollment.created_at) >= 2000)
        );
        var result = [0, 0, 0, 0, 0, 0, 0];
        enrollments.map((e, i) => {
          if(confirmed[i] === true && sevenDays[i] == true) {
            var date = new Date(Date.parse(e.updated_at));
            result[date.getDay()] += 1;
          };
        });
        return result;
    }

    filterPendingByDay(L) {
        if (L == null) {
            return [];
        }
        var today = new Date();
        var timeElapsedToday = (today.getHours() * 3600000) + (today.getMinutes() * 60000) + (today.getSeconds() * 1000);
        var todayString = today.toString();
        var sevenDays = L.map(
            enrollment => (Date.parse(todayString) - Date.parse(enrollment.created_at) <= (604800000 - timeElapsedToday))
        );
        var pending = L.map(
            enrollment => (Date.parse(enrollment.updated_at) - Date.parse(enrollment.created_at) < 2000)
        );
        var result = [0, 0, 0, 0, 0, 0, 0];
        L.map((e, i) => {
          if(pending[i] === true & sevenDays[i] == true) {
            var date = new Date(Date.parse(e.updated_at));
            result[date.getDay()] += 1;
          };
        });
        return result;
    }

    /*
    filterPendingByDay(L) {
        if (L == null) {
            return [];
        }
        var pending = L.map(
            enrollment => (Date.parse(enrollment.updated_at) - Date.parse(enrollment.created_at) < 2000)
        );
        var result = [0, 0, 0, 0, 0, 0, 0]
        L.map((e, i) => {
          if(pending[i] === true) {
            var date = new Date(Date.parse(e.updated_at))
            result[date.getDay()] += 1;
          }
        });
        return result;
    }
    */

    // Helper function for displaying the correct day of the week on the graph
    arrayRotateOne(arr, reverse) {
      if (reverse) arr.unshift(arr.pop());
      else arr.push(arr.shift());
      return arr;
    }

    // Helper function for displaying the correct day of the week on the graph
    shift(days, today){
      var shifted = days.slice(0);
      for(var i=0; i<today; i++){
        this.arrayRotateOne(shifted, false);
      }
      return shifted;
    }

    render() {
        var today = new Date();
        var dayOfWeek = today.getDay();
        var dateRange = this.shift(["S", "M", "T", "W", "T", "F", "S"], dayOfWeek+1);
        var currActivities = this.currentActivityEnrollments(this.state.enrollments, this.state.activities)
        console.log(this.filterConfirmedByDay(this.state.enrollments));
        console.log(this.filterPendingByDay(this.state.enrollments));
        confirmed.data.series = [this.shift(this.filterConfirmedByDay(this.state.enrollments), dayOfWeek+1)];
        pending.data.series = [this.shift(this.filterPendingByDay(this.state.enrollments), dayOfWeek+1)];
        byCurrentActivity.data.series = [Object.values(currActivities)];
        confirmed.data.labels = dateRange
        pending.data.labels = dateRange
        confirmed.options.high = Math.max(...confirmed.data.series[0]) + 10
        pending.options.high = Math.max(...pending.data.series[0]) + 10
        byCurrentActivity.options.high = Math.max(...byCurrentActivity.data.series[0]) + 10
        byCurrentActivity.data.labels = Object.keys(currActivities);
        const { classes } = this.props;
        return (
            // <>
            <div>
                <GridContainer justify="center" className={classes.main} spacing={40}>
                    <GridItem xs={6}>
                        <Paper className={classes.paper}>
                                <Typography variant="h4" gutterBottom>
                                    Confirmed Enrollments
                                </Typography>
                                <ChartistGraph
                                    className="ct-chart"
                                    data={confirmed.data}
                                    type="Line"
                                    options={confirmed.options}
                                    listener={confirmed.animation}
                                />
                        </Paper>
                    </GridItem>
                    <GridItem xs={6}>
                        <Paper className={classes.paper}>
                                <Typography variant="h4" gutterBottom>
                                    Pending Enrollments
                                </Typography>
                                <ChartistGraph
                                    className="ct-chart"
                                    data={pending.data}
                                    type="Line"
                                    options={pending.options}
                                    listener={pending.animation}
                                />
                        </Paper>
                    </GridItem>
                    <GridItem xs={4}>
                        <Paper className={classes.paper}>
                                <Typography variant="h4" gutterBottom>
                                    Enrollments by Current Activities
                                </Typography>
                                <ChartistGraph
                                    className="ct-chart"
                                    data={byCurrentActivity.data}
                                    type="Line"
                                    options={byCurrentActivity.options}
                                    listener={byCurrentActivity.animation}
                                />
                        </Paper>
                    </GridItem>
                    <GridItem xs={6}>
                        <Button fullWidth onClick={this.sendEmails} variant="contained" color="secondary" className={classes.button}>
                            Send Weekly Digest
                        </Button>
                    </GridItem>
                </GridContainer>

                
            </div>
        );
    }
}
const SnackDashboard = withStyles(styles)(withSnackbar(Dashboard));
export default SnackDashboard;
// function SnackifiedEnrollmentUpdate(props) {
//     return (
//         <SnackbarProvider maxSnack={5}>
//             <Dashboard />
//         </SnackbarProvider>
//     );
// }
