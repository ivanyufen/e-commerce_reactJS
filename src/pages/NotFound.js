import React from 'react';
import { Link } from 'react-router-dom';

class NotFound extends React.Component {
    render() {
        return (
            <React.Fragment>
                <div className="container text-center" style={{ marginTop: "10%", marginBottom: "15%" }}>
                    <h1>404 NOT FOUND</h1>
                    <h2>Sorry the page you are looking doesn't exist! :( </h2>
                    <p>Click <Link to="/">here</Link> to go back to home</p>
                </div>

            </React.Fragment>
        )
    }
}

export default NotFound;