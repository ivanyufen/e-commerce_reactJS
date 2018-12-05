import React from 'react';

class Contact extends React.Component {
    render() {
        return (
            <React.Fragment>
                <section id="contact" className="my-5">
                    <div class="container">
                        <div class="row">
                            <div class="col-lg-6">
                                <h2>Contact us</h2>
                                <p id="emailHelp" class="form-text">Feel free to contact us for any inquiries on: </p>
                                <span>
                                    <i class="fas fa-map-marker-alt"></i>
                                    <span class="lead inl"> &ensp; Address</span>
                                </span>
                                <p class="lnhei">Perumahan Taman Mahkota blok. C2 no. 7-8, Jln. Husein Sastranegara, <br /> Bokor,
                                    Benda, Tangerang </p>

                                <span>
                                    <i class="fas fa-phone"></i>
                                    <span class="lead inl">&ensp; Phone</span>
                                </span>
                                <p>(+62) 812-1344-7582</p>
                                <span>
                                    <i class="far fa-envelope"></i>
                                    <span class="lead inl">&ensp; Email</span>
                                </span>
                                <p><a href="mailto:vanandco@gmail.com?Subject=Hello%20again" target="_top">vanandco@gmail.com</a></p>
                            </div>

                            <div class="col-lg-6 col-sm-12 mx-auto">
                                <h2 class="text-center">Send us a message</h2>
                                <form class="border p-3 m-5">
                                    <div class="form-group">
                                        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                                            placeholder="Your Email address" />
                                    </div>
                                    <div class="form-group">
                                        <textarea class="form-control text-dark" rows="5" placeholder="How can we help?"></textarea>
                                    </div>
                                    <button type="submit" class="btn btn-primary btn-block">Send</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>

                <div class="google-maps">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.401605694459!2d106.82010061534095!3d-6.210644795504063!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3e324564963%3A0xb876e32ffae855e4!2sSinarmas+MSIG+Tower!5e0!3m2!1sid!2sid!4v1543475789763"
                        width="600" height="450" frameborder="0" style={{ border: "0" }} allowfullscreen></iframe>
                </div>
            </React.Fragment>

        )
    }
}

export default Contact;