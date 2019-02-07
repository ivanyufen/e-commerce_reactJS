import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import swal from '@sweetalert/with-react';

class ChangePassword extends React.Component {

    constructor() {
        super();
        this.state = {
            oldPassword: "",
            newPassword: "",
            newPassword2: "",
            msg: "Save",
            isLoading: false,
            warningMessage: "",
            tempImageURL: ""
        }
    }

    btnSave() {
        return (
            <button type="button" className="btn btn-primary m-2" onClick={this.save}>{this.state.isLoading ? <span>Saving...</span> : this.state.msg}</button>
        )
    }


    save = () => {
        if (this.state.oldPassword == "") {
            this.setState({ warningMessage: "Old password can't be blank" });
        }
        else if (this.state.newPassword == "") {
            this.setState({ warningMessage: "New password can't be blank" });
        }
        else if (this.state.newPassword != this.state.newPassword2) {
            this.setState({ warningMessage: "Password didn't match!" });
        }
        else {
            axios.put(`http://localhost:3007/userspassword/${this.props.data.id}`, { password: this.state.oldPassword, newPassword: this.state.newPassword }).then((x) => {
                console.log(x);
                if (x.data == 'wrongPassword') {
                    this.setState({
                        warningMessage: "Old password is wrong!"
                    });
                }
                else {
                    swal("Your password has been changed!");
                    this.props.history.push("/");
                }
            })
        }
    }

    cancel = () => {
        this.props.history.push("/");
    }

    render() {
        return (
            <React.Fragment>
                <div className="container">
                    <h1 className="text-center my-3">Change Password</h1>
                    <form className="border p-3 m-5" onChange={() => { this.setState({ msg: "Save" }) }}>

                        {/* Old pass */}
                        <div className="form-group">
                            <label htmlFor="name">Old password </label>
                            <input type="password" className="form-control" id="email" value={this.state.oldPassword} onChange={(e) => {
                                this.setState({
                                    oldPassword: e.target.value
                                });
                            }}
                                placeholder="Enter old password" />
                        </div>
                        {/* New pass */}
                        <div className="form-group">
                            <label htmlFor="name">New password </label>
                            <input type="password" className="form-control" id="email" value={this.state.newPassword} onChange={(e) => {
                                this.setState({
                                    newPassword: e.target.value
                                });
                            }}
                                placeholder="Enter new password" />
                        </div>
                        {/* New pass 2 */}
                        <div className="form-group">
                            <label htmlFor="name">Retype password </label>
                            <input type="password" className="form-control" id="email" value={this.state.newPassword2} onChange={(e) => {
                                this.setState({
                                    newPassword2: e.target.value
                                });
                            }}
                                placeholder="Retype password" />
                        </div>


                        <div className="text-left">
                            <p className="text-danger">{this.state.warningMessage}</p>
                            {this.btnSave()}
                            <button className="btn btn-secondary" onClick={this.cancel}>Cancel</button>
                        </div>

                    </form>

                </div>

            </React.Fragment>
        )
    }
}

export default ChangePassword;