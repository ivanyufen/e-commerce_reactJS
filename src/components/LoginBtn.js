import React from 'react';

class LoginBtn extends React.Component {
    render() {
        return (
            <React.Fragment>
                <a href="" type="button" className="btn btn-light"><i className="fas fa-shopping-cart fa-sm m-1"></i>Your cart (<span>{this.props.cart}</span>)</a>
            </React.Fragment>
        )
    }
}

export default LoginBtn;