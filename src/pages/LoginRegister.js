import React from 'react';
import Breadcrumbs from './../components/Breadcrumbs';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
// import swal from 'sweetalert';
import swal from '@sweetalert/with-react';

class LoginRegister extends React.Component {

    constructor() {
        super();
        this.state = {
            classDisplay: "d-none",
            username: "",
            password: "",
            data_user: {
                name: "",
                email: "",
                password: "",
                username: "",
                address: "",
                phone_number: ""
            },
            files: "",
            warningMessage: "",
            tempImageURL: ""
        }
    }

    login = (e) => {
        e.preventDefault();
        //cek ke database
        axios.post("http://localhost:3007/login", {
            username: this.state.username,
            password: this.state.password
        }).then((x) => {
            if (x.data.status == "wrongPassword") {
                swal("Password salah!");
            }
            else if (x.data.status == "notRegistered") {
                swal("Anda belum terdaftar!");
            }
            else {
                // jika sudah match data dgn database, dibuat session untuk log in usernya
                let user_session = x.data;
                localStorage.setItem("user_session", user_session);
                this.props.checkUserSession();
                // selesai dicek, tampilkan login sukses dan dicek, admin atau bukan; Jika bukan, ke shopping, jika iya, ke dashboard.
                swal("Login sukses!").then(() => {
                    this.props.role == "Admin" ? this.props.history.push("/dashboard") : this.props.history.push('/shop')
                });
            }
        });
    };

    register = (e) => {
        e.preventDefault();

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
            //cek ke database
            axios.post("http://localhost:3007/users", this.state.data_user)
                .then((x) => {
                    if (x.data.status == "dataExist") {
                        swal("Username / Email sudah terdaftar!");
                    }
                    else {
                        //kalau file nya ada, upload
                        if (this.state.files) {
                            //baru upload gambar profile picturenya
                            var url = 'http://localhost:3007/upload';
                            var formData = new FormData();

                            //ngirim id user ke back end
                            formData.append('userid', x.data.id_user);

                            //ngirim file gambarnya ke back end
                            formData.append('file', this.state.files);

                            var config = {
                                headers:
                                    { 'Content-Type': 'multipart/form-data' }
                            };

                            axios.post(url, formData, config).then((res) => {
                                console.log("file masuk");
                            });
                        }

                        // user setelah ke regis, mau langsung kita bikin logged in, jadi kita buat sessionnya.
                        let user_session = x.data.session_token;
                        localStorage.setItem("user_session", user_session);

                        if (user_session) {
                            swal("Register sukses! Anda telah ter-login!").then(() => {
                                this.props.checkUserSession();
                                this.props.history.push('/shop');
                            });
                        }

                        // state dikosongin supaya form nya kosong lagi
                        this.setState({
                            isLoggedIn: true,
                            data_user: {
                                name: "",
                                email: "",
                                password: "",
                                username: "",
                                address: "",
                                phone_number: ""
                            }
                        });
                    }
                });
        }
    };

    // UNTUK EVENT CHECKBOX REGISTER KE CHECK, TOGGLE CLASS
    onHandleChange = () => {
        if (this.state.classDisplay === "d-none") {
            this.setState({ classDisplay: "d-block" })
        }
        else {
            this.setState({ classDisplay: "d-none" })
        }
    }

    render() {
        if (this.props.isLoggedIn) {
            return (
                <Redirect to="/" />
            )
        }
        else {
            return (
                <React.Fragment>
                    <Breadcrumbs path={this.props.match.url} />
                    <div className="container mb-5">
                        <div className="row">
                            {/* <Login Form /> */}
                            <div className="col-lg-6">
                                <form className="border p-3 m-5">
                                    <div className="form-group">
                                        <label htmlFor="username">Username</label>
                                        <input type="text" className="form-control" id="username" value={this.state.username} autoFocus onChange={(e) => { this.setState({ username: e.target.value }) }}
                                            placeholder="Enter username" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password">Password</label>
                                        <input type="password" className="form-control" id="password" value={this.state.password} onKeyDown={this.handleEnter} onChange={(e) => { this.setState({ password: e.target.value }) }} placeholder="Password" />
                                    </div>
                                    <div className="form-group">
                                        <p>Forgot your password? <a href="">Reset</a></p>
                                    </div>
                                    <input type="submit" onClick={this.login} value="Log in" className="btn btn-primary" /> {/* Memakai input, bukan button, supaya bisa di enter */}
                                </form>
                            </div>

                            {/* Register Form */}
                            <div className="col-lg-6">
                                <form className="border p-3 m-5">
                                    <h4>Don't have an account? </h4>
                                    <div className="sm-line"></div>
                                    <p>Register now.</p>
                                    <div className="form-group form-check">
                                        <input type="checkbox" className="form-check-input" id="registerCheck" autoComplete="off" onChange={this.onHandleChange} />
                                        <label className="form-check-label" htmlFor="registerCheck">Register</label>
                                    </div>
                                    <div id="regis" className={this.state.classDisplay}>

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

                                        {/* Password */}
                                        <div className="form-group">
                                            <label htmlFor="pass">Password</label>
                                            <input type="password" className="form-control" value={this.state.data_user.password} onChange={(e) => {
                                                let data_userCopy = this.state.data_user;
                                                data_userCopy.password = e.target.value;
                                                this.setState({
                                                    data_user: data_userCopy
                                                });
                                            }}
                                                placeholder="Password" />
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
                                            <img src={this.state.tempImageURL} style={{ maxWidth: "150px", maxHeight: "250px", display: "block" }} />
                                            <label htmlFor="file-upload" style={{ border: "2px solid #ccc", display: "inline-block", padding: "6px 12px", cursor: "pointer", backgroundColor: "gray", color: "white" }}> {this.state.files ? this.state.files.name : <span>Browse image..</span>}</label>
                                            <input id="file-upload" type="file" accept="image/*" name="filename" style={{ display: "none" }} onChange={(e) => { this.setState({ files: e.target.files[0], tempImageURL: URL.createObjectURL(e.target.files[0]) }) }} />
                                        </div>

                                        <p className="text-danger">{this.state.warningMessage}</p>

                                        <button type="submit" onClick={this.register} className="btn btn-primary">Register</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                </React.Fragment>
            )
        }
    }
}


export default LoginRegister;