import React from 'react';

class RegisterForm extends React.Component {
    render() {
        return (
            <div className="col-lg-6">
                <form className="border p-3 m-5">
                    <h4>Dont have an account? </h4>
                    <div className="sm-line"></div>
                    <p>Register now.</p>
                    <div className="form-group form-check">
                        <input type="checkbox" className="form-check-input" id="registerCheck" autocomplete="off" onclick="showRegisForm()" />
                        <label className="form-check-label" for="registerCheck">Register</label>
                    </div>
                    <div id="regis" className="d-none">
                        <div className="form-group">
                            <label for="exampleInputEmail1">Email address</label>
                            <input type="email" className="form-control" id="email"
                                placeholder="Enter email" />
                        </div>
                        <div className="form-group">
                            <label for="exampleInputPassword1">Password</label>
                            <input type="password" className="form-control" placeholder="Password" />
                            <label for="exampleInputPassword1">Re-type Password</label>
                            <input type="password" className="form-control" placeholder="Password" />
                        </div>
                        <div className="form-group">
                            <label for="address">Address</label>
                            <input type="text" className="form-control" id="address"
                                placeholder="Enter address" />
                        </div>
                        <div className="form-group">
                            <label for="address">Phone Number</label>
                            <input type="text" className="form-control" id="phone-no"
                                placeholder="Enter phone number" />
                        </div>
                        <button type="submit" className="btn btn-primary">Register</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default RegisterForm;