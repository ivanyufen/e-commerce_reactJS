import React from 'react';

class LoginForm extends React.Component {

    constructor() {
        super();
        this.state = {
            data_user: {},
            files: "",
            isLoggedIn: false
        }
    }

    checkUserSession = () => {
        //di cek apakah ada sessionnya di local storage
        if (localStorage.getItem("user_session")) {
            // kalau ada di local storage, di cek apakah sessionnya ada di table session
            axios.post("http://localhost:3007/session", {
                user_session: localStorage.getItem("user_session")
            }).then((x) => {
                // kalau ada sessionnya di table session, kita minta data user yg login
                axios.get(`http://localhost:3007/users/${x.data[0].id_user}`).then((y) => {
                    // dan kita kasi data2 user yg mau dipakai
                    //buat object sementara
                    let data_user = {
                        id: y.data[0].id,
                        name: y.data[0].name,
                        username: y.data[0].username,
                        profpict: y.data[0].profpict
                    };
                    // dikasi ke state objectnya
                    this.setState({
                        isLoggedIn: true,
                        data_user: data_user
                    });
                    console.log(this.state.data_user)
                    console.log("WAHAHAH")
                });
            });
        }
        // kalau session gaada di local storage, lsg login
        else {
            console.log("Silakan login!");
        }
    }

    componentDidMount() {
        this.checkUserSession();
    }


    login = () => {
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

                if (user_session) {
                    this.checkUserSession();
                    alert("Login sukses!");
                }
            }
        });
    };

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
                        <p>Forgot your password? <a href="">Reset</a></p>
                    </div>
                    <button type="button" onClick={this.login} className="btn btn-primary">Log In</button>
                </form>
            </div>
        )
    }
}

export default LoginForm;