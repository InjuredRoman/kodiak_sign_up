import React from 'react';


export default class AuthorizedWrapper extends React.Component {
    getNoAccessPage() {
        return (
            <div>
                <h1>Unauthorized</h1>
                <p>No access here !</p>
            </div>
        );
    }
    render() {
        var render_val = this.getNoAccessPage(); 
        return (
            <div>
            {(sessionStorage.getItem("status")==="authorized" ? this.props.children : render_val)}

            </div>
        );
    }
}