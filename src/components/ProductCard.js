import React from 'react';

class ProductCard extends React.Component {

    constructor() {
        super();
        this.state = {
            cart: 0
        }
    }

    render() {
        const { productImage, productName, productPrice, sellerName, location, index } = this.props;
        return (
            <React.Fragment>
                <div className="col-lg-3 my-1">
                    <a href=""><div className="card p-1 text-center text-dark" style={{ width: "15rem", height: "28rem" }}>
                        <img className="card-img-top mx-auto" src={productImage} style={{ width: "7rem", maxHeight: "13rem" }} alt="Product photo" />
                        <div className="card-body">
                            <h5 className="card-title">Name: {productName}</h5>
                            <p className="card-text">Price: Rp {productPrice + '0'}</p>
                            <p className="card-text"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>(67)</p>
                            <ul class="list-group list-group-flush mb-2">
                                <li className="list-group-item text-muted"><a href="">{sellerName}</a><br /><i class="fas fa-map-marker-alt mr-1"></i>{location}</li>
                            </ul>
                            <a href="#" className="btn btn-warning mx-3" onClick={(this.onClickCart)}><i className="fas fa-cart-plus"></i></a>
                            <a href="#" className="btn btn-danger">Details</a>
                        </div>
                    </div>
                    </a>
                </div>
            </React.Fragment>
        )
    }
}

export default ProductCard;