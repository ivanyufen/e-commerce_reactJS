import React from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

class LoginBtn extends React.Component {
    constructor() {
        super();

        this.state = {
            dropdownOpen: false
        };
    }

    logout = () => {
        //saat user logout, delete local storage dan set state kosong
        // localStorage.removeItem("user_data");
        axios.delete(`http://localhost:3007/session/${this.props.data.id}`).then(() => {
            console.log("Delete berhasil!")
        })
        localStorage.removeItem("user_session");
        // di refresh supaya si App.js jalanin check session lagi
        document.location.reload();
        // this.setState({ username: "", password: "", isLoggedIn: false, files: "", profpict: "" });
    };


    toggle = () => {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    displayDropDown() {
        console.log(this.props.data)
        return (
            <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                <DropdownToggle caret className="btn btn-outline-secondary mr-3 login">
                    <img src={this.props.data.profpict} style={{ borderRadius: "50%", border: "1px solid black", width: 30, height: 30, marginRight: 8 }} />
                    {this.props.data.name}
                </DropdownToggle>
                <DropdownMenu>
                    <DropdownItem style={{ cursor: "pointer" }}> Edit Profile</DropdownItem>
                    {this.props.data.role == "Admin" && <a href="/dashboard"><DropdownItem style={{ cursor: "pointer" }}>Dashboard</DropdownItem></a>}
                    <DropdownItem divider />
                    <DropdownItem onClick={this.logout} style={{ cursor: "pointer" }}>Log Out</DropdownItem>
                </DropdownMenu>
            </ButtonDropdown>
        )
    }

    displayLoginBtn(x) {
        return (
            <Link to="/login">
                <a href="" type="button" className="btn btn-outline-secondary mr-3 login" href=""><i className="fas fa-sign-in-alt"></i>Log In</a>
            </Link>
        )
    }

    render() {

        if (this.props.checkUserSession == true) {
            return (
                <a href="" type="button" className="btn btn-outline-secondary mr-3 login" style={{ visibility: "hidden" }} href="">><i className="fas fa-sign-in-alt"></i>Log In</a>
            )
        }
        else {
            return (
                <React.Fragment>
                    {this.props.data ? this.displayDropDown() : this.displayLoginBtn()}
                </React.Fragment>
            )
        }

    }
}

export default LoginBtn;