import React from 'react';
import LoginForm from './../components/LoginForm';
import RegisterForm from './../components/RegisterForm';

class LoginRegister extends React.Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <LoginForm />
                    <RegisterForm />
                </div>
            </div>
        )
    }
}

export default LoginRegister;