import React from 'react';
import { Link } from 'react-router-dom';

class Footer extends React.Component {
    render() {
        return (
            <footer className="bg-dark text-white" style={{ paddingTop: "75px", paddingBottom: "32px" }}>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-6 col-lg-4">

                            <h4 className="stext-301 cl0 p-b-30 text-uppercase">Straps</h4>

                            <ul style={{ padding: "0" }}>
                                <li>
                                    <a href="">Leather</a>
                                </li>

                                <li>
                                    <a href="">Nylon</a>
                                </li>

                                <li>
                                    <a href="">Rubber</a>
                                </li>
                            </ul>
                        </div>

                        <div className="col-sm-6 col-lg-4">
                            <h4 className="text-uppercase">Help</h4>

                            <ul style={{ padding: "0" }}>
                                <li>
                                    <a href="">Track Order</a>
                                </li>

                                <li>
                                    <a href="">Returns</a>
                                </li>

                                <li>
                                    <a href="">Shipping</a>
                                </li>

                                <li>
                                    <Link to="/faq">
                                        <a href="">FAQs</a>
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <div className="col-sm-6 col-lg-4" style={{ paddingBottom: "50px" }}>
                            <h4 className="text-uppercase">Other</h4>
                            <Link to="/joinUs">
                                <a href="" style={{ paddingBottom: "30px" }}>Join Us</a>
                            </Link>
                            <br />
                            <a href="">Terms and Conditions</a>
                            <br />
                            <a href="" style={{ paddingBottom: "30px" }}>Our Story</a>
                            <br />
                            <br />
                            <br />

                            <p>
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

                            <div style={{ paddingTop: "27px" }}>
                                <a href="" href="https://www.facebook.com/ivanyufen" target="_blank" rel="noopener noreferrer">
                                    <span className="fa-stack fa-lg">
                                        <i className="fas fa-circle fa-stack-2x"></i>
                                        <i className="fab fa-facebook-f fa-stack-1x text-white"></i>
                                    </span>
                                </a>
                                <a href="" href="http://www.instagram.com/ivanyufen" target="_blank" rel="noopener noreferrer">
                                    <span className="fa-stack fa-lg">
                                        <i className="fas fa-circle fa-stack-2x"></i>
                                        <i className="fab fa-instagram fa-stack-1x text-white"></i>
                                    </span>
                                </a>
                                <a href="" href="http://www.twitter.com/ivanyufen" target="_blank" rel="noopener noreferrer">
                                    <span className="fa-stack fa-lg">
                                        <i className="fas fa-circle fa-stack-2x"></i>
                                        <i className="fab fa-twitter fa-stack-1x text-white"></i>
                                    </span>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="text-center" style={{ paddingTop: "40px" }}>
                        <div className="flex-c-m flex-w p-b-18">
                            <a href="" >
                                <img src="./img/icons/icon-pay-01.png" alt="ICON-PAY" />
                            </a>
                            <a href="" >
                                <img src="./img/icons/icon-pay-02.png" alt="ICON-PAY" />
                            </a>
                            <a href="" >
                                <img src="./img/icons/icon-pay-03.png" alt="ICON-PAY" />
                            </a>
                            <a href="" >
                                <img src="./img/icons/icon-pay-04.png" alt="ICON-PAY" />
                            </a>
                            <a href="" >
                                <img src="./img/icons/icon-pay-05.png" alt="ICON-PAY" />
                            </a>
                        </div>

                        <p className="text-center">Copyright &copy; <script>document.write(new Date().getFullYear());</script> All rights reserved | Van & Co.
                        </p>

                    </div>
                </div>


            </footer>

        )
    }
}

export default Footer;