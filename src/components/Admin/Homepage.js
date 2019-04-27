import React, { Component } from 'react';
import './Homepage.css';
// import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
// import { Card, Button, Table } from 'react-bootstrap';
import Grid from '@material-ui/core/Grid';
import Card from 'components/Card/Card.jsx';
import CardHeader from 'components/Card/CardHeader.jsx';
import CardBody from 'components/Card/CardBody.jsx';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  header: {
    background: theme.palette.secondary.light,
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
    render() {
        const {classes} = this.props;
        return (
            // <>
            <div>
              <Grid justify="center" className={classes.root} container>
                <Grid item xs={12}>
                <Card>
                    <CardHeader className={classes.header}>
                        <h4>Welcome!</h4>
                        <p>great info</p>
                    </CardHeader>
                    <CardBody>
                      Juicy info here
                    </CardBody>
                </Card>
                </Grid>
              
              </Grid>
                {/* //     <div className="infoCards"> */}
                {/* //         <div className="card1"> */}
                {/* //             <Card 
            //                 bg="primary"
            //                 text="white"
            //                 style={{ width: '18rem' }}
            //             >
            //                 <Card.Header>Header</Card.Header>
            //                 <Card.Body>
            //                     <Card.Title>Primary Card Title</Card.Title>
            //                     <Card.Text>
            //                         Some quick example text to build on the card
            //                         title and make up the bulk of the card's
            //                         content.
            //                     </Card.Text>
            //                 </Card.Body>
            //             </Card>
            //         </div>

            //         <div className="card2">
            //             <Card
            //                 bg="secondary"
            //                 text="white"
            //                 style={{ width: '18rem' }}
            //             >
            //                 <Card.Header>Header</Card.Header>
            //                 <Card.Body>
            //                     <Card.Title>Secondary Card Title</Card.Title>
            //                     <Card.Text>
            //                         Some quick example text to build on the card
            //                         title and make up the bulk of the card's
            //                         content.
            //                     </Card.Text>
            //                 </Card.Body>
            //             </Card>
            //         </div>

            //         <div className="card3">
            //             <Card
            //                 bg="success"
            //                 text="white"
            //                 style={{ width: '18rem' }}
            //             >
            //                 <Card.Header>Header</Card.Header>
            //                 <Card.Body>
            //                     <Card.Title>Success Card Title</Card.Title>
            //                     <Card.Text>
            //                         Some quick example text to build on the card
            //                         title and make up the bulk of the card's
            //                         content.
            //                     </Card.Text>
            //                 </Card.Body>
            //             </Card>
            //         </div>

            //         <div className="card4">
            //             <Card
            //                 bg="danger"
            //                 text="white"
            //                 style={{ width: '18rem' }}
            //             >
            //                 <Card.Header>Header</Card.Header>
            //                 <Card.Body>
            //                     <Card.Title>Danger Card Title</Card.Title>
            //                     <Card.Text>
            //                         Some quick example text to build on the card
            //                         title and make up the bulk of the card's
            //                         content.
            //                     </Card.Text>
            //                 </Card.Body>
            //             </Card>
            //         </div>

            //         <div className="card5">
            //             <Card
            //                 bg="warning"
            //                 text="white"
            //                 style={{ width: '18rem' }}
            //             >
            //                 <Card.Header>Header</Card.Header>
            //                 <Card.Body>
            //                     <Card.Title>Warning Card Title</Card.Title>
            //                     <Card.Text>
            //                         Some quick example text to build on the card
            //                         title and make up the bulk of the card's
            //                         content.
            //                     </Card.Text>
            //                 </Card.Body>
            //             </Card>
            //         </div>
         <div class = 'table1'>
        <Table responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Table heading</th>
              <th>Table heading</th>
              <th>Table heading</th>
              <th>Table heading</th>
              <th>Table heading</th>
              <th>Table heading</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
            </tr>
            <tr>
              <td>3</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
            </tr>
          </tbody>
        </Table>;
        </div>
        */}
            </div>
        );
    }
}
export default withStyles(styles)(Homepage);