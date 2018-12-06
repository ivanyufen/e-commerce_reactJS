import React from 'react'

class SocialFeed extends React.Component {
    render() {
        return (
            <section className="section my-5">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <img className="logo" src="./img/ig-logo.png" />
                            <h2 className="text-center text-uppercase mt-3">Our Social Feed</h2>
                        </div>
                        <div className="sm-line"></div>
                    </div>

                    <div className="row my-3" id="instafeed">

                    </div>
                    {/* <div className="row">
                        <div className="col-lg-12">
                            <img className="logo" src="./img/ig-logo.png" />
                            <h2 className="text-center text-uppercase mt-3">Our Social Feed</h2>
                        </div>
                        <div className="sm-line"></div>
                    </div>
                    <div className="row my-3 socialfeedlg">
                        <div className="col-lg-3 socialfeed">
                            <img src="./img/socialfeed/ig-1.JPG" />
                            <div className="overlay"></div>
                        </div>
                        <div className="col-lg-3 socialfeed">
                            <img src="./img/socialfeed/ig-2.JPG" />
                            <div className="overlay"></div>
                        </div>
                        <div className="col-lg-3 socialfeed">
                            <img src="./img/socialfeed/ig-3.JPG" />
                            <div className="overlay"></div>
                        </div>
                        <div className="col-lg-3 socialfeed">
                            <img src="./img/socialfeed/ig-4.JPG" />
                            <div className="overlay"></div>
                        </div>
                    </div>
                    <div className="row my-3 socialfeedlg">
                        <div className="col-lg-3 socialfeed">
                            <img src="./img/socialfeed/ig-5.JPG" />
                            <div className="overlay"></div>
                        </div>
                        <div className="col-lg-3 socialfeed">
                            <img src="./img/socialfeed/ig-6.JPG" />
                            <div className="overlay"></div>
                        </div>
                        <div className="col-lg-3 socialfeed">
                            <img src="./img/socialfeed/ig-7.JPG" />
                            <div className="overlay"></div>
                        </div>
                        <div className="col-lg-3 socialfeed">
                            <img src="./img/socialfeed/ig-8.JPG" />
                            <div className="overlay"></div>
                        </div>
                    </div> */}
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="text-center">
                                <a href="" href="https://www.instagram.com/ivanyufen" target="_blank" rel="noopener noreferrer" className="btn btn-primary">I want to
                            see more!</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default SocialFeed;