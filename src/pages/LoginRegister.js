import React from 'react';
import Breadcrumbs from './../components/Breadcrumbs';
import axios from 'axios';

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
            isLoggedIn: false
        }
    }

    // checkUserSession = () => {
    //     //di cek apakah ada sessionnya di local storage
    //     if (localStorage.getItem("user_session")) {
    //         // kalau ada di local storage, di cek apakah sessionnya ada di table session
    //         axios.post("http://localhost:3007/session", {
    //             user_session: localStorage.getItem("user_session")
    //         }).then((x) => {
    //             // kalau ada sessionnya di table session, kita minta data user yg login
    //             axios.get(`http://localhost:3007/users/${x.data[0].id_user}`).then((y) => {
    //                 // dan kita kasi data2 user yg mau dipakai
    //                 //buat object sementara
    //                 let data_user = {
    //                     id: y.data[0].id,
    //                     name: y.data[0].name,
    //                     username: y.data[0].username,
    //                     profpict: y.data[0].profpict
    //                 };
    //                 // dikasi ke state objectnya
    //                 this.setState({
    //                     isLoggedIn: true,
    //                     data_user: data_user,
    //                     files: ""
    //                 });
    //                 console.log(this.state.data_user)
    //             });
    //         });
    //     }
    //     // kalau session gaada di local storage, lsg login
    //     else {
    //         console.log("Silakan login!");
    //     }
    // }


    // componentDidMount() {
    //     this.props.checkUserSession();
    // }

    login = (e) => {
        // e.preventDefault();
        //cek ke database
        axios.post("http://localhost:3007/login", {
            username: this.state.username,
            password: this.state.password
        }).then((x) => {
            if (x.data.status == "wrongPassword") {
                alert("Password salah!");
            }
            else if (x.data.status == "notRegistered") {
                alert("Anda belum terdaftar!");
            }
            else {
                let user_session = x.data;
                localStorage.setItem("user_session", user_session);
                console.log(localStorage.getItem("user_session"));
                console.log(x)
                if (user_session) {
                    this.props.checkUserSession();
                    alert("Login sukses!");
                    this.props.onLoginClick(this.state.data_user);
                    this.props.history.push('/productList');
                }
            }
        });
    };

    register = (e) => {
        e.preventDefault();
        //cek ke database
        axios.post("http://localhost:3007/users", this.state.data_user)
            .then((x) => {
                if (x.data.status == "dataExist") {
                    alert("Username / Email sudah terdaftar!");
                    // this.setState({
                    //     files: ""
                    // });
                }
                else {

                    //kasi tau sign up sukses
                    // alert("Sign Up sukses!");
                    console.log(x)

                    //baru upload gambar profile picturenya
                    var url = 'http://localhost:3007/upload';
                    var formData = new FormData();

                    //ngirim id user ke back end
                    formData.append('userid', x.data.id_user);
                    console.log(x.data)
                    console.log(x.data.id_user)
                    console.log("haha")
                    //ngirim file gambarnya ke back end
                    formData.append('file', this.state.files);

                    var config = {
                        headers:
                            { 'Content-Type': 'multipart/form-data' }
                    };

                    //kalau file nya ada, upload
                    if (this.state.files) {
                        console.log("file masuk");
                        axios.post(url, formData, config).then((res) => {
                        });
                    }

                    // user setelah ke regis, mau langsung kita bikin logged in, jadi kita buat sessionnya.
                    let user_session = x.data.session_token;
                    localStorage.setItem("user_session", user_session);
                    console.log(localStorage.getItem("user_session"));

                    if (user_session) {
                        alert("Register sukses! Anda telah ter-login!");
                        this.props.checkUserSession();
                        console.log(x)
                        this.props.history.push('/productList');
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

    handleEnter = (e) => {

        if (e.keyCode == 13) {
            this.login();
        }
    }


    render() {
        return (
            <React.Fragment>
                <Breadcrumbs path={this.props.match.url} />
                <div className="container mb-5">
                    <div className="row">
                        {/* <Login Form /> */}
                        <div className="col-lg-6">
                            <form className="border p-3 m-5">
                                <div className="form-group">
                                    <label for="username">Username</label>
                                    <input type="text" className="form-control" id="username" value={this.state.username} onChange={(e) => { this.setState({ username: e.target.value }) }}
                                        placeholder="Enter username" />
                                </div>
                                <div className="form-group">
                                    <label for="password">Password</label>
                                    <input type="password" className="form-control" id="password" value={this.state.password} onKeyDown={this.handleEnter} onChange={(e) => { this.setState({ password: e.target.value }) }} placeholder="Password" />
                                </div>
                                <div className="form-group">
                                    <p>Forgot your password? <a href="">Reset</a></p>
                                </div>
                                <button type="button" onClick={this.login} className="btn btn-primary">Log In</button>
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
                                    <label className="form-check-label" for="registerCheck">Register</label>
                                </div>
                                <div id="regis" className={this.state.classDisplay}>

                                    {/* Email */}
                                    <div className="form-group">
                                        <label for="email">Email address</label>
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
                                        <label for="name">Name</label>
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
                                        <label for="username">Username</label>
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
                                        <label for="pass">Password</label>
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
                                        <label for="address">Address</label>
                                        <input type="text" className="form-control" id="address" value={this.state.data_user.address} onChange={(e) => {
                                            let data_userCopy = this.state.data_user;
                                            data_userCopy.address = e.target.value;
                                            this.setState({
                                                data_user: data_userCopy
                                            });
                                        }}
                                            placeholder="Enter address" />
                                    </div>

                                    {/* Phone Number */}
                                    <div className="form-group">
                                        <label for="phone_number">Phone Number</label>
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
                                        <label for="file-upload" style={{ border: "2px solid #ccc", display: "inline-block", padding: "6px 12px", cursor: "pointer", backgroundColor: "gray", color: "white" }}> {this.state.files ? this.state.files.name : <span>Browse image..</span>}</label>
                                        <input id="file-upload" type="file" name="filename" style={{ display: "none" }} onChange={(e) => { this.setState({ files: e.target.files[0] }) }} />
                                    </div>

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

export default LoginRegister;