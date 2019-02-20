import React from 'react';
import { Button, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';

class CartBtn extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dropdownOpen: false,
            cartData: ""
        };
    }

    toggle = () => {
        axios.get(`http://localhost:3007/cart/${this.props.data.id}`).then((x) => {
            // this.setState({
            //     cartData: x.data
            // })
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
                    <i className="fas fa-shopping-cart fa-sm m-1"></i>Your cart
                </DropdownToggle>
                <DropdownMenu>
                    <DropdownItem>Empty Cart</DropdownItem>
                </DropdownMenu>
            </ButtonDropdown>
            </Link>
        )
    }

    displayCart() {
        if (this.props.isLoggedIn) {
            return (
                <React.Fragment>
                    {/* <a href="" type="button" className="btn btn-light"><i className="fas fa-shopping-cart fa-sm m-1"></i>Your cart (<span>{this.props.cart}</span>)</a> */}
                    <Link to="/cart"><ButtonDropdown onMouseEnter={this.toggle} onMouseLeave={this.toggle} type="button" className="btn btn-light cartbtn" isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                        <DropdownToggle caret>
                            <i className="fas fa-shopping-cart fa-sm m-1"></i>Your cart ({this.props.cart.length})
                        </DropdownToggle>
                        <DropdownMenu>
                            {/* {this.props.cart && this.displayCart()} */}
                            {this.state.cartData ? this.state.cartData.map((val, i) => {
                                return (
                                    <React.Fragment>
                                        <DropdownItem>{val.name}</DropdownItem>
                                    </React.Fragment>
                                )
                            }) : <span></span>}
                            <DropdownItem>Another Action</DropdownItem>
                            <DropdownItem>Another Action</DropdownItem>
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