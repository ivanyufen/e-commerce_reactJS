import React from 'react';
import LoginForm from './../components/LoginForm';
import RegisterForm from './../components/RegisterForm';
import Breadcrumbs from './../components/Breadcrumbs';

class LoginRegister extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Breadcrumbs path={this.props.match.url} />
                <div className="container">
                    <div className="row">
                        <LoginForm />
                        <RegisterForm />
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default LoginRegister;