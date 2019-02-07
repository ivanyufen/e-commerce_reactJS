import React from 'react';
import { Link } from 'react-router-dom';

class ProductCard extends React.Component {

    constructor() {
        super();
        this.state = {
            cart: 0
        };
    }

    render() {
        const { id, url, image, name, price, description, location, size, index } = this.props;
        return (
            <React.Fragment>
                <div className="col-lg-3 col-sm-4 my-1">
                    <a href={"/shop/" + name.split(" ").join("-") + "-" + id}>
                        <div className="card p-1 text-center text-dark productCard" style={{ width: "15rem", height: "25rem" }}>
                            <span className="tooltiptext">Click for details!</span>
                            <img className="card-img-top mx-auto" src={image} style={{ width: "7rem", maxHeight: "13rem" }} alt="Product photo" />
                            <div className="card-body">
                                <h5 className="card-title">{name}</h5>
                                <p className="card-text">Rp {price.toLocaleString()}</p>
                                <p className="card-text"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>(67)</p>
                                <ul class="list-group list-group-flush mb-2">
                                    <li className="list-group-item">
                                        <p className="card-text">{`${size} mm`}</p>
                                        <p className="card-text"><i class="fas fa-shipping-fast mr-1"></i>{location}</p>
                                    </li>
                                </ul>

                                <a href="#" className="btn btn-warning mx-3 cart" onClick={(this.onClickCart)}><i className="fas fa-cart-plus"></i> Add to cart</a>
                            </div>
                        </div>
                    </a>
                    {/* </Link> */}
                </div>

            </React.Fragment >
        )
    }
}

export default ProductCard;