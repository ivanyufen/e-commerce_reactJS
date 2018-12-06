import React from 'react';
import Breadcrumbs from './../components/Breadcrumbs';

class ConfirmPayment extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Breadcrumbs path={this.props.match.url} />
                <div className="container text-center">
                    <form className="border p-3 m-5">
                        <h3 className="text-uppercase">Confirm Payment</h3>
                        {/* <div className="sm-line"></div> */}
                        <div className="form-group">
                            <label for="exampleInputEmail1">Invoice Number</label>
                            <input type="text" className="form-control" id="invoice-no"
                                placeholder="Your Invoice Number.. " />
                        </div>
                        <div className="form-group">
                            <label for="exampleInputEmail1">Payment Date</label>
                            <input type="date" className="form-control" id="payment-date"
                                placeholder="Payment Date" />
                        </div>
                        <div className="form-group">
                            <label for="exampleInputEmail1">Bank Account Name</label>
                            <input type="text" className="form-control" id="invoice-no"
                                placeholder="Your Bank Account Name.." />
                        </div>
                        <div className="form-group">
                            <label for="proof-of-payment">Proof of Payment</label>
                            <input type="file" className="form-control-file" id="proof-of-payment" />
                        </div>
                        <button type="submit" className="btn btn-primary">Confirm Payment</button>
                    </form>
                </div>
            </React.Fragment>
        )
    }
}

export default ConfirmPayment;