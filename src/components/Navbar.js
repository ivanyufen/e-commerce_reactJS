import React from 'react';
import { Link } from 'react-router-dom';

class Navbar extends React.Component {
    render() {
        return (
            <React.Fragment>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container">
                        <Link to="/"><a className="navbar-brand" href="">Van & Co.</a></Link>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item active">
                                    <Link to="/"><a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a></Link>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">Our Products</a>
                                </li>
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown"
                                        aria-haspopup="true" aria-expanded="false">
                                        Order
                                    </a>
                                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <Link to="/confirmPayment"><a className="dropdown-item" href="#">Confirm Payment</a></Link>
                                        <a className="dropdown-item" href="#">Order History</a>
                                    </div>
                                </li>
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown"
                                        aria-haspopup="true" aria-expanded="false">
                                        Information
                                    </a>
                                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <a className="dropdown-item" href="">About Us</a>
                                        <Link to="/contact"><a className="dropdown-item" href="">Contact Us</a></Link>
                                        <a className="dropdown-item" href="">Events and Promotions</a>
                                        <a className="dropdown-item" href="">Store Information</a>
                                    </div>
                                </li>
                            </ul>

                            <form className="form-inline my-2 my-lg-0 mr-5">
                                <input className="form-control mr-sm-2" type="search" placeholder="Search product.." aria-label="Search" style={{ width: "11rem" }} />
                                <button className="btn btn-outline-secondary my-2 my-sm-0" type="submit">Search</button>
                            </form>

                            <Link to="/login"><a type="button" className="btn btn-outline-secondary mr-3 login" href="login.html"><i className="fas fa-sign-in-alt"></i>
                                Log In</a></Link>

                            <a type="button" className="btn btn-light"><i className="fas fa-shopping-cart fa-sm m-1"></i>Your cart (<span>0</span>)</a>

                            {/* <a href="#"><span className="header-icons-noti">0</span></a> */}
                        </div>
                    </div>
                </nav>
            </React.Fragment>
        )
    }
}

export default Navbar;