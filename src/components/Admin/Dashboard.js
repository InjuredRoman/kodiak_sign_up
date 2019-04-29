import React, { Component } from 'react';

import Topbar from 'components/Admin/Topbar';
import AuthorizedWrapper from 'components/Admin/AuthorizedWrapper';
import { Switch, Route } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';

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

class Dashboard extends Component {
    // constructor(props) {
    //   super(props);
    // }
    render() {
        return (
            <Grid container justify="center" spacing={40}>
                <Grid item xs={2}>
                    <Topbar routes={topbarRoutes} />
                </Grid>
                <Grid item xs={10}>
                    {admin_routes}
                </Grid>
            </Grid>
        );
    }
}

export default Dashboard;
