import React from 'react';
import Breadcrumbs from './../components/Breadcrumbs';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import swal from '@sweetalert/with-react';

class ConfirmPayment extends React.Component {

    state = {

        order_id: "",
        payment_date: "",
        bank_account_name: "",
        transfer_amount: ""
    }

    componentDidMount() {
        if (this.props.location.state) {
            this.setState({
                order_id: this.props.location.state.order_id
            })
        }
    }

    validatePayment = () => {

        axios.post(`http://localhost:3007/payment`, {

            order_id: this.state.order_id,
            payment_date: this.state.payment_date,
            bank_account_name: this.state.bank_account_name,
            transfer_amount: this.state.transfer_amount

        }).then((x) => {
            console.log(x)
            if (x.data.status == "orderNotFound") {
                swal("Sorry, we can't find order with that invoice number");
                this.setState({
                    order_id: "",
                    payment_date: "",
                    bank_account_name: "",
                    transfer_amount: ""
                })
            }
            else if (x.data.status == "amountNotMatch") {
                swal("The amount you transferred didn't match the bills")
                this.setState({
                    transfer_amount: ""
                })
            }
            else {
                swal("Payment received! Click ok to redirect to my order page to track your order status").then(() => {
                    this.props.history.push("/my-orders");
                })
            }
        })

    }
    render() {
        if (this.props.isLoggedIn) {
            return (
                <React.Fragment>
                    <Breadcrumbs path={this.props.match.url} />
                    <div className="container text-center">
                        <form className="border p-3 m-5">
                            <h3 className="text-uppercase">Confirm Payment</h3>
                            {/* <div className="sm-line"></div> */}
                            <div className="form-group">
                                <label for="invoice-no">Invoice Number</label>
                                <input type="text" className="form-control" value={this.props.location.state ? this.props.location.state.order_id : this.state.order_id} id="invoice-no" onChange={(e) => {
                                    this.setState({
                                        order_id: e.target.value
                                    })
                                }}
                                    placeholder="Your Invoice Number.. " />
                            </div>
                            <div className="form-group">
                                <label for="payment-date">Payment Date</label>
                                <input type="date" className="form-control" value={this.state.payment_date} id="payment-date" onChange={(e) => {
                                    this.setState({
                                        payment_date: e.target.value
                                    })
                                }}
                                    placeholder="Payment Date" />
                            </div>
                            <div className="form-group">
                                <label for="bankaccount">Bank Account Name</label>
                                <input type="text" className="form-control" value={this.state.bank_account_name} id="bankaccount" onChange={(e) => {
                                    this.setState({
                                        bank_account_name: e.target.value
                                    })
                                }}
                                    placeholder="Your Bank Account Name.." />
                            </div>
                            <div className="form-group">
                                <label for="amount">Transfer Amount</label>
                                <input type="text" className="form-control" value={this.state.transfer_amount} id="amount" placeholder="Rp 10.000" onChange={(e) => {
                                    this.setState({
                                        transfer_amount: e.target.value
                                    })
                                }}
                                />
                            </div>
                            {/* <div className="form-group">
                                <label for="proof-of-payment">Proof of Payment</label>
                                <input type="file" className="form-control-file" id="proof-of-payment" />
                            </div> */}
                            <button type="button" onClick={this.validatePayment} className="btn btn-primary">Confirm Payment</button>
                        </form>
                    </div>
                </React.Fragment>
            )
        }
        else {
            return (
                <Redirect to="/login" />
            )
        }

    }
}

export default ConfirmPayment;