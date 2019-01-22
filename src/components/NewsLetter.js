import React from 'react'
import Modal from './Modal';

class NewsLetter extends React.Component {

    state = {
        emailUser: "",
        emailUserTemp: ""
    }

    onSubscribeClick = () => {
        this.setState({
            emailUser: ""
        });
    }

    displayModal() {
        return (
            <div className="modal fade" id="modalNewsletter" tabIndex="-1" role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="text-center p-3">
                            <div className="m-2 mb-1 text-success">
                                <span className="text-uppercase">
                                    <h3 className="d-inline ">Subscribe Success!</h3>
                                </span>
                            </div>
                            <img src="./img/logo.png" style={{ maxWidth: "75%" }} />
                            <br />
                            <div className="mb-3">
                                <p>Thank you for subscribing our newsletter!</p>
                                <p>You will receive updates whenever we launch a new product to email: <strong>{this.state.emailUserTemp}</strong> </p>
                            </div>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true"><small>Close</small> &times;</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    render() {
        return (
            <React.Fragment>
                <section className="section bg-dark my-4 p-4">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6 text-uppercase">
                                <h5 className="title text-white"><strong>Be the first</strong></h5>
                                <p className="text-light">Get the latest news, invites, and offers straight to your email.</p>
                            </div>
                            <div className="col-lg-6">
                                <input className="form-control-md mr-sm-2 mt-4 p-2" type="email" placeholder="Your Email Here.." value={this.state.emailUser} aria-label="email" onChange={(e) => { this.setState({ emailUser: e.target.value, emailUserTemp: e.target.value }) }} />
                                {(this.state.emailUser.includes('@') && this.state.emailUser.includes('.')) ?
                                    <button onClick={this.onSubscribeClick} className="btn btn-secondary my-2 my-sm-0 text-uppercase" type="button" data-toggle="modal" data-target="#modalNewsletter">Subscribe</button>
                                    :
                                    <button className="btn btn-secondary my-2 my-sm-0 text-uppercase" type="button">Subscribe</button>
                                }
                            </div>
                        </div>
                    </div>
                </section>

                {this.state.emailUserTemp ? this.displayModal() : <React.Fragment></React.Fragment>}



            </React.Fragment>
        )
    }
}

export default NewsLetter;