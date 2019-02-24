import React from 'react';
import { Button, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';

class CartBtn extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dropdownOpen: false,
            cartData: "",
            cartQty: ""
        };
    }

    componentDidMount() {
        this.getCartData();
    }

    componentWillReceiveProps() {
        this.getCartData();
    }

    getCartData = () => {
        axios.get(`http://localhost:3007/cart/${this.props.data_user.id}`).then((x) => {
            this.setState({
                cartData: x.data
            });
        });
    }

    toggle = () => {
        axios.get(`http://localhost:3007/cart/${this.props.data_user.id}`).then((x) => {
            console.log(x.data)
        })
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    displayCart() {
        return this.props.cart.map((val) => {
            return (
                <DropdownItem>{val.name}</DropdownItem>
            )
        })
    }

    cartNotLoggedIn() {
        return (
            <Link to="/cart"><ButtonDropdown onMouseEnter={this.toggle} onMouseLeave={this.toggle} type="button" className="btn btn-light cartbtn" isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                <DropdownToggle caret>
                    <i className="fas fa-shopping-cart fa-sm m-1"></i>Your cart (0)
                </DropdownToggle>
                <DropdownMenu>
                    <DropdownItem>Empty Cart</DropdownItem>
                </DropdownMenu>
            </ButtonDropdown>
            </Link>
        )
    }

    displayCart() {
        if (this.props.isLoggedIn && this.state.cartData.length > 0) {
            return (
                <React.Fragment>
                    {/* <a href="" type="button" className="btn btn-light"><i className="fas fa-shopping-cart fa-sm m-1"></i>Your cart (<span>{this.props.cart}</span>)</a> */}
                    <Link to="/cart"><ButtonDropdown onMouseEnter={this.toggle} onMouseLeave={this.toggle} type="button" className="btn btn-light cartbtn" isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                        <DropdownToggle caret>
                            <i className="fas fa-shopping-cart fa-sm m-1"></i>Your cart ({this.state.cartData.length || 0})
                        </DropdownToggle>
                        <DropdownMenu>
                            {/* {this.props.cart && this.displayCart()} */}
                            {this.state.cartData ? this.state.cartData.map((val, i) => {
                                if (i < 3) {
                                    return (
                                        <React.Fragment>
                                            <Link to="/cart"><DropdownItem style={{ cursor: "pointer" }}><img src={val.photo} style={{ width: 70, height: 50 }} />{val.name} {val.size} mm - {val.quantity} pcs</DropdownItem></Link>
                                        </React.Fragment>
                                    )
                                }
                            }) : <span></span>}
                            <DropdownItem divider />
                            <DropdownItem>
                                Total: {this.state.cartData.length ? this.state.cartData.length : 0} produk
                            </DropdownItem>
                            <DropdownItem style={{ cursor: "pointer" }}>
                                <Link to="/cart"><p>View More</p></Link>
                            </DropdownItem>
                        </DropdownMenu>
                    </ButtonDropdown>
                    </Link>
                </React.Fragment>
            )
        }
        else {
            return this.cartNotLoggedIn()
        }
    }


    render() {
        if (this.props.isCheckSession == true) {
            return (
                this.cartNotLoggedIn()
            )
        }
        else {
            return (
                this.displayCart()
            )
        }

    }
}


export default CartBtn;