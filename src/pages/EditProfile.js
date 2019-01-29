import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class EditProfile extends React.Component {

    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
            data_user: {
                name: "",
                email: "",
                password: "",
                username: "",
                address: "",
                phone_number: "",
                profpict: ""
            },
            files: "",
            msg: "Save",
            isLoading: false,
            warningMessage: ""
        }
    }

    componentDidMount() {
        // this.setState({
        //     data_user: this.props.data
        // })
        axios.get(`http://localhost:3007/users/${this.props.data.id}`).then((x) => {
            this.setState({
                data_user: {
                    name: x.data[0].name,
                    email: x.data[0].email,
                    username: x.data[0].username,
                    address: x.data[0].address,
                    phone_number: x.data[0].phone_number,
                    profpict: x.data[0].profpict
                }
            });
        })

    }

    btnSave() {
        return (
            <button type="button" className="btn btn-primary m-2" onClick={this.save}>{this.state.isLoading ? <span>Saving...</span> : this.state.msg}</button>
        )
    }


    save = () => {
        //cek secara front end
        if (this.state.data_user.email == "") {
            this.setState({ warningMessage: "Email can't be blank" });
        }
        else if (this.state.data_user.email.includes("@") == false || this.state.data_user.email.includes(".") == false) {
            this.setState({ warningMessage: "Wrong email format!" });
        }
        else if (this.state.data_user.name == "") {
            this.setState({ warningMessage: "Name can't be blank" });
        }
        else if (this.state.data_user.username == "") {
            this.setState({ warningMessage: "Username can't be blank" });
        }
        else if (this.state.data_user.username.includes(" ")) {
            this.setState({ warningMessage: "Username can't have space" });
        }
        else if (this.state.data_user.password == "") {
            this.setState({ warningMessage: "Password can't be blank" });
        }
        else if (this.state.data_user.address == "") {
            this.setState({ warningMessage: "Address can't be blank" });
        }
        else if (this.state.data_user.phone_number == "") {
            this.setState({ warningMessage: "Phone Number can't be blank" });
        }
        else if (isNaN(this.state.data_user.phone_number)) {
            this.setState({ warningMessage: "Phone Number must be a digit!" });
        }
        else {
            this.setState({ isLoading: true })
            axios.put(`http://localhost:3007/users/${this.props.data.id}`, this.state.data_user).then(() => {
                if (this.state.files) {
                    var url = 'http://localhost:3007/upload';
                    var formData = new FormData();

                    //ngirim id user ke back end
                    formData.append('userid', this.props.data.id);

                    //ngirim file gambarnya ke back end
                    formData.append('file', this.state.files);

                    var config = {
                        headers:
                            { 'Content-Type': 'multipart/form-data' }
                    };

                    axios.post(url, formData, config).then(() => {
                        // ini di get lagi supaya gambarnya keganti juga di tampilan edit profile.
                        axios.get(`http://localhost:3007/users/${this.props.data.id}`).then((x) => {
                            let data_userCopy = this.state.data_user;
                            data_userCopy.profpict = x.data[0].profpict;
                            this.setState({
                                data_user: data_userCopy
                            });
                        });

                        this.setState({
                            msg: "Data saved!",
                            isLoading: false,
                            files: ""
                        });
                    });
                }

                else {
                    this.setState({
                        msg: "Data saved!",
                        isLoading: false,
                        files: "",
                        warningMessage: ""
                    });
                }

            });
            this.props.checkUserSession();
        }
    }

    cancel = () => {
        this.props.history.push("/");
    }

    render() {
        return (
            <React.Fragment>
                <div className="container">
                    <h1 className="text-center my-3">Edit Profile</h1>
                    <form className="border p-3 m-5" onChange={() => { this.setState({ msg: "Save" }) }}>
                        {/* Email */}
                        <div className="form-group">
                            <label htmlFor="email">Email address</label>
                            <input type="email" className="form-control" id="email" value={this.state.data_user.email} onChange={(e) => {
                                let data_userCopy = this.state.data_user;
                                data_userCopy.email = e.target.value;
                                this.setState({
                                    data_user: data_userCopy
                                });
                            }}
                                placeholder="Enter email" />
                        </div>

                        {/* Name */}
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input type="name" className="form-control" id="email" value={this.state.data_user.name} onChange={(e) => {
                                let data_userCopy = this.state.data_user;
                                data_userCopy.name = e.target.value;
                                this.setState({
                                    data_user: data_userCopy
                                });
                            }}
                                placeholder="Enter name" />
                        </div>

                        {/* Username */}
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input type="text" className="form-control" id="username" value={this.state.data_user.username} onChange={(e) => {
                                let data_userCopy = this.state.data_user;
                                data_userCopy.username = e.target.value;
                                this.setState({
                                    data_user: data_userCopy
                                });
                            }}
                                placeholder="Enter Username" />
                        </div>

                        {/* Address */}
                        <div className="form-group">
                            <label htmlFor="address">Address</label>
                            <textarea className="form-control" id="address" value={this.state.data_user.address} onChange={(e) => {
                                let data_userCopy = this.state.data_user;
                                data_userCopy.address = e.target.value;
                                this.setState({
                                    data_user: data_userCopy
                                });
                            }} placeholder="Enter address" ></textarea>
                        </div>

                        {/* Phone Number */}
                        <div className="form-group">
                            <label htmlFor="phone_number">Phone Number</label>
                            <input type="text" className="form-control" id="phone_number" value={this.state.data_user.phone_number} onChange={(e) => {
                                let data_userCopy = this.state.data_user;
                                data_userCopy.phone_number = e.target.value;
                                this.setState({
                                    data_user: data_userCopy
                                });
                            }}
                                placeholder="Enter phone number" />
                        </div>

                        {/* Profile Picture */}
                        <div className="form-group">
                            <p>Profile Picture</p>
                            <img src={this.state.data_user.profpict} className="d-block" style={{ maxWidth: 100, maxHeight: 150 }} />
                            <label htmlFor="file-upload" style={{ border: "2px solid #ccc", display: "inline-block", padding: "6px 12px", cursor: "pointer", backgroundColor: "gray", color: "white" }}> {this.state.files ? this.state.files.name.length > 20 ? this.state.files.name.slice(0, 15) + "..." : this.state.files.name : <span>Browse image..</span>}</label>
                            <input id="file-upload" type="file" name="filename" style={{ display: "none" }} onChange={(e) => { this.setState({ files: e.target.files[0] }) }} />
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

export default EditProfile;