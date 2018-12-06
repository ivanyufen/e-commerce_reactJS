import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from './../components/Breadcrumbs';
import Faker from 'faker';

class FAQ extends React.Component {

    // supaya pagenya scroll keatas saat di klik
    componentDidMount() {
        window.scrollTo(0, 0);
    }

    render() {
        console.log(this.props.haha)
        return (
            <React.Fragment>
                <Breadcrumbs path={this.props.match.url} />
                <div className="container mb-5">

                    <h2 className="text-center">Frequently Asked Questions</h2>

                    <div class="accordion m-4 p-3" id="FAQAccordion">
                        <div class="card">
                            <div class="card-header" id="headingOne">
                                <h5 class="mb-0">
                                    <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                        Apakah itu Van & Co?
                                    </button>
                                </h5>
                            </div>

                            <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#FAQAccordion">
                                <div class="card-body">
                                    {Faker.lorem.paragraphs()}Van & Co adalah e-commerce penjual jam tangan nomer satu di Indonesia dengan lebih dari 3000 cabang offline serta penjualan lebih dari 500 items per hari.
                                </div>
                            </div>
                        </div>

                        <div class="card">
                            <div class="card-header" id="headingTwo">
                                <h5 class="mb-0">
                                    <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                        Apakah semua produk di website ini ready stock?
                                    </button>
                                </h5>
                            </div>

                            <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#FAQAccordion">
                                <div class="card-body">
                                    {Faker.lorem.paragraphs()}Ya, semua produk di website ini ready stock kecuali yang berlabel sold out.
                                </div>
                            </div>
                        </div>

                        <div class="card">
                            <div class="card-header" id="headingThree">
                                <h5 class="mb-0">
                                    <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                        Dimana saja cabang toko Van & Co?
                                    </button>
                                </h5>
                            </div>

                            <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#FAQAccordion">
                                <div class="card-body">
                                    {Faker.lorem.paragraphs()}Silakan buka halaman <Link to="/stores"><a href="">Our Stores</a></Link> untuk informasi seluruh offline store kami.
                                </div>
                            </div>
                        </div>
                        <div class="card">
                            <div class="card-header" id="headingFour">
                                <h5 class="mb-0">
                                    <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                                        Apakah Van & Co terpercaya?
                                    </button>
                                </h5>
                            </div>

                            <div id="collapseFour" class="collapse" aria-labelledby="headingFour" data-parent="#FAQAccordion">
                                <div class="card-body">
                                    {Faker.lorem.paragraphs()}
                                </div>
                            </div>
                        </div>
                        <div class="card">
                            <div class="card-header" id="headingFive">
                                <h5 class="mb-0">
                                    <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                                        Bagaimana cara membeli barang?
                                    </button>
                                </h5>
                            </div>

                            <div id="collapseFive" class="collapse" aria-labelledby="headingFive" data-parent="#FAQAccordion">
                                <div class="card-body">
                                    {Faker.lorem.paragraphs()}
                                </div>
                            </div>
                        </div>
                        <div class="card">
                            <div class="card-header" id="headingSix">
                                <h5 class="mb-0">
                                    <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseSix" aria-expanded="false" aria-controls="collapseSix">
                                        Bagaimana bila barang yang dikirim tidak sesuai?
                                    </button>
                                </h5>
                            </div>

                            <div id="collapseSix" class="collapse" aria-labelledby="headingSix" data-parent="#FAQAccordion">
                                <div class="card-body">
                                    {Faker.lorem.paragraphs()}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default FAQ;