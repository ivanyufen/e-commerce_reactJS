import React from 'react';
import Breadcrumbs from './../components/Breadcrumbs';
import Faker from 'faker';
import ProductDetails from './ProductDetails';
import { Link } from 'react-router-dom';
import ProductCard from './../components/ProductCard';

class ProductList extends React.Component {

    constructor() {
        super();
        this.state = {
            products: [],
            isLoading: false,
            cart: 0
        }
    }

    componentDidMount() {
        var productsTemp = [];
        this.setState({
            isLoading: true
        })
        for (var i = 1; i < 29; i++) {
            productsTemp.push({
                productId: i,
                productName: Faker.commerce.product(),
                productImage: Faker.image.avatar(),
                productPrice: Faker.commerce.price(),
                sellerName: Faker.internet.userName(),
                location: Faker.address.cityPrefix()
            })
        }
        this.setState({
            products: productsTemp,
            isLoading: false
        })
    }

    onClickCart = () => {
        this.setState({
            cart: this.state.cart + 1
        })
        this.props.onCartClick(this.state.cart)
    }

    displayProducts = () => {
        return this.state.products.map((val, index) => {
            return (
                <ProductCard productImage={val.productImage}
                    productName={val.productName}
                    productPrice={val.productPrice}
                    sellerName={val.sellerName}
                    location={val.location}
                    index={index} />
            );
        });
    };

    render() {
        return (
            <React.Fragment>
                <Breadcrumbs path={this.props.match.url} />
                {this.state.isLoading && <h1>Loading...</h1>}
                <div className="container mb-5">
                    <div className="row">
                        <div className="col-lg-3 pt-2 border-0">
                            <div class="card border border-dark" style={{ width: "18rem" }}>
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
                                            <h5 class="card-title">Cari di kategori ini</h5>
                                            <div class="input-group">
                                                <input type="text" class="form-control" placeholder="Cari.." />
                                                <span class="input-group-btn">
                                                    <button class="btn btn-default border-light" type="button"><i class="fas fa-search"></i></button>
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
                                            <option>18 mm</option>
                                            <option>20 mm</option>
                                            <option>22 mm</option>
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
                                                <input class="form-check-input" type="checkbox" value="" id="nato" />
                                                <label class="form-check-label" for="nato">
                                                    Nato
                                            </label>
                                            </div>

                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox" value="" id="zulu" />
                                                <label class="form-check-label" for="zulu">
                                                    Zulu
                                            </label>
                                            </div>

                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox" value="" id="rubber" />
                                                <label class="form-check-label" for="rubber">
                                                    Rubber
                                                </label>
                                            </div>

                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox" value="" id="bracelet" />
                                                <label class="form-check-label" for="rubber">
                                                    Bracelet
                                                </label>
                                            </div>
                                        </li>

                                        {/* DUKUNGAN PENGIRIMAN */}
                                        <li class="list-group-item">
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
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-9">
                            <div className="row">
                                <div className="col-lg-6">
                                    <p>Daftar Produk <strong>1 - 50</strong> dari <strong>17.025</strong></p>
                                </div>
                                <div className="col-lg-6 text-right">
                                    <div class="form-group">
                                        <label for="sort">Urutkan: </label>
                                        <select class="mx-1" style={{ padding: "10px 20px" }} id="sort">
                                            <option>Paling sesuai</option>
                                            <option>Rating</option>
                                            <option>Harga Terendah</option>
                                            <option>Harga Termahal</option>
                                            <option>Terbaru</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                {this.displayProducts()}
                            </div>

                            {/* PAGINATION */}
                            <nav aria-label="...">
                                <ul class="pagination">
                                    <li class="page-item disabled">
                                        <a class="page-link" href="#" tabindex="-1">Previous</a>
                                    </li>
                                    <li class="page-item active"><a class="page-link" href="#">1<span class="sr-only">(current)</span></a></li>
                                    <li class="page-item">
                                        <a class="page-link" href="#">2 </a>
                                    </li>
                                    <li class="page-item"><a class="page-link" href="#">3</a></li>
                                    <li class="page-item">
                                        <a class="page-link" href="#">Next</a>
                                    </li>
                                </ul>
                            </nav>

                        </div>
                    </div>
                </div>
            </React.Fragment >
        )
    }
}

export default ProductList;