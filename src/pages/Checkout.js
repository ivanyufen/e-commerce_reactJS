import React from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { Loader } from 'semantic-ui-react';
import { Table, Card, Button, CardTitle, CardText, CardBody, CardHeader, CardFooter, Row, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormText, Col } from 'reactstrap';
import swal from '@sweetalert/with-react';



class Checkout extends React.Component {

    constructor() {
        super();
        this.state = {
            cartData: "",
            totalProduct: 0,
            isLoading: false,
            totalPrice: 0,
            cust_name: "",
            cust_address: "",
            cust_phone: "",
            cust_province: "",
            cust_city: "",
            cust_name_temp: "",
            cust_address_temp: "",
            cust_phone_temp: "",
            cust_province_temp: "",
            cust_city_temp: "",
            cityName: "",
            provinceName: "",
            modal: false,
            provinceData: "",
            cityData: "",
            postal_code: ""
        }
    }

    componentDidMount() {
        this.loadCart();
        this.loadUserData();

        axios.get(`http://localhost:3007/province`).then((x) => {
            this.setState({
                provinceData: x.data
            });
        })

    }

    // untuk dapet list city nya
    getCity = (province_id) => {
        axios.get(`http://localhost:3007/city/${province_id}`).then((x) => {
            this.setState({
                cityData: x.data
            });
        })
    }


    toggle = () => {
        this.setState({
            modal: !this.state.modal,
            cust_name_temp: this.state.cust_name,
            cust_address_temp: this.state.cust_address,
            cust_phone_temp: this.state.cust_phone,
        });
    }

    save = () => {
        this.getProvinceName(this.state.cust_province_temp);
        this.getCityName(this.state.cust_city_temp);
        this.setState({
            modal: !this.state.modal,
            cust_name: this.state.cust_name_temp,
            cust_address: this.state.cust_address_temp,
            cust_phone: this.state.cust_phone_temp,
            cust_city: this.state.cust_city_temp,
            cust_province: this.state.cust_province_temp
        });
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

    loadUserData = () => {
        if (this.props.id_user) {
            axios.get(`http://localhost:3007/users/${this.props.id_user}`).then((x) => {
                this.setState({
                    cust_name: x.data[0].name,
                    cust_address: x.data[0].address,
                    cust_phone: x.data[0].phone_number,
                    cust_name_temp: x.data[0].name,
                    cust_address_temp: x.data[0].address,
                    cust_province_temp: x.data[0].province,
                    cust_city: x.data[0].city,
                    cust_province: x.data[0].province,
                    cust_city_temp: x.data[0].city,
                    cust_phone_temp: x.data[0].phone_number
                });
                // untuk dapet list citynya
                this.getCity(x.data[0].province);
                this.getProvinceName(x.data[0].province);
                this.getCityName(x.data[0].city);
            });
        }

    }

    // untuk dapet nama provinsi berdasarkan ID nya
    getProvinceName = (province_id) => {
        this.setState({
            isLoading: true
        })
        axios.get(`http://localhost:3007/province/${province_id}`).then((x) => {
            console.log(x);
            this.setState({
                provinceName: x.data.province,
                isLoading: false
            });
        })
    }

    // untuk dapet nama kota berdasarkan ID nya
    getCityName = (city_id) => {
        this.setState({
            isLoading: true
        })
        axios.get(`http://localhost:3007/city/name/${city_id}`).then((x) => {
            console.log(x);
            this.setState({
                cityName: x.data.city_name,
                postal_code: x.data.postal_code,
                isLoading: false
            });
        })
    }

    totalPrice() {
        var totalPrice = 0;
        for (var i = 0; i < this.state.cartData.length; i++) {
            if (this.state.cartData[i].status == "CheckedOut") {
                totalPrice = totalPrice + (this.state.cartData[i].quantity * this.state.cartData[i].price);
            }
        }
        return totalPrice
    }

    cartData() {
        return this.state.cartData.map((val, i) => {
            if (val.status == "CheckedOut") {
                return (
                    <tr>
                        <td><img src={val.photo} style={{ maxWidth: 100, maxHeight: 150 }} /></td>
                        <td>{val.name} {val.size} mm</td>
                        <td>{val.quantity}</td>
                        <td>Rp {val.price.toLocaleString()}</td>
                    </tr>
                )
            }
        })
    }

    displayCartData() {
        return (
            <Table size="sm">
                <thead>
                    <tr>
                        <th>Product Image</th>
                        <th>Product Name</th>
                        <th>Quantity</th>
                        <th>Price</th>
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
                    <CardTitle className="my-3">Ongkos kirim: Rp</CardTitle>
                    <p className="text-danger">FREE DELIVERY!</p>

                    {<Button color="success" block size="lg">Pay</Button>}
                </CardBody>
            </Card>
        )
    }


    loader() {
        return (
            <Loader size='large' active inline='centered' />
        )
    }

    modalEditAddress() {
        return (
            <div>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Edit Delivery Details</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label for="cust_name">Nama penerima</Label>
                                <Input type="text" name="cust_name" id="cust_name" placeholder="Input nama penerima.." value={this.state.cust_name_temp} onChange={(e) => {
                                    this.setState({
                                        cust_name_temp: e.target.value
                                    });
                                }} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="cust_phone">Nomor Handphone</Label>
                                <Input type="text" name="cust_phone" id="cust_phone" placeholder="Input nomor handphone.." value={this.state.cust_phone_temp} onChange={(e) => {
                                    this.setState({
                                        cust_phone_temp: e.target.value
                                    });
                                }} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="cust_address">Alamat pengiriman</Label>
                                {/* <Col sm={10}> */}
                                <Input type="textarea" name="cust_address" id="cust_address" placeholder="Input alamat.." value={this.state.cust_address_temp} onChange={(e) => {
                                    this.setState({
                                        cust_address_temp: e.target.value
                                    });
                                }} />
                            </FormGroup>
                            <Row form>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="province">Province</Label>
                                        <select className="form-control" id="province" value={this.state.cust_province_temp} onChange={(e) => {
                                            this.setState({
                                                cust_province_temp: e.target.value
                                            })
                                            this.getCity(e.target.value);
                                        }}>
                                            <option hidden>Choose province</option>
                                            {this.state.provinceData ? this.state.provinceData.map((val) => {
                                                return (
                                                    <option value={val.province_id}>{val.province}</option>
                                                )
                                            }) : ""}
                                        </select>
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="city">City</Label>
                                        <select className="form-control" id="city" value={this.state.cust_city_temp} onChange={(e) => {
                                            this.setState({
                                                cust_city_temp: e.target.value
                                            })
                                        }}>
                                            <option hidden>Choose City</option>
                                            {this.state.cityData ? this.state.cityData.map((val) => {
                                                return (
                                                    <option value={val.city_id}>{val.city_name}</option>
                                                )
                                            }) : ""}
                                        </select>
                                    </FormGroup>
                                </Col>
                            </Row>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.save}>Save</Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }

    loader() {
        return (
            <Loader size='large' active inline='centered' />
        )
    }


    render() {
        if (this.props.isLoggedIn) {
            return (
                <React.Fragment>
                    <div className="container my-5">
                        <div className="row my-5">
                            <div className="col-lg-12">
                                <h1 className="text-center">Checkout</h1>
                            </div>
                        </div>
                        {this.state.isLoading ? this.loader() :
                            <div className="row">
                                <div className="col-lg-8">
                                    <Card className="my-3">
                                        <CardHeader>Alamat Pengiriman</CardHeader>
                                        <CardBody>
                                            <CardTitle>{this.state.cust_name}
                                                <CardText className="text-muted"> ({this.state.cust_phone})</CardText>
                                            </CardTitle>
                                            <CardText>{this.state.cust_address}
                                                <CardText>{this.state.cityName}, {this.state.provinceName}, {this.state.postal_code}</CardText>
                                            </CardText>
                                        </CardBody>
                                        <CardFooter>
                                            <Button onClick={this.toggle}>Edit</Button>
                                        </CardFooter>
                                    </Card>
                                    {this.state.isLoading ? this.loader() : this.state.cartData ? this.displayCartData() : ""}
                                </div>
                                <div className="col-lg-4">
                                    {this.state.cartData && this.cartSummary()}
                                </div>
                            </div>
                        }
                    </div>

                    {/* Modal untuk menampilkan edit alamat pengiriman */}
                    {this.modalEditAddress()}

                </React.Fragment>
            )
        }
        else {
            return (
                <Redirect to="/login" />
            )
        }

    }

}


export default Checkout;