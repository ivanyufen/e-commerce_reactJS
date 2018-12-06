import React from 'react';
import Breadcrumbs from './../components/Breadcrumbs';
import Faker from 'faker';
import ProductDetail from './../components/ProductDetail';

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
        return this.state.products.map((val) => {
            return (
                <div className="col-lg-3 my-1">
                    <a href=""><div className="card p-1 text-center text-dark" style={{ width: "15rem", height: "28rem" }}>
                        <img className="card-img-top mx-auto" src={val.productImage} style={{ width: "7rem", maxHeight: "13rem" }} alt="Product photo" />
                        <div className="card-body">
                            <h5 className="card-title">Name: {val.productName}</h5>
                            <p className="card-text">Price: ${val.productPrice}</p>
                            <p className="card-text"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>(67)</p>
                            <ul class="list-group list-group-flush mb-2">
                                <li className="list-group-item text-muted"><a href="">{val.sellerName}</a><br /><i class="fas fa-map-marker-alt mr-1"></i>{val.location}</li>
                            </ul>
                            <a href="#" className="btn btn-warning mx-3" onClick={(this.onClickCart)}><i className="fas fa-cart-plus"></i></a>
                            {/* <a href="#" className="btn btn-warning mx-3" onClick={this.onClickCart}><i className="fas fa-cart-plus"></i></a> */}
                            <a href="#" className="btn btn-danger">Details</a>
                        </div>
                    </div>
                    </a>
                </div>
            )
        })
    }

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

                                        {/* KONDISI */}
                                        <li class="list-group-item">
                                            <h5 class="card-title">Kondisi</h5>
                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox" value="" id="defaultCheck1" />
                                                <label class="form-check-label" for="defaultCheck1">
                                                    Baru
                                            </label>
                                            </div>
                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox" value="" id="defaultCheck1" />
                                                <label class="form-check-label" for="defaultCheck1">
                                                    Bekas
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
                                            <option>Termurah</option>
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