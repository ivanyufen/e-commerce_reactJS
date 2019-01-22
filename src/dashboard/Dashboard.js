import React from 'react';
import { Redirect } from 'react-router-dom';
class Dashboard extends React.Component {
    render() {
        return (
            <React.Fragment>
                {this.props.location.role == "Admin" ? <h1>You are admin</h1> : <Redirect to="/" />}
            </React.Fragment>
        )
    }
}


export default Dashboard;