import React from 'react'
import Modal from './Modal';

class NewsLetter extends React.Component {

    constructor() {
        super();
        this.state = {
            emailUser: "",
            emailUserTemp: ""
        }
    }

    onSubscribeClick = () => {
        this.setState({
            emailUser: "",
            emailUserTemp: this.state.emailUser,
        })
    }

    render() {
        return (
            <section className="section bg-dark my-4 p-4">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 text-uppercase">
                            <h5 className="title text-white"><strong>Be the first</strong></h5>
                            <p className="text-light">Get the latest news, invites, and offers straight to your email.</p>
                        </div>
                        <div className="col-lg-6">
                            <input className="form-control-md mr-sm-2 mt-4 p-2" type="email" placeholder="Your Email Here.." value={this.state.emailUser} aria-label="email" onChange={(e) => { this.setState({ emailUser: e.target.value }) }} />
                            {this.state.emailUser ? <button onClick={this.onSubscribeClick} className="btn btn-secondary my-2 my-sm-0 text-uppercase" type="button" data-toggle="modal" data-target="#modalNewsletter">Subscribe</button> : <button className="btn btn-secondary my-2 my-sm-0 text-uppercase" type="button">Subscribe</button>}
                        </div>
                    </div>
                </div>

                <Modal email={this.state.emailUserTemp} />
            </section>

        )
    }
}

export default NewsLetter;