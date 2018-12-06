import React from 'react';
import Breadcrumbs from './../components/Breadcrumbs';

class JoinUs extends React.Component {

    // supaya pagenya scroll keatas saat di klik
    componentDidMount() {
        window.scrollTo(0, 0);
    }

    render() {
        return (
            <React.Fragment>
                <Breadcrumbs path={this.props.match.url} />
                <section className="section">
                    <div className="container join-form">
                        <h2 className="title">Submit your CV</h2>
                        <p className="lead">We are currently opening positions for sales and admin trainee.</p>
                        <form className="m-4">
                            <div className="form-group">
                                <label for="exampleFormControlSelect1">Apply for position</label>
                                <select className="form-control" id="exampleFormControlSelect1">
                                    <option value="" disabled selected>Select option</option>
                                    <option>Sales</option>
                                    <option>Trainee</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label for="name">Your Name</label>
                                <input type="text" id="name" className="form-control" placeholder="Your Name" />
                            </div>
                            <div className="row">
                                <div className="col-lg-6">
                                    <label for="email">Email</label>
                                    <input type="email" id="email" className="form-control" placeholder="Your Email" />
                                </div>
                                <div className="col-lg-6">
                                    <label for="phoneno">Phone Number</label>
                                    <input type="text" id="phoneno" className="form-control" placeholder="Your Phone Number" />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-6">
                                    <label for="dateofbirth">Date of birth</label>
                                    <input type="date" id="dateofbirth" className="form-control" placeholder="Date of birth" />
                                </div>
                                <div className="col-lg-6">
                                    <label for="placeofbirth">Place of birth</label>
                                    <input type="text" id="placeofbirth" className="form-control" placeholder="Place of birth" />
                                </div>
                            </div>
                            <div className="form-group">
                                <label for="address">Address</label>
                                <textarea className="form-control text-dark" id="address" rows="5" placeholder="Address"></textarea>
                            </div>
                            <div className="form-group">
                                <div className="row">
                                    <div className="col-lg-6">
                                        <label for="idCard">ID Card</label>
                                        <input type="file" className="form-control-file" id="idCard" />
                                    </div>
                                    <div className="col-lg-6">
                                        <label for="schoolSertif">Last school certificate</label>
                                        <input type="file" className="form-control-file" id="schoolSertif" />
                                    </div>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary">Submit CV</button>
                        </form>
                    </div>
                </section>
            </React.Fragment>
        )
    }
}

export default JoinUs;