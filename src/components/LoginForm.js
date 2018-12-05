import React from 'react';

class LoginForm extends React.Component {
    render() {
        return (
            <div className="col-lg-6">
                <form className="border p-3 m-5">
                    <div className="form-group">
                        <label for="exampleInputEmail1">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                            placeholder="Enter email" />
                    </div>
                    <div className="form-group">
                        <label for="exampleInputPassword1">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
                    </div>
                    <div className="form-group">
                        <p>Forgot your password? <a href="#">Reset</a></p>
                    </div>
                    <button type="submit" className="btn btn-primary">Log In</button>
                </form>
            </div>
        )
    }
}

export default LoginForm;