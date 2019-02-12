import React from 'react';
import { Link } from 'react-router-dom';
import LoginBtn from './LoginBtn';
import CartBtn from './CartBtn';

class Navbar extends React.Component {
    render() {

        return (
            <React.Fragment>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container">
                        <Link to="/"><a href="/" className="navbar-brand">Van & Co.</a></Link>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item">
                                    <a href="/" className="nav-link navmenu" style={window.location.pathname == '/' ? { color: '#4183c4' } : { color: 'gray' }}>Home</a>
                                </li>
                                <li className="nav-item">
                                    <Link to="/shop"><a href="productList" className="nav-link navmenu" style={window.location.pathname == '/shop' ? { color: '#4183c4' } : { color: 'gray' }}>Shop</a></Link>
                                </li>
                                <li className="nav-item dropdown">
                                    <a href="" className="nav-link dropdown-toggle navmenu" id="navbarDropdown" role="button" data-toggle="dropdown"
                                        aria-haspopup="true" aria-expanded="false" style={window.location.pathname == '/confirmPayment' ? { color: '#4183c4' } : { color: 'gray' }}>
                                        Order
                                    </a>
                                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <Link to="/confirmPayment"><a href="" className="dropdown-item" style={window.location.pathname == '/confirmPayment' ? { color: '#4183c4' } : { color: 'black' }}>Confirm Payment</a></Link>
                                        <a href="#" className="dropdown-item" >Order History</a>
                                    </div>
                                </li>
                                <li className="nav-item dropdown">
                                    <a href="" className="nav-link dropdown-toggle navmenu" id="navbarDropdown" role="button" data-toggle="dropdown"
                                        aria-haspopup="true" aria-expanded="false" style={window.location.pathname == '/aboutUs' || window.location.pathname == '/faq' || window.location.pathname == '/contact' ? { color: '#4183c4' } : { color: 'gray' }}>
                                        Information
                                    </a>
                                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <Link to="/aboutUs"><a href="" className="dropdown-item" >About Us</a></Link>
                                        <Link to="/contact"><a href="" className="dropdown-item" >Contact Us</a></Link>
                                        <Link to="/faq"><a href="" className="dropdown-item" >F.A.Q</a></Link>
                                        <a href="" className="dropdown-item" >Events and Promotions</a>
                                        <a href="" className="dropdown-item" >Store Information</a>
                                    </div>
                                </li>
                            </ul>

                            <form className="form-inline my-2 my-lg-0 mr-5">
                                <input className="form-control mr-sm-2" type="search" placeholder="Search product.." aria-label="Search" style={{ width: "11rem" }} />
                                <button className="btn btn-outline-secondary my-2 my-sm-0" type="submit">Search{this.props.username_user}</button>
                            </form>

                            <LoginBtn data={this.props.data_user} isCheckSession={this.props.isCheckingSession} />
                            <CartBtn isCheckSession={this.props.isCheckingSession} cart={this.props.cart} />

                            {/* <a href="" type="button" className="btn btn-light"><i className="fas fa-shopping-cart fa-sm m-1"></i>Your cart (<span>{this.props.cart}</span>)</a> */}
                        </div>
                    </div>
                </nav>
            </React.Fragment>
        )
    }
}

export default Navbar;