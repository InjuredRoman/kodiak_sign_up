import React, { Component } from 'react';
// import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
// import { Card, Button, Table } from 'react-bootstrap';
import Paper from '@material-ui/core/Paper';
import GridContainer from 'components/Grid/GridContainer.jsx';
import GridItem from 'components/Grid/GridItem.jsx';
import Card from 'components/Card/Card.jsx';
import Typography from '@material-ui/core/Typography';
import CardHeader from 'components/Card/CardHeader.jsx';
import CardBody from 'components/Card/CardBody.jsx';
import { withStyles } from '@material-ui/core/styles';
import ChartistGraph from 'react-chartist';

import { confirmed, pending } from 'dummy_data/charts.jsx';
import { fetch_all_enrollments } from '../../middleend/fetchers';

const styles = theme => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing.unit * 2,
    },
    ctLine: {
        stroke: "blue",
        /* Control the thikness of your lines */
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
});

class Dashboard extends Component {
  constructor(props) {
        super(props);
        this.state = {
            enrollments: [],
            loaded: false,
        };
    }

  async componentDidMount() {
        fetch_all_enrollments(
            response => {
                this.setState({ enrollments: response, loaded: true }, () =>
                    console.log(this.state.enrollments)
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

    filterConfirmedByDay(L) {
        if (L == null) {
            return [];
        }
        var today = new Date();
        var timeElapsedToday = (today.getHours() * 3600000) + (today.getMinutes() * 60000) + (today.getSeconds() * 1000);
        var todayString = today.toString();
        var sevenDays = L.map(
            enrollment => (Date.parse(todayString) - Date.parse(enrollment.updated_at) <= (604800000 - timeElapsedToday))
        );
        var confirmed = L.map(
            enrollment => (Date.parse(enrollment.updated_at) - Date.parse(enrollment.created_at) >= 2000)
        );
        var result = [0, 0, 0, 0, 0, 0, 0];
        L.map((e, i) => {
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
            console.log(date.getDay())
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

    shift(days, today){
      var shifted = days.slice(0);
      for(var i=0; i<today; i++){
        this.arrayRotateOne(shifted, false);
      }
      return shifted;
    }

    render() {
        var today = new Date();
        var dayOfWeek = today.getDay()
        var dateRange = this.shift(["S", "M", "T", "W", "T", "F", "S"], dayOfWeek+1)
        console.log(this.filterConfirmedByDay(this.state.enrollments))
        console.log(this.filterPendingByDay(this.state.enrollments))
        confirmed.data.series = [this.shift(this.filterConfirmedByDay(this.state.enrollments), dayOfWeek+1)]
        pending.data.series = [this.shift(this.filterPendingByDay(this.state.enrollments), dayOfWeek+1)]
        console.log(confirmed.data.series);
        console.log(pending.data.series);
        confirmed.data.labels = dateRange
        pending.data.labels = dateRange
        const { classes } = this.props;
        return (
            // <>
            <div>
                <GridContainer justify="center" className={classes.main}>
                    <GridItem xs={4}>
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
                    <GridItem xs={4}>
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
                </GridContainer>

                
            </div>
        );
    }
}
export default withStyles(styles)(Dashboard);
