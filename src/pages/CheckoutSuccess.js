import React from 'react';
import { Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';

class CheckoutSuccess extends React.Component {

    componentDidMount() {


    }

    render() {
        let totalPrice = parseInt(this.props.location.state.totalPrice);
        return (
            <React.Fragment>
                <div className="container my-5">
                    <div className="row">
                        <div className="col-lg-12 text-center">
                            <Card body>
                                <CardTitle style={{ fontSize: "24px" }}>Thank you for your order! Your Order ID is: {this.props.location.state.order_id}</CardTitle>
                                <CardText>We have received your order, please complete the payment as follow:</CardText>
                                <CardText>Transfer via BCA Bank the amount of Rp <span style={{ fontWeight: "bold" }}>{totalPrice.toLocaleString()}</span></CardText>
                                <CardText>Account Number: 5271358564 a.n Ivan Yufen Stefanus</CardText>
                                <CardText>Once the payment has been completed, you can confirm it <Link to="/confirmPayment">here</Link></CardText>
                                <CardText>For more info, you will receive an email to <span style={{ fontStyle: "italic", fontWeight: "bold" }}>{this.props.email}</span> in a few minutes containing invoice and payment details. </CardText>
                                <Button color="success" onClick={() => { this.props.history.push("/") }}>Go back Home</Button>
                            </Card>
                        </div>
                    </div>
                </div>
            </React.Fragment>

        )
    }


}


export default CheckoutSuccess;