import React from 'react'

class NewsLetter extends React.Component {
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
                            <input className="form-control-md mr-sm-2 mt-4" type="email" placeholder="Your Email Here.." aria-label="email" />
                            <button className="btn btn-secondary my-2 my-sm-0 text-uppercase" type="submit">Subscribe</button>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default NewsLetter;