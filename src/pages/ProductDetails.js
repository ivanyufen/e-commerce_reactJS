import React from 'react';
import Tabs from './../components/Tabs';
import { Tab } from 'semantic-ui-react';
import Rate from './../components/Rate';
import Breadcrumbs from './../components/Breadcrumbs';

class ProductDetail extends React.Component {

    constructor() {
        super();
        this.state = {
            quantity: 1
        }
    }

    render() {
        return (
            <React.Fragment>
                <Breadcrumbs path={this.props.match.url} />
                <div className="container p-5 my-5">
                    <div className="row">
                        <div className="col-lg-3">
                            <img src="" style={{ width: "20rem", height: "35rem" }} alt="Product photo" />
                            <img src="" style={{ width: "5rem", height: "10rem" }} alt="Product photo" />
                            <img src="" style={{ width: "5rem", height: "10rem" }} alt="Product photo" />

                        </div>
                        <div className="col-lg-9">
                            <h1 className="my-3">Timex Waterbury Indiglo Original</h1>
                            <Rate />
                            {/* <p className="text-muted"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i> 3 ulasan</p> */}
                            <h3 className="text-warning">Rp 950.000</h3>
                            <div id="quantityCounter" className="my-5">
                                <p>Jumlah: </p>
                                <button type="button" style={{ background: "none", border: "none", cursor: "pointer" }} onClick={() => { this.setState({ quantity: this.state.quantity - 1 }) }}><i class="fas fa-minus-circle fa-lg"></i></button>
                                <input type="number" value={this.state.quantity} style={{ border: "none", borderBottom: "2px solid black", width: "5rem" }} />
                                <button type="button" style={{ background: "none", border: "none", cursor: "pointer" }} onClick={() => { this.setState({ quantity: this.state.quantity + 1 }) }}><i class="fas fa-plus-circle fa-lg"></i></button>
                            </div>
                            <div id="shipping">
                                <p><i class="fas fa-truck"></i> Pengiriman dari: <span className="text-muted">DKI Jakarta</span></p>
                            </div>
                            <form className="form-inline my-4">
                                <div id="notesForSeller" className="form-group">
                                    <label for="notes">Catatan untuk pengirim: &nbsp;</label>
                                    <input type="text" id="notes" placeholder="Catatan (misal: warna merah, packing kayu)" className="form-control" style={{ width: "25rem" }} />
                                </div>
                            </form>

                            <a href="#" className="btn btn-warning mx-3"><i className="fas fa-cart-plus"></i>Add to cart</a>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-12">
                            <Tabs />
                        </div>
                    </div>
                </div>
            </React.Fragment >
        )
    }
}


export default ProductDetail;