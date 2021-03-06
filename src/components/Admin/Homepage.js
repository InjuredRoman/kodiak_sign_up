import React, { Component } from 'react';

import Topbar from 'components/Admin/Topbar';
import AuthorizedWrapper from 'components/Admin/AuthorizedWrapper';
import { Switch, Route, withRouter } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import {SnackbarProvider} from 'notistack';

import routes from 'routes.js';

// function getAuthorizedWrapperFor(component) {
//   return ((
//     (props) => {
//       <AuthorizedWrapper {...props}>
//         <component />
//       </AuthorizedWrapper>
//     }
//   )
//   );
// };
const topbarRoutes = routes.filter((route) => (route.isInTopbar));
const admin_routes = (
    <Switch>
        {routes.map((route, key) => {
            if ((route.base === '/admin')) {
                return (
                    <Route
                        path={route.base + route.path}
                        name={route.name}
                        render={props => (
                            <AuthorizedWrapper {...props}>
                                <route.component />
                            </AuthorizedWrapper>
                        )}
                        key={key}
                    />
                );
            }
        })}
    </Switch>
);

class Homepage extends Component {
    // constructor(props) {
    //   super(props);
    // }
    render() {
        return (
            <Grid container justify="center" spacing={40}>
                {/* <Grid item xs={2}> */}
                    <Topbar history = {this.props.history} routes={topbarRoutes} />
                {/* </Grid> */}
                    <Grid item xs={10}>
                <SnackbarProvider>
                        {admin_routes}

                </SnackbarProvider>
                    </Grid>
            </Grid>
        );
    }
}

export default withRouter(Homepage);
