import React from 'react';
import axios from 'axios';
import { Table, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Link } from 'react-router-dom';

class MyOrders extends React.Component {

    state = {
        orderData: "",
        modal: false,
        order_id_chosen: "",
        status_chosen: "",
        orderDetails: ""
    }

    componentDidMount() {
        axios.get(`http://localhost:3007/orders/${this.props.id_user}`).then((x) => {
            console.log(x.data)
            var data = [...x.data].reverse();
            this.setState({
                orderData: data
            });

        })
    }


    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    modalDetails() {
        return (
            <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                <ModalHeader toggle={this.toggle}>Order Details</ModalHeader>
                {this.state.orderDetails &&
                    <ModalBody>

                        <h4><span className="font-weight-bold">Order ID:</span> {this.state.orderDetails[0].id}</h4>
                        <h4>Delivery Details: </h4>
                        <p><span className="font-weight-bold">Name:</span> {this.state.orderDetails[0].cust_name}</p>
                        <p><span className="font-weight-bold">Phone:</span> {this.state.orderDetails[0].cust_phone}</p>
                        <p><span className="font-weight-bold">Address:</span> {this.state.orderDetails[0].cust_address}</p>
                        <h4>Items:</h4>
                        {this.state.orderDetails.map((val) => <p>{val.name} - {val.size} ({val.quantity} pcs) / Rp {val.price.toLocaleString()}</p>)}
                        <h4>Total Price: Rp {parseInt(this.state.orderDetails[0].totalPrice).toLocaleString()}</h4>
                        {/* <h4>Status: {this.state.orderDetails[0].status == "Paid" ? <span className="text-info">Paid and ready to ship</span> : <span className="text-info">Waiting for payment</span>}</h4> */}
                        <h4>Status: {
                            (this.state.orderDetails[0].status == "Processed") ?
                                <span className="text-info">Ready to ship</span>
                                :
                                (this.state.orderDetails[0].status == "Paid")
                                    ?
                                    <span className="text-info">Payment Received and waiting for processed</span>
                                    :
                                    <span className="text-info">Waiting for payment</span>}
                        </h4>


                    </ModalBody>
                }
                <ModalFooter>
                    {this.state.status_chosen == "Paid" ? "" : <Button color="primary" onClick={() => {
                        this.props.history.push({
                            pathname: '/confirmPayment',
                            state: { order_id: this.state.orderDetails[0].id }
                        })
                    }}>Confirm Payment</Button>}

                    <Button color="secondary" onClick={this.toggle}>Close</Button>
                </ModalFooter>
            </Modal>
        )
    }

    getOrderDetails = (order_id) => {
        axios.get(`http://localhost:3007/order/${order_id}`).then((x) => {
            console.log(x.data[0])
            this.setState({
                order_id_chosen: "",
                orderDetails: x.data
            });
            this.toggle();
        }).catch(() => {
            this.setState({
                order_id_chosen: ""
            })
        })
    }

    displayOrders() {
        return this.state.orderData.map((val, i) => {
            return (
                <tr>
                    <td>{i + 1}</td>
                    <td>{val.id}</td>
                    <td>Rp {parseInt(val.totalPrice).toLocaleString()}</td>
                    <td>{
                        (val.status == "Processed") ?
                            <span className="text-info">Ready to ship</span>
                            :
                            (val.status == "Paid")
                                ?
                                <span className="text-info">Payment Received and waiting for processed</span>
                                :
                                <span className="text-info">Waiting for payment</span>}</td>
                    <td><button className="btn btn-info" onClick={() => {
                        this.setState({
                            order_id_chosen: val.id, status_chosen: val.status
                        }); this.getOrderDetails(val.id);
                    }}>More details</button></td>
                </tr>
            )
        })
    }

    render() {
        if (this.state.orderData) {
            return (
                <React.Fragment>
                    <div className="container my-5">
                        <div className="row">
                            <div className="col-lg-12 text-center">
                                <h1 className="mb-5"> My Orders </h1>
                            </div>
                            <div className="col-lg-12">
                                <Table hover>
                                    <thead>
                                        <tr>
                                            <th>No</th>
                                            <th>Order ID</th>
                                            <th>Price Total</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.displayOrders() || ""}
                                    </tbody>
                                </Table>
                            </div>
                        </div>
                    </div>
                    {this.modalDetails()}
                </React.Fragment>
            )
        }
        else {
            return (
                <React.Fragment>
                    <div className="container my-5">
                        <div className="row">
                            <div className="col-lg-12 text-center">
                                <h1 className="mb-5"> My Orders </h1>
                            </div>
                            <div className="col-lg-12">
                                <h3>Your orders is empty. Explore and shop <Link to="/shop">here</Link></h3>
                            </div>
                        </div>
                    </div>
                </React.Fragment>
            )
        }
    }
}

export default MyOrders;