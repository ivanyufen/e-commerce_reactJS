import React from 'react';
import Tabs from './../components/Tabs';
import { Tab } from 'semantic-ui-react';
import Rate from './../components/Rate';
import Breadcrumbs from './../components/Breadcrumbs';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import { Loader } from 'semantic-ui-react';

class ProductDetail extends React.Component {

    constructor() {
        super();
        this.state = {
            quantity: 1,
            data_product: {
                name: "",
                price: "",
                id_category: "",
                stock: "",
                description: "",
                size: "",
                location: "",
                photo: ""
            },
            isLoading: false,
            isPathRight: true
        }
    }

    componentDidMount() {
        this.setState({
            isLoading: true
        })
        let productID = this.props.match.params.productID;
        axios.get(`http://localhost:3007/products/${productID}`).then((x) => {
            if (x.data.length > 0) {
                this.setState({
                    data_product: x.data[0],
                    isLoading: false,
                    isPathRight: true
                });
            }
            else {
                //kalau path nya user ketik asal, kita direct ke halaman 404
                // this.props.history.push("/shop");
                this.props.history.push("/404");
            }

        })
    }

    loader() {
        return (
            <Loader size='large' active inline='centered' />
        )
    }

    displayProductDetails() {
        return (
            <React.Fragment>
                <Breadcrumbs path='/shop' />
                <div className="container">
                    <Link to="/shop/"><button className="btn btn-outline-secondary"><i class="fas fa-arrow-left"></i> Back to shop</button></Link>
                </div>
                <div className="container p-5 my-5">
                    <div className="row">
                        <div className="col-lg-3">
                            <img src={this.state.data_product.photo} alt="Product photo" />
                            {/* <img src="" style={{ width: "5rem", height: "10rem" }} alt="Product photo" />
                                <img src="" style={{ width: "5rem", height: "10rem" }} alt="Product photo" /> */}

                        </div>
                        <div className="col-lg-9">
                            <h1 className="my-3">{this.state.data_product.name} {this.state.data_product.size} mm</h1>
                            <Rate />
                            {/* <p className="text-muted"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i> 3 ulasan</p> */}
                            <h3 className="text-warning">Rp {this.state.data_product.price.toLocaleString()}</h3>
                            <div id="quantityCounter" className="my-5">
                                <p>Jumlah: </p>
                                <button type="button" style={{ background: "none", border: "none", cursor: "pointer" }} onClick={() => {
                                    this.setState({
                                        quantity: parseInt(this.state.quantity) - 1
                                    })
                                }}><i class="fas fa-minus-circle fa-lg"></i></button>
                                <input type="text" value={this.state.quantity} style={{ border: "none", borderBottom: "2px solid black", width: "5rem" }} onKeyPress={(e) => {
                                    var char = String.fromCharCode(e.which); if (!(/[0-9]/.test(char))) {
                                        e.preventDefault();
                                    }
                                }
                                } onChange={(e) => { this.setState({ quantity: e.target.value }) }} />
                                <button type="button" style={{ background: "none", border: "none", cursor: "pointer" }} onClick={() => {
                                    this.setState({
                                        quantity: parseInt(this.state.quantity) + 1
                                    })
                                }}><i class="fas fa-plus-circle fa-lg"></i></button>
                            </div>
                            <div id="shipping">
                                <p><i class="fas fa-truck"></i> Pengiriman dari: <span className="text-muted">{this.state.data_product.location}</span></p>
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

    render() {
        return (
            <React.Fragment>
                {this.state.isLoading ? this.loader() : this.displayProductDetails()}
            </React.Fragment>
        )
    }
}


export default ProductDetail;