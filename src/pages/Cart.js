import React from 'react';
import { Segment, CardHeader } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { Loader } from 'semantic-ui-react';
import { Table, Card, Button, CardTitle, CardText, CardBody } from 'reactstrap';
import swal from '@sweetalert/with-react';



class Cart extends React.Component {

    constructor() {
        super();
        this.state = {
            cartData: "",
            totalProduct: 0,
            isLoading: false,
            totalPrice: 0,
            canCheckout: true
        }
    }

    loadCart = () => {
        this.setState({
            isLoading: true
        })
        axios.get(`http://localhost:3007/cart/${this.props.id_user}`).then((x) => {

            if (x.data.length > 0) {
                this.setState({
                    cartData: x.data,
                    isLoading: false
                });
            }
            else {
                this.setState({
                    cartData: "",
                    isLoading: false
                })
            }

        })
    }
    componentDidMount() {
        this.loadCart();
    }

    totalPrice() {
        var totalPrice = 0;
        for (var i = 0; i < this.state.cartData.length; i++) {
            totalPrice = totalPrice + (this.state.cartData[i].quantity * this.state.cartData[i].price);
        }
        return totalPrice
    }

    deleteCart = (id, productName, productSize) => {
        axios.delete(`http://localhost:3007/cart/${id}`).then((x) => {
            swal(`${productName} ${productSize} mm deleted from cart!`);
            this.loadCart();
        });
    }

    cartData() {
        return this.state.cartData.map((val, i) => {
            return (
                <tr>
                    {/* <td scope="row">{i + 1}</td> */}
                    <td><img src={val.photo} style={{ maxWidth: 100, maxHeight: 150 }} /></td>
                    <td>{val.name} {val.size} mm</td>
                    <td>
                        <div id="quantityCounter" className="my-2">
                            <p>Jumlah: </p>
                            <button type="button" style={{ background: "none", border: "none", cursor: "pointer" }} onClick={() => {
                                // kita buat copy dari state cartData
                                var cartDataTemp = this.state.cartData;

                                // kita buat variable penampung sementara yg value nya sama dengan quantity produk tsb
                                var quantityTemp = val.quantity;

                                // kita kurangin per click
                                quantityTemp--;

                                // validasi, jika sudah 1 atau kurang, quantity akan tetap 1
                                if (quantityTemp <= 1) {
                                    quantityTemp = 1;
                                }

                                // kita ubah quantity di variable sementara
                                cartDataTemp[i].quantity = quantityTemp;

                                // kita ubah state cartData seperti variable copy an yg quantity nya sudah berubah
                                this.setState({
                                    cartData: cartDataTemp
                                });

                                // kita update ke database
                                axios.put(`http://localhost:3007/cart/${val.id_cart}`, {
                                    quantity: quantityTemp
                                });
                            }}><i class="fas fa-minus-circle fa-lg"></i></button>

                            <input type="text" value={val.quantity} style={{ border: "none", borderBottom: "2px solid black", width: "5rem" }}
                                // ini untuk prevent user ketik huruf
                                onKeyPress={(e) => {
                                    var char = String.fromCharCode(e.which); if (!(/[0-9]/.test(char))) {
                                        e.preventDefault();
                                    }
                                }} onChange={(e) => {
                                    var cartDataTemp = this.state.cartData;
                                    var quantityTemp = e.target.value;
                                    cartDataTemp[i].quantity = quantityTemp;

                                    // jika input user masih kosong, tombol checkout tidak bisa di klik
                                    if (quantityTemp == "") {
                                        this.setState({
                                            canCheckout: false
                                        })
                                    }

                                    this.setState({
                                        cartData: cartDataTemp
                                    });

                                    if (quantityTemp != "") {
                                        axios.put(`http://localhost:3007/cart/${val.id_cart}`, {
                                            quantity: quantityTemp
                                        }).then(() => {
                                            // jika quantity masih ada isi, maka user bisa checkout
                                            this.setState({
                                                canCheckout: true
                                            })
                                        })
                                    }


                                }}
                                onKeyDown={(e) => {
                                    // ini kalau user press angka 0 tapi quantity dalam keadaan kosong, sedangkan quantity kan gaboleh 0.
                                    if (e.key == 0 && val.quantity == "") {
                                        e.preventDefault();
                                        axios.put(`http://localhost:3007/cart/${val.id_cart}`, {
                                            quantity: 1
                                        });
                                    }
                                }} />

                            <button type="button" style={{ background: "none", border: "none", cursor: "pointer" }} onClick={() => {
                                // kita buat copy dari state cartData
                                var cartDataTemp = this.state.cartData;

                                // kita buat variable penampung sementara yg value nya sama dengan quantity produk tsb
                                var quantityTemp = val.quantity;

                                // kita kurangin per click
                                quantityTemp++;

                                // kita ubah quantity di variable sementara
                                cartDataTemp[i].quantity = quantityTemp;

                                // kita ubah state cartData seperti variable copy an yg quantity nya sudah berubah
                                this.setState({
                                    cartData: cartDataTemp
                                });

                                // kita update ke database
                                axios.put(`http://localhost:3007/cart/${val.id_cart}`, {
                                    quantity: quantityTemp
                                })
                            }}><i class="fas fa-plus-circle fa-lg"></i></button>
                        </div>
                    </td>
                    <td>Rp {val.price.toLocaleString()}</td>
                    <td>
                        <a onClick={() => { this.deleteCart(val.id_cart, val.name, val.size) }}><i className="far fa-trash-alt" style={{ cursor: "pointer" }}></i></a>
                    </td>
                </tr>
            )
        })
    }

    displayCartData() {
        return (
            <Table size="sm">
                <thead>
                    <tr>
                        {/* <th>No</th> */}
                        <th>Product Image</th>
                        <th>Product Name</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {this.cartData()}
                </tbody>
            </Table>
        )
    }

    // fungsi untuk menghitung jumlah seluruh barang user
    totalProduct() {
        if (this.state.cartData) {
            // dibuat copy dari state cartData
            var cartDataTemp = this.state.cartData;
            // buat variable sementara untuk jadi penampung hasil tambah quantity nya
            var temp = 0;
            // di mapping di setiap cartData quantity nya ditambahkan, ditampung ke temp, dan di return ke totalProductTemp
            var totalProductTemp = this.state.cartData.map((val) => {
                if (val.quantity != "") {
                    temp = parseInt(temp) + parseInt(val.quantity)
                    return temp;
                }
            });
            // variable total product isinya var totalProductTemp index terakhir, menyatakan quantity total
            var totalProduct = totalProductTemp[totalProductTemp.length - 1];
            return totalProduct;
        }
    }


    cartSummary() {
        return (
            <Card body>
                <CardBody>
                    <CardTitle>Ringkasan Belanja</CardTitle>
                    <hr></hr>
                    <CardTitle className="my-3">Total harga: Rp {this.totalPrice().toLocaleString()}</CardTitle>

                    {/* VALIDASI JIKA ADA QUANTITY YANG BELUM DIISI */}

                    {this.state.canCheckout ? <Button color="success" block size="lg">Checkout ({this.totalProduct()})</Button> : <Button color="success" block disabled size="lg">Checkout ({this.totalProduct()})</Button>}
                    {/* {this.totalProduct() ? <Button color="success" block size="lg">Checkout ({this.totalProduct()})</Button> : <Button color="success" block disabled size="lg">Checkout ({this.totalProduct()})</Button>} */}
                </CardBody>


            </Card>
        )
    }



    emptyCart() {
        return (
            <React.Fragment >
                <img src='https://cdn.dribbble.com/users/1244867/screenshots/4346888/empty_cart.jpg' style={{ width: 300, maxHeight: "100", }} />
                <div style={{ display: "inline-block" }}><h1 style={{ textAlign: "right" }}>Keranjang anda kosong</h1> <p style={{ textAlign: "right" }}>Klik di <a href="/shop"> sini </a>untuk mulai berbelanja!</p></div>
            </React.Fragment >
        )
    }

    loader() {
        return (
            <Loader size='large' active inline='centered' />
        )
    }


    render() {
        // kalau user login, bisa liat cartnya
        if (this.props.isLoggedIn) {
            return (
                <React.Fragment>
                    <div className="container my-5">
                        <div className="row my-5">
                            <div className="col-lg-12">
                                <h1 className="text-center"> Your shopping cart</h1>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-lg-8">
                                {/* <Segment padded='very'>Very padded content.</Segment> */}
                                {this.state.isLoading ? this.loader() : this.state.cartData ? this.displayCartData() : this.emptyCart()}
                            </div>
                            <div className="col-lg-4">
                                {this.state.cartData && this.cartSummary()}
                            </div>
                        </div>
                    </div>

                </React.Fragment>
            )
        }
        // kalau ga ke login, ke login
        else {
            return <Redirect to={{ pathname: '/login', isFromCart: true }}
            />
        }

    }
}


export default Cart;