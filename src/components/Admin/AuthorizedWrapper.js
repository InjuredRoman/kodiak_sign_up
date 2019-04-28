import React from 'react';

import Login from 'components/Admin/Login';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';

import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
export default class AuthorizedWrapper extends React.Component {
    getNoAccessPage() {
        return (
            <Grid container justify="center">
                <Card>
                    <CardContent>
                        Unfortunately you don't have access to this. Try logging
                        in below!
                    </CardContent>
                    <CardActions>
                        <Fab>
                            <Link
                                color="#33eb91"
                                component={RouterLink}
                                to="/login"
                            >
                                Login!
                            </Link>
                        </Fab>
                    </CardActions>
                </Card>
            </Grid>
        );
    }
    render() {
        var render_val = this.getNoAccessPage();
        return (
            <div>
                {sessionStorage.getItem('status') === 'authorized'
                    ? this.props.children
                    : render_val}
            </div>
        );
    }
}
