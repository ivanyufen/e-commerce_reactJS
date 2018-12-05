import React from 'react'

class SmallNavbar extends React.Component {
    render() {
        return (
            <div class="container-fluid bg-dark">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-6 col-md-12 col-sm-12 row text-uppercase text-center">
                            <div class="col-lg-auto col-md-auto col-sm-auto ml-5">
                                <a href="" class="text-white fix-header" data-toggle="modal" data-target="#modal1">
                                    <i class="fas fa-box-open"></i>
                                    <span>Free Shipping</span>
                                </a>
                            </div>
                            <div class="col-lg-auto col-md-auto col-sm-auto">
                                <a href="#" class="text-white fix-header" data-toggle="modal" data-target="#modal2" >
                                    <i class="far fa-thumbs-up"></i>
                                    <span>High Quality Straps</span>
                                </a>
                            </div>
                            <div class="col-lg-auto col-md-auto col-sm-auto">
                                <a href="#" class="text-white fix-header" data-toggle="modal" data-target="#modal3" >
                                    <i class="far fa-credit-card"></i>
                                    <span>0% Installment</span>
                                </a>
                            </div>
                        </div>
                        <div class="col-lg-6 col-sm-12 text-lg-center p-1">
                            <span class="text-white">Welcome to Van & Co. The best watch strap in town!</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default SmallNavbar;