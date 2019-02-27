import React from 'react';
import Breadcrumbs from './../components/Breadcrumbs';
import Faker from 'faker';
import ProductDetails from './ProductDetails';
import { Link, NavLink } from 'react-router-dom';
import ProductCard from './../components/ProductCard';
import axios from 'axios';
import { Dimmer, Loader, Image, Segment } from 'semantic-ui-react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { relative } from 'path';

class ProductList extends React.Component {

    constructor() {
        super();
        this.state = {
            products: [],
            isLoading: true,
            isViewMore: false,
            cart: 0,
            data_products: "",
            data_productsShown: "",
            init: 0,
            size: 12,
            hasMore: true,
            isDone: false,
            filter: [],
            search: "",
            dataNotFoundMsg: ""
        }
    }

    loadProducts = (sort) => {
        this.setState({
            init: 0,
            size: 12
        });
        axios.get('http://localhost:3007/products').then((x) => {
            if (sort == 'typeStrap') {
                this.setState({
                    data_products: x.data,
                    data_productsShown: x.data.slice(this.state.init, this.state.size),
                    isLoading: false
                });
            }

            else if (sort == 'lowestPrice') {
                var hasil = x.data.sort((a, b) => {
                    return a.price - b.price
                });
                this.setState({
                    data_products: hasil,
                    data_productsShown: hasil.slice(this.state.init, this.state.size),
                    isLoading: false
                })
            }

            else if (sort == 'highestPrice') {
                var hasil = x.data.sort((a, b) => {
                    return b.price - a.price
                });
                this.setState({
                    data_products: hasil,
                    data_productsShown: hasil.slice(this.state.init, this.state.size),
                    isLoading: false
                })
            }

            else if (sort == 'alphabet') {
                var hasil = x.data.sort((a, b) => {
                    if (a.name == b.name) {
                        return 0;
                    }
                    else if (a.name < b.name) {
                        return -1;
                    }
                    else {
                        return 1;
                    }
                });

                this.setState({
                    data_products: hasil,
                    data_productsShown: hasil.slice(this.state.init, this.state.size),
                    isLoading: false
                })
            }
            else if (this.state.filter != "") {
                this.setState({
                    search: ""
                })
                var result = [];

                for (var i = 0; i < this.state.filter.length; i++) {
                    var hasil = x.data.filter((val) => {
                        if (val.name.includes(`${this.state.filter[i]}`)) {
                            // console.log(val);
                            result.push(val);
                            return val;

                        }
                    })
                    console.log(result)
                }


                this.setState({
                    data_products: result,
                    data_productsShown: hasil.slice(this.state.init, this.state.size),
                    isLoading: false
                });

            }
            else if (this.state.search !== "") {
                this.setState({
                    dataNotFoundMsg: ""
                });
                // let search = this.state.search.toLowerCase();
                var hasil = x.data.filter((val) => {
                    // if (val.name.includes(`${this.state.search}`)) {
                    return val.name.includes(`${this.state.search}`)
                    // }
                })

                if (hasil.length != 0) {
                    this.setState({
                        data_products: hasil,
                        data_productsShown: hasil.slice(this.state.init, this.state.size),
                        isLoading: false,
                        search: ""
                    });
                }
                else {
                    this.setState({
                        dataNotFoundMsg: "Produk tidak ditemukan",
                        data_products: "hasil",
                        data_productsShown: hasil.slice(this.state.init, this.state.size),
                        isLoading: false,
                        search: ""
                    });
                }
            }
            else {
                this.setState({
                    data_products: x.data,
                    data_productsShown: x.data.slice(this.state.init, this.state.size),
                    isLoading: false
                });
            }
        });
    }


    componentDidMount() {
        this.loadProducts();
    }

    fetchMoreData = () => {
        this.setState({
            init: this.state.size,
            size: this.state.size + 12,
            isViewMore: true
        });

        setTimeout(() => {
            this.setState({
                data_productsShown: this.state.data_productsShown.concat(...this.state.data_products.slice(this.state.init, this.state.size)),
            });
            this.setState({
                isDone: this.state.data_productsShown.length == this.state.data_products.length,
                isViewMore: false
            });
        }, 500);
    };

    loader() {
        return (
            <Loader size='large' active inline='centered' />
        )
    }


    showProducts = () => {
        if (this.state.isLoading == false) {
            return this.state.data_productsShown.map((val, index) => {
                return (
                    <ProductCard
                        id_user={this.props.id_user}
                        id={val.id}
                        image={val.photo}
                        name={val.name}
                        price={val.price}
                        categoryName={val.category_name}
                        location={val.location}
                        description={val.description}
                        size={val.size}
                        index={index}
                        getCartData={this.props.getCartData} />
                );
            });
        }
    };


    render() {
        return (
            <React.Fragment>
                <Breadcrumbs path={this.props.match.url} />

                <div className="container mb-5">
                    <div className="row">
                        <div className="col-lg-3 pt-2">
                            <div class="card border border-dark" style={{ width: "18rem", position: "sticky", top: 100, bottom: 100 }}>
                                <div class="card-body">
                                    <ul class="list-group list-group-flush">
                                        {/* KATEGORI */}
                                        <li class="list-group-item">
                                            <h5 class="card-title">Kategori</h5>
                                            <div class="accordion" id="accordionExample">
                                                <div class="card">
                                                    <div class="card-header" id="headingOne">
                                                        <h5 class="mb-0">
                                                            <p class="" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                                Mainan dan hobi <i class="fas fa-sort-up"></i>
                                                            </p>
                                                        </h5>
                                                    </div>

                                                    <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                                                        <div class="card-body border-light">
                                                            Mainan Beroda  <i class="fas fa-sort-down"></i>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>

                                        {/* CARI KATEGORI */}
                                        <li class="list-group-item">
                                            <h5 class="card-title">Cari</h5>
                                            <div class="input-group">
                                                <input type="text" class="form-control" value={this.state.search} placeholder="Cari.." onChange={(e) => {
                                                    this.setState({ search: e.target.value })
                                                }} />
                                                <span class="input-group-btn">
                                                    <button class="btn btn-default border-light" type="button" onClick={() => { this.loadProducts(); }}><i class="fas fa-search"></i></button>
                                                </span>
                                            </div>
                                        </li>

                                        {/* HARGA */}
                                        <li class="list-group-item">
                                            <h5 class="card-title">Harga</h5>
                                            <div class="input-group mb-3">
                                                <div class="input-group-prepend">
                                                    <div class="input-group-text">Rp</div>
                                                </div>
                                                <input type="text" class="form-control placeholder-right" placeholder="Minimum" />
                                            </div>
                                            <div class="input-group">
                                                <div class="input-group-prepend">
                                                    <div class="input-group-text">Rp</div>
                                                </div>
                                                <input type="text" class="form-control placeholder-right" placeholder="Maximum" />
                                            </div>
                                        </li>

                                        {/* Size */}
                                        <label for="size">Size </label>
                                        <select class="mx-1" style={{ padding: "10px 20px" }} id="size">
                                            <option selected disabled hidden>Select your size..</option>
                                            <option value="18">18 mm</option>
                                            <option value="20">20 mm</option>
                                            <option value="22">22 mm</option>
                                        </select>

                                        {/* LOKASI */}
                                        <li class="list-group-item">
                                            <h5 class="card-title">Lokasi</h5>
                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox" value="" id="defaultCheck1" />
                                                <label class="form-check-label" for="defaultCheck1">
                                                    Jabodetabek
                                            </label>
                                            </div>
                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox" value="" id="defaultCheck1" />
                                                <label class="form-check-label" for="defaultCheck1">
                                                    Jakarta
                                            </label>
                                            </div>
                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox" value="" id="defaultCheck1" />
                                                <label class="form-check-label" for="defaultCheck1">
                                                    Bandung
                                            </label>
                                            </div>
                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox" value="" id="defaultCheck1" />
                                                <label class="form-check-label" for="defaultCheck1">
                                                    Surabaya
                                            </label>
                                            </div>
                                            <a href="">Lihat semua lokasi</a>
                                        </li>

                                        {/* TYPE STRAP */}
                                        <li class="list-group-item">
                                            <h5 class="card-title">Type Strap</h5>

                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox" value="Nato" id="nato" onChange={(e) => {

                                                    var filterTemp = this.state.filter;
                                                    if (filterTemp.includes(`${e.target.value}`)) {
                                                        filterTemp.splice(filterTemp.indexOf(`${e.target.value}`), 1);
                                                        this.setState({
                                                            filter: filterTemp
                                                        });
                                                        this.loadProducts();
                                                    } else {
                                                        filterTemp.push(e.target.value);
                                                        console.log(filterTemp)
                                                        this.setState({
                                                            filter: filterTemp
                                                        });
                                                        this.loadProducts();
                                                    }
                                                }
                                                } />
                                                <label class="form-check-label" for="nato">
                                                    Nato
                                            </label>
                                            </div>

                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox" value="Canvas" id="canvas" onChange={(e) => {

                                                    var filterTemp = this.state.filter;
                                                    if (filterTemp.includes(`${e.target.value}`)) {
                                                        filterTemp.splice(filterTemp.indexOf(`${e.target.value}`), 1);
                                                        this.setState({
                                                            filter: filterTemp
                                                        });
                                                        console.log(filterTemp)
                                                        this.loadProducts();
                                                    } else {
                                                        filterTemp.push(e.target.value);
                                                        console.log(filterTemp)
                                                        this.setState({
                                                            filter: filterTemp
                                                        });
                                                        this.loadProducts();
                                                    }
                                                }
                                                } />
                                                <label class="form-check-label" for="canvas">
                                                    Canvas
                                            </label>
                                            </div>

                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox" value="Perlon" id="perlon" onChange={(e) => {

                                                    var filterTemp = this.state.filter;
                                                    if (filterTemp.includes(`${e.target.value}`)) {
                                                        filterTemp.splice(filterTemp.indexOf(`${e.target.value}`), 1);
                                                        this.setState({
                                                            filter: filterTemp
                                                        });
                                                        this.loadProducts();
                                                    } else {
                                                        filterTemp.push(e.target.value);
                                                        this.setState({
                                                            filter: filterTemp
                                                        });
                                                        this.loadProducts();
                                                    }
                                                }
                                                } />
                                                <label class="form-check-label" for="perlon">
                                                    Perlon
                                                </label>
                                            </div>

                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox" value="Leather" id="leather" onChange={(e) => {

                                                    var filterTemp = this.state.filter;
                                                    if (filterTemp.includes(`${e.target.value}`)) {
                                                        filterTemp.splice(filterTemp.indexOf(`${e.target.value}`), 1);
                                                        this.setState({
                                                            filter: filterTemp
                                                        });
                                                        this.loadProducts();
                                                    } else {
                                                        filterTemp.push(e.target.value);
                                                        this.setState({
                                                            filter: filterTemp
                                                        });
                                                        this.loadProducts();
                                                    }
                                                }
                                                } />
                                                <label class="form-check-label" for="leather">
                                                    Leather
                                                </label>
                                            </div>

                                        </li>

                                        {/* DUKUNGAN PENGIRIMAN */}
                                        {/* <li class="list-group-item">
                                            <h5 class="card-title">Dukungan pengiriman</h5>
                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox" value="" id="defaultCheck1" />
                                                <label class="form-check-label" for="defaultCheck1">
                                                    Instant Courier
                                            </label>
                                            </div>
                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox" value="" id="defaultCheck1" />
                                                <label class="form-check-label" for="defaultCheck1">
                                                    JNE
                                            </label>
                                            </div>
                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox" value="" id="defaultCheck1" />
                                                <label class="form-check-label" for="defaultCheck1">
                                                    J&T
                                            </label>
                                            </div>
                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox" value="" id="defaultCheck1" />
                                                <label class="form-check-label" for="defaultCheck1">
                                                    Pos Indonesia
                                            </label>
                                            </div>
                                            <a href="">Lihat semua pengiriman</a>
                                        </li>
                                    */}
                                        <button className="btn btn-success text-center d-block" onClick={() => {
                                            this.setState({
                                                filter: []
                                            });
                                            document.getElementById("nato").checked = false;
                                            document.getElementById("canvas").checked = false;
                                            document.getElementById("perlon").checked = false;
                                            document.getElementById("leather").checked = false;
                                            this.loadProducts();
                                        }}>Reset</button>
                                    </ul>

                                </div>
                            </div>
                        </div>

                        <div className="col-lg-9">
                            <div className="row">
                                <div className="col-lg-6">
                                    <p>Daftar Produk <strong>1 - {this.state.data_productsShown.length}</strong> dari <strong>{this.state.data_products.length}</strong></p>
                                </div>
                                <div className="col-lg-6 text-right">
                                    <div class="form-group">
                                        <label for="sort">Urutkan: </label>
                                        <select class="mx-1" style={{ padding: "10px 20px" }} id="sort" onChange={(e) => {
                                            this.loadProducts(e.target.value)
                                        }}>
                                            <option value="typeStrap">Type Strap</option>
                                            <option value="alphabet">Alphabet</option>
                                            <option value="lowestPrice">Harga Terendah</option>
                                            <option value="highestPrice">Harga Tertinggi</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                {this.state.isLoading ? this.loader() : this.state.dataNotFoundMsg ? <div className="container text-center"><p>Produk tidak ditemukan</p></div> : this.showProducts()}

                            </div>
                            {!this.state.isDone ? this.state.isViewMore ? <p className="d-block my-3 text-primary text-center"> <b>Loading... </b></p> :
                                <a className="d-block text-center my-3 text-primary" style={{ cursor: "pointer" }} onClick={this.fetchMoreData}>View More... </a>
                                :
                                <p className="text-center">
                                    {/* <b>{this.state.dataNotFoundMsg && "Wow! You've seen all of our high quality products!"}</b> */}
                                    <b>Wow! You've seen all of our high quality products!</b>
                                </p>
                            }
                        </div>
                    </div>
                </div>

            </React.Fragment >
        )
    }
}

export default ProductList;