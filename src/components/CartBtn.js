import React from 'react';
import { Button, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import axios from 'axios';

class CartBtn extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dropdownOpen: false
        };
    }

    toggle = () => {
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

    render() {
        if (this.props.isCheckSession == true) {
            return (
                <ButtonDropdown type="button" className="btn btn-light cartbtn" isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                    <DropdownToggle caret>
                        <i className="fas fa-shopping-cart fa-sm m-1"></i>Your cart {this.props.user_id}
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem>Another Action</DropdownItem>
                        <DropdownItem>Another Action</DropdownItem>
                    </DropdownMenu>
                </ButtonDropdown>
            )
        }
        else {
            { console.log(this.props.cart) }
            return (
                <React.Fragment>
                    {/* <a href="" type="button" className="btn btn-light"><i className="fas fa-shopping-cart fa-sm m-1"></i>Your cart (<span>{this.props.cart}</span>)</a> */}
                    <ButtonDropdown type="button" className="btn btn-light cartbtn" isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                        <DropdownToggle caret>
                            <i className="fas fa-shopping-cart fa-sm m-1"></i>Your cart ({this.props.cart.length})
                        </DropdownToggle>
                        <DropdownMenu>
                            {this.props.cart && this.displayCart()}
                            <DropdownItem>Another Action</DropdownItem>
                            <DropdownItem>Another Action</DropdownItem>
                        </DropdownMenu>
                    </ButtonDropdown>
                </React.Fragment>
            )
        }

    }
}


export default CartBtn;