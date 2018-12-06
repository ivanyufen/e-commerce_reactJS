import React from 'react'

class SmallNavbar extends React.Component {
    render() {
        return (
            <div className="container-fluid bg-dark">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-md-12 col-sm-12 row text-uppercase text-center">
                            <div className="col-lg-auto col-md-auto col-sm-auto ml-5">
                                <a href="" className="text-white fix-header" data-toggle="modal" data-target="#free-shipping-modal">
                                    <i className="fas fa-box-open mr-2"></i>
                                    <span>Free Shipping</span>
                                </a>
                            </div>
                            <div className="col-lg-auto col-md-auto col-sm-auto">
                                <a href="" className="text-white fix-header" data-toggle="modal" data-target="#high-quality-straps-modal" >
                                    <i className="far fa-thumbs-up mr-2"></i>
                                    <span>High Quality Straps</span>
                                </a>
                            </div>
                            <div className="col-lg-auto col-md-auto col-sm-auto">
                                <a href="" className="text-white fix-header" data-toggle="modal" data-target="#installment-modal" >
                                    <i className="far fa-credit-card mr-2"></i>
                                    <span>0% Installment</span>
                                </a>
                            </div>
                        </div>
                        <div className="col-lg-6 col-sm-12 text-lg-center p-1">
                            <span className="text-white">Welcome to Van & Co. The best watch strap in town!</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default SmallNavbar;