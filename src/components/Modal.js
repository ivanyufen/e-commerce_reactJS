import React from 'react';

class Modal extends React.Component {
    render() {
        return (
            <React.Fragment>
                {/* Modal for Small Navbar Component */}
                <div className="modal fade" id="free-shipping-modal" tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="text-center p-3">
                                <div className="m-2 mb-1 text-warning">
                                    <i className="fas fa-box-open"></i>
                                    <span className="text-uppercase">
                                        <h5 className="d-inline">Free Shipping</h5>
                                    </span>
                                    <img src="./img/small navbar/shipping.png" style={{ maxWidth: 100, maxHeight: 100, display: "block", margin: "0 auto", marginTop: "20px" }} />
                                </div>
                                <br />
                                <div className="m-4">
                                    <p>We offer free shipping to every city in Indonesia.</p>
                                    <small>Spend above IDR 1.000.000 and enjoy free regular delivery service (
                                        Regular - 3 to 5 days)
                                        Spend above IDR 3.000.000 and enjoy free express delivery service (
                                        YES - 1 to 2 days)

                            Note: For some cities, express delivery option is not available </small>
                                </div>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true"><small>Close</small> &times;</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="modal fade" id="high-quality-straps-modal" tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="text-center p-3">
                                <div className="m-2 mb-1 text-warning">
                                    <i className="far fa-thumbs-up"></i>
                                    <span className="text-uppercase">
                                        <h5 className="d-inline">High Quality Straps</h5>
                                    </span>
                                    <img src="./img/small navbar/straps.jpg" style={{ maxWidth: 250, maxHeight: 250, display: "block", margin: "0 auto", marginTop: "20px" }} />
                                </div>
                                <br />
                                <div className="m-4">
                                    <p>We only sell high quality watch strap.</p>
                                    <small>Whatever it is: nylon, leather, or rubber, it's made from high quality material that last for years. Our new technology to prevent smell of sweat in your daily activities
                                        ensure the strap free of bacteria.
                                    </small>
                                </div>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true"><small>Close</small> &times;</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="modal fade" id="installment-modal" tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="text-center p-3">
                                <div className="m-2 mb-1 text-warning">
                                    <i className="far fa-credit-card"></i>
                                    <span className="text-uppercase">
                                        <h5 className="d-inline">0% Installment</h5>
                                    </span>
                                    <img src="./img/small navbar/cc.png" style={{ maxWidth: 100, maxHeight: 100, display: "block", margin: "0 auto", marginTop: "20px" }} />
                                </div>
                                <br />
                                <div className="m-4">
                                    <p>Plan to have a payment with credit card?</p>
                                    <small>Worry not. We provide secure and free of installment charge if you intend to pay with credit card. There's also a program for 3, 6, and 12 months installment
                            with BCA and Mandiri credit card.  </small>
                                </div>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true"><small>Close</small> &times;</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>


            </React.Fragment>
        )
    }
}

export default Modal;