import React from 'react';
import Tabs from './../components/Tabs';
import { Tab } from 'semantic-ui-react';
import Rate from './../components/Rate';
import Breadcrumbs from './../components/Breadcrumbs';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import { Loader } from 'semantic-ui-react';
import ModalCart from './../components/ModalCart';

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
            photoShown: "",
            isLoading: false,
            isPathRight: true,
            modal: false,
            dataCartTemp: ""
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
                    photoShown: x.data[0].photo,
                    photoShown2: x.data[0].photo2,
                    photoShown3: x.data[0].photo3,
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

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    loader() {
        return (
            <Loader size='large' active inline='centered' />
        )
    }

    addToCart = (id_product, name, image, size) => {
        // ini untuk dioper ke modal datanya
        var dataCartTemp = {
            name: name,
            image: image,
            size: size
        }
        this.setState({
            dataCartTemp: dataCartTemp
        });
        // sampai sini

        axios.post('http://localhost:3007/cart', {
            id_user: this.props.id_user,
            id_product: id_product,
            quantity: this.state.quantity,
        }).then((x) => {
            console.log(x);
        }).catch(() => {
            console.log("Error post");
        })
    }

    displayProductDetails() {
        return (
            <React.Fragment>
                <Breadcrumbs path='/shop' />

                <div className="container">
                    {/* kenapa memakai window.history.back, supaya ttp maintain posisi scroll user terakhir */}
                    <button onClick={() => { window.history.back() }} className="btn btn-outline-secondary"><i class="fas fa-arrow-left"></i> Back to shop</button>
                </div>
                <div className="container p-5 my-5">
                    <div className="row">
                        <div className="col-lg-3">
                            <img src={this.state.photoShown} className="productImage" style={{ transition: "transform .2s" }} alt="Product photo" />
                            <img src={this.state.data_product.photo} className="subProductImage" alt="Product photo" onClick={() => {
                                this.setState({
                                    photoShown: this.state.data_product.photo
                                })
                            }} />

                            {this.state.data_product.photo2 ?
                                <img src={this.state.data_product.photo2} className="subProductImage" alt="Product photo" onClick={() => {
                                    this.setState({
                                        photoShown: this.state.data_product.photo2
                                    })
                                }} />
                                :
                                <span></span>}

                            {this.state.data_product.photo3 ?
                                <img src={this.state.data_product.photo3} className="subProductImage" alt="Product photo" onClick={() => {
                                    this.setState({
                                        photoShown: this.state.data_product.photo3
                                    })
                                }} />
                                :
                                <span></span>}

                        </div>
                        <div className="col-lg-9">
                            {/* Product name and size */}
                            <h1 className="my-3">{this.state.data_product.name} {this.state.data_product.size} mm</h1>

                            {/* Rating */}
                            {/* <Rate /> */}
                            {/* <p className="text-muted"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i> 3 ulasan</p> */}

                            {/* Price */}
                            <h3 className="text-warning">Rp {this.state.data_product.price.toLocaleString()}</h3>

                            {/* Quantity */}
                            <div id="quantityCounter" className="my-5">
                                <p>Jumlah: </p>
                                <button type="button" style={{ background: "none", border: "none", cursor: "pointer" }} onClick={(e) => {
                                    if (this.state.quantity <= 1) {
                                        this.setState({
                                            quantity: 1
                                        })
                                    }
                                    else {
                                        this.setState({
                                            quantity: parseInt(this.state.quantity) - 1
                                        })
                                    }
                                }}><i class="fas fa-minus-circle fa-lg"></i></button>

                                <input type="text" value={this.state.quantity} style={{ border: "none", borderBottom: "2px solid black", width: "5rem" }}
                                    onKeyPress={(e) => {
                                        var char = String.fromCharCode(e.which); if (!(/[0-9]/.test(char))) {
                                            e.preventDefault();
                                        }
                                    }} onChange={(e) => {
                                        if (this.state.quantity < 1) {
                                            this.setState({
                                                quantity: 1
                                            })
                                        }
                                        else {
                                            this.setState({ quantity: e.target.value })
                                        }

                                    }}
                                    onKeyDown={(e) => {
                                        if (e.key == 0 && this.state.quantity == "") {
                                            e.preventDefault();
                                            this.setState({
                                                quantity: 1
                                            })
                                        }
                                    }} />

                                <button type="button" style={{ background: "none", border: "none", cursor: "pointer" }} onClick={() => {
                                    this.setState({
                                        quantity: parseInt(this.state.quantity) + 1
                                    })
                                }}><i class="fas fa-plus-circle fa-lg"></i></button>
                            </div>

                            {/* Shipping */}
                            <div id="shipping">
                                <p><i class="fas fa-truck"></i> Pengiriman dari: <span className="text-muted">{this.state.data_product.location}</span></p>
                            </div>

                            {/* Notes for seller */}
                            <form className="form-inline my-4">
                                <div id="notesForSeller" className="form-group">
                                    <label for="notes">Catatan untuk pengirim: &nbsp;</label>
                                    <input type="text" id="notes" placeholder="Catatan (misal: warna merah, packing kayu)" className="form-control" style={{ width: "25rem" }} />
                                </div>
                            </form>

                            {/* Add to cart */}
                            <div>
                                <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); this.toggle(); this.addToCart(this.state.data_product.id, this.state.data_product.name, this.state.data_product.photo, this.state.data_product.size) }} className="btn btn-warning mx-3"><i className="fas fa-cart-plus"></i>Add to cart</button>
                            </div>

                        </div>
                    </div>

                    <div className="row my-5">
                        <div className="col-lg-12">
                            <Tabs productDescription={this.state.data_product.description} productSize={this.state.data_product.size} productColor={this.state.data_product.name.split(" ")[2]} />
                        </div>
                    </div>
                </div>

                <ModalCart modal={this.state.modal} toggle={this.toggle} data={this.state.dataCartTemp ? this.state.dataCartTemp : "null"} />
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