import React, { Component } from 'react';
import './Homepage.css';
// import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
// import { Card, Button, Table } from 'react-bootstrap';
import Grid from '@material-ui/core/Grid';
import Card from 'components/Card/Card.jsx';
import Typography from '@material-ui/core/Typography';
import CardHeader from 'components/Card/CardHeader.jsx';
import CardBody from 'components/Card/CardBody.jsx';
import { withStyles } from '@material-ui/core/styles';
import ChartistGraph from 'react-chartist';

import { dailySalesChart } from 'dummy_data/charts.jsx';
import { fetch_all_enrollments } from '../../middleend/fetchers';

const styles = theme => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing.unit * 2,
    },
    header: {
        background: theme.palette.primary.main,
    },
    paper: {
        height: 140,
        width: 100,
    },
    control: {
        padding: theme.spacing.unit * 2,
    },
});

class Homepage extends Component {
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

    filterConfirmedByDay(L) {
        if (L == null) {
            return [];
        }
        var confirmed = L.map(
            enrollment => (Date.parse(enrollment.updated_at) - Date.parse(enrollment.created_at) >= 2000)
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
    render() {
        dailySalesChart.data.series = [this.filterConfirmedByDay(this.state.enrollments)]
        const { classes } = this.props;
        return (
            // <>
            <div>
                <Grid justify="center" className={classes.root} container>
                    <Grid item xs={4}>
                        <Card>
                            <CardHeader className={classes.header}>
                                <Typography variant="h5" gutterBottom>
                                    Confirmed Enrollments
                                </Typography>
                            </CardHeader>
                            <CardBody>
                                <ChartistGraph
                                    className="ct-chart"
                                    data={dailySalesChart.data}
                                    type="Line"
                                    options={dailySalesChart.options}
                                    listener={dailySalesChart.animation}
                                />
                            </CardBody>
                        </Card>
                    </Grid>
                </Grid>
            </div>
        );
    }
}
export default withStyles(styles)(Homepage);
