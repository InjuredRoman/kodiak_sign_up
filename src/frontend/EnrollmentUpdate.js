import React from 'react';
import {update_enrollment, destroy_enrollment} from '../middleend/fetchers.js';
import {Modal, Header, Icon} from 'semantic-ui-react';



export default class EnrollmentUpdate extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            successful: '',
            response: '',
            loaded: false,
        }
        this.inlineStyle = {
            modal : {
            //   display: 'inline-block !important',
            //   marginLeft: 'auto',
            //   marginRight: 'auto'
            }
          };
    }
    componentDidMount() {
        const e_id = this.props.match.params.enrollment_id; // match enrollment_id from 
        if (this.props.update_type === 'confirm'){
            //update enrollment, to confirm
            update_enrollment(
                e_id,
                response => { this.setState({successful: true, response: response, loaded:true }, () => console.log(this.state)); },
                error    => { this.setState({successful: false, response: error, loaded:true }); },
            );
        } else if (this.props.update_type === 'cancel') {
            //update enrollment, to destroy
            destroy_enrollment(
                e_id,
                response => { this.setState({successful: true, response: response, loaded:true }, () => console.log(this.state)); },
                error    => { this.setState({successful: false, response: error, loaded:true }); },
            );
        }
    }

    getConfirmationModal() {
        return (
            <Modal open={true} size='small' style={this.inlineStyle.modal}>
                {this.state.successful ?<Header>Successfully Confirmed!</Header> : <Header>Something's Wrong</Header> }
                <Modal.Content>
                <Modal.Description>
                    {this.state.successful ?<p>{this.state.response.child.first_name} is now enrolled in {this.state.response.activity.title}!</p> : <p>We're not sure what!</p> }
                    
                    {/* <p>We've found the following gravatar image associated with your e-mail address.</p>
                    <p>Is it okay to use this photo?</p> */}
                </Modal.Description>
                </Modal.Content>
            </Modal>
            // <h1>yo you're confirmed, straight up</h1>

        );
    }
    getCancellationModal() {
        return (
            <Modal open={true} size='small' style={this.inlineStyle.modal}>
                <Modal.Header>Select a Photo</Modal.Header>
                <Modal.Content image>
                <Modal.Description>
                    <Header>Successfully Deleted!</Header>
                    <p>We've found the following gravatar image associated with your e-mail address.</p>
                    <p>Is it okay to use this photo?</p>
                </Modal.Description>
                </Modal.Content>
            </Modal>
            // <h1>yo you're cancelled, straight up</h1>

        );
    }

    render() {
        var render_val;
        if (this.props.update_type === 'confirm') {
            render_val = this.getConfirmationModal();
            // console.log(render_val);
        } else if (this.props.update_type === 'cancel') {
            render_val = this.getCancellationModal();
        }
        return (
            <div>
            {render_val}
            </div>

        );
    }
};