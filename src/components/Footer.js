import React from 'react';
import { Link } from 'react-router-dom';

class Footer extends React.Component {
    render() {
        return (
            <footer class="bg-dark text-white p-t-75 p-b-32">
                <div className="container">
                    <div className="row">
                        <div class="col-sm-6 col-lg-4 p-b-50">
                            <h4 class="stext-301 cl0 p-b-30 text-uppercase">
                                Straps
                        </h4>
                            <ul class="p-0">
                                <li class="p-b-10">
                                    <a href="#" class="stext-107 cl7 hov-cl1 trans-04">
                                        Leather
                                </a>
                                </li>

                                <li class="p-b-10">
                                    <a href="#" class="stext-107 cl7 hov-cl1 trans-04">
                                        Nylon
                                </a>
                                </li>

                                <li class="p-b-10">
                                    <a href="#" class="stext-107 cl7 hov-cl1 trans-04">
                                        Rubber
                                </a>
                                </li>
                            </ul>
                        </div>

                        <div class="col-sm-6 col-lg-4 p-b-50">
                            <h4 class="stext-301 cl0 p-b-30 text-uppercase">
                                Help
                            </h4>

                            <ul class="p-0">
                                <li class="p-b-10">
                                    <a href="#" class="stext-107 cl7 hov-cl1 trans-04">
                                        Track Order
                                    </a>
                                </li>

                                <li class="p-b-10">
                                    <a href="#" class="stext-107 cl7 hov-cl1 trans-04">
                                        Returns
                                    </a>
                                </li>

                                <li class="p-b-10">
                                    <a href="#" class="stext-107 cl7 hov-cl1 trans-04">
                                        Shipping
                                    </a>
                                </li>

                                <li class="p-b-10">
                                    <a href="#" class="stext-107 cl7 hov-cl1 trans-04">
                                        FAQs
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div class="col-sm-6 col-lg-4 p-b-50">
                            <h4 class="stext-301 cl0 p-b-30 text-uppercase">
                                Other
                            </h4>
                            <Link to="/joinUs"><a href="" class="cl0 p-b-30">
                                Join Us
                            </a>
                            </Link>
                            <br />
                            <a href="#" class="cl0 p-b-30">
                                Terms and Conditions
                            </a>
                            <br />
                            <a href="#" class="cl0 p-b-30">
                                Our Story
                            </a>
                            <br />
                            <br />
                            <br />

                            <p class="cl7 size-201">
                                Van & Co "design your watch"
                                <br />
                                Most Complete Handmade
                                Watch Straps
                                <br />
                                Jakarta, Indonesia
                                <br />
                                Whatsapp : +6281213447582
                                <br />
                                Email: vanandco@gmail.com
                            </p>

                            <div class="p-t-27">
                                <a href="https://www.facebook.com/ivanyufen" target="_blank">
                                    <span class="fa-stack fa-lg">
                                        <i class="fas fa-circle fa-stack-2x"></i>
                                        <i class="fab fa-facebook-f fa-stack-1x text-white"></i>
                                    </span>
                                </a>
                                <a href="http://www.instagram.com/ivanyufen" target="_blank">
                                    <span class="fa-stack fa-lg">
                                        <i class="fas fa-circle fa-stack-2x"></i>
                                        <i class="fab fa-instagram fa-stack-1x text-white"></i>
                                    </span>
                                </a>
                                <a href="http://www.twitter.com/ivanyufen" target="_blank">
                                    <span class="fa-stack fa-lg">
                                        <i class="fas fa-circle fa-stack-2x"></i>
                                        <i class="fab fa-whatsapp fa-stack-1x text-white"></i>
                                    </span>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="p-t-40 text-center">
                        <div className="flex-c-m flex-w p-b-18">
                            <a href="#">
                                <img src="./img/icons/icon-pay-01.png" alt="ICON-PAY" />
                            </a>
                            <a href="#">
                                <img src="./img/icons/icon-pay-02.png" alt="ICON-PAY" />
                            </a>
                            <a href="#">
                                <img src="./img/icons/icon-pay-03.png" alt="ICON-PAY" />
                            </a>
                            <a href="#">
                                <img src="./img/icons/icon-pay-04.png" alt="ICON-PAY" />
                            </a>
                            <a href="#">
                                <img src="./img/icons/icon-pay-05.png" alt="ICON-PAY" />
                            </a>
                        </div>
                        <p class="cl6 text-center">Copyright &copy; <script>document.write(new Date().getFullYear());</script> All rights reserved | Van & Co.
                    </p>
                    </div>
                </div>


            </footer>

        )
    }
}

export default Footer;