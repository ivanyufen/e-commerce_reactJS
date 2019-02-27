import React from 'react';
import { Table } from 'reactstrap';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import swal from 'sweetalert';
import axios from 'axios';


class TableData extends React.Component {

    constructor() {
        super();
        this.state = {
            isLoading: false,
            modalEditUser: false,
            modalDeleteUser: false,
            modalAddUser: false,
            modalAddProduct: false,
            modalEditProduct: false,
            modalDeleteProduct: false,
            modalDetailItem: false,
            id_temp: "",
            data_user: {
                name: "",
                email: "",
                username: "",
                address: "",
                phone_number: "",
                role: ""
            },
            data_product: {
                name: "",
                price: "",
                id_category: "1",
                stock: "",
                description: "",
                size: "18",
                location: "",
                photo: "",
                photo2: "",
                photo3: ""
            },
            files: "",
            files2: "",
            files3: "",
            tempImageURL: "",
            tempImageURL2: "",
            tempImageURL3: "",
            item_details_temp: ""
        }
    }


    toggleDeleteYes = (id) => {
        if (this.props.active == 1) {
            this.setState({
                modalDeleteUser: !this.state.modalDeleteUser,
                id_temp: id
            });
        }
        else if (this.props.active == 2) {
            this.setState({
                modalDeleteProduct: !this.state.modalDeleteProduct,
                id_temp: id
            });
        }


    }

    toggleDeleteNo = () => {
        this.setState({
            modalDeleteUser: !this.state.modalDeleteUser
        })
    }

    showDetailItem = (order_id) => {
        axios.get(`http://localhost:3007/order/${order_id}`).then((x) => {
            console.log(x.data)
            this.setState({
                item_details_temp: x.data
            })
            this.toggleDetailItem();

        })
    }

    toggleDetailItem = () => {
        this.setState({
            modalDetailItem: !this.state.modalDetailItem
        });
    }

    toggleAddYes = (activeTab) => {
        if (activeTab == 1) {
            this.setState({
                modalAddUser: !this.state.modalAddUser,
                tempImageURL: "",
                files: ""
            });
        }
        else if (activeTab == 2) {
            this.setState({
                modalAddProduct: !this.state.modalAddProduct,
                tempImageURL: "",
                tempImageURL2: "",
                tempImageURL3: "",
                files: ""
            });
        }
    }

    toggleAddNo = () => {
        if (this.props.active == 1) {
            this.setState({
                modalAddUser: !this.state.modalAddUser,
                tempImageURL: "",
                files: ""
            });
        }
        else if (this.props.active == 2) {
            this.setState({
                modalAddProduct: !this.state.modalAddProduct,
                tempImageURL: "",
                tempImageURL2: "",
                tempImageURL3: "",
                files: ""
            });
        }

    }

    toggleEditUserYes = (id) => {
        this.setState({
            modalEditUser: !this.state.modalEditUser,
            id_temp: id,
            files: ""
        });
        var datauser_temp = [];
        this.props.data_user.map((val, i) => {
            if (val.id == id) {
                datauser_temp.push(val);
                this.setState({
                    data_user: {
                        name: val.name,
                        email: val.email,
                        username: val.username,
                        address: val.address,
                        phone_number: val.phone_number,
                        profpict: val.profpict
                    },
                    tempImageURL: "",
                    files: ""
                })
            }
        })
    }

    toggleEditProductYes = (id) => {
        this.setState({
            modalEditProduct: !this.state.modalEditProduct,
            id_temp: id,
            files: ""
        });
        var dataproduct_temp = [];
        this.props.data_product.map((val, i) => {
            if (val.id == id) {
                dataproduct_temp.push(val);
                this.setState({
                    data_product: {
                        name: val.name,
                        price: val.price,
                        id_category: val.id_category,
                        stock: val.stock,
                        description: val.description,
                        size: val.size,
                        location: val.location,
                        photo: val.photo,
                        photo2: val.photo2,
                        photo3: val.photo3
                    },
                    tempImageURL: "",
                    tempImageURL2: "",
                    tempImageURL3: "",
                    files: "",
                    files2: "",
                    files3: ""
                });
            }
        })
    }

    toggleEditProductNo = () => {
        this.setState({
            modalEditProduct: !this.state.modalEditProduct,
            data_product: {
                name: "",
                price: "",
                id_category: "1",
                stock: "",
                description: "",
                size: "18",
                location: "",
                photo: ""
            },
            tempImageURL: "",
            tempImageURL2: "",
            tempImageURL3: "",
            files: ""
        });
    }

    toggleEditUserNo = () => {
        this.setState({
            modalEditUser: !this.state.modalEditUser,
            data_user: {
                name: "",
                email: "",
                username: "",
                address: "",
                phone_number: ""
            },
            tempImageURL: "",
            files: ""
        });
    }


    removeDataProduct = (id) => {
        this.props.removeDataProduct(id);
        this.setState({
            modalDeleteProduct: !this.state.modalDeleteProduct
        });
        swal("Data deleted!");
    }
    removeDataUser = (id) => {
        this.props.removeDataUser(id);
        this.setState({
            modalDeleteUser: !this.state.modalDeleteUser
        });
        swal("Data deleted!");
    }

    editDataUser = (id) => {
        this.props.editDataUser(id, this.state.data_user, this.state.files);
        this.setState({
            modalEditUser: !this.state.modalEditUser
        });
        swal("Data saved!");
        this.setState({
            data_user: {
                name: "",
                email: "",
                username: "",
                address: "",
                phone_number: ""
            },
            files: ""
        })
    }


    editDataproduct = (id) => {
        this.props.editDataproduct(id, this.state.data_product, this.state.files, this.state.files2, this.state.files3);
        this.setState({
            modalEditProduct: !this.state.modalEditProduct
        });
        swal("Data saved!");
        this.setState({
            data_product: {
                name: "",
                price: "",
                id_category: "1",
                stock: "",
                description: "",
                size: "18",
                location: "",
                photo: "",
                photo2: "",
                photo3: ""
            },
            files: "",
            files2: "",
            files3: ""
        })
    }

    addDataProduct = () => {
        console.log(this.state.files)
        console.log(this.state.files2)
        console.log(this.state.files3)
        this.props.addDataProduct(this.state.data_product, this.state.files, this.state.files2, this.state.files3);
        this.setState({
            modalAddProduct: !this.state.modalAddProduct
        });
        swal("Data added!");
        this.setState({
            data_product: {
                name: "",
                price: "",
                id_category: "1",
                stock: "",
                description: "",
                size: "18",
                location: ""
            },
            files: "",
            files2: "",
            files3: ""
        })
    }

    addDataUser = () => {
        this.props.addDataUser(this.state.data_user, this.state.files);
        if (this.props.posted) {
            this.setState({
                modalAddUser: !this.state.modalAddUser
            });
            swal("Data added!");
            this.setState({
                data_user: {
                    name: "",
                    email: "",
                    username: "",
                    address: "",
                    phone_number: ""
                },
                files: ""
            })
        }
        else {
            swal("User already registered!");
        }

    }

    reloadData = () => {
        this.props.reloadData();
    }

    displayUsersTable() {
        if (this.props.data_user) {
            return this.props.data_user.map((val, i) => {
                if (val.role != "Admin") {
                    return (
                        <tr>
                            <td>{val.id}</td>
                            <td>{val.name}</td>
                            <td>{val.email}</td>
                            <td>{val.username}</td>
                            <td>{val.address}</td>
                            <td>{val.phone_number}</td>
                            <td>{<img src={val.profpict} style={{ maxWidth: 150, maxHeight: 300 }} />}</td>
                            <td>{val.role}</td>
                            <td><button type="button" className="btn btn-primary" onClick={() => { this.toggleEditUserYes(val.id) }}>Edit</button></td>
                            <td><button type="button" className="btn btn-danger" onClick={() => { this.toggleDeleteYes(val.id) }}>Remove</button></td>
                        </tr>
                    )
                }
            })
        }
        else {
            console.log("No user data");
        }
    }

    displayProductsTable() {
        if (this.props.data_product) {
            console.log(this.props.data_product)
            return this.props.data_product.map((val, i) => {
                return (
                    <tr>
                        <td>{val.id}</td>
                        <td>{val.name}</td>
                        <td>{val.price}</td>
                        {/* <td>{val.id_category}</td> */}
                        <td>{val.category_name}</td>
                        <td>{val.stock}</td>
                        <td>{val.description}</td>
                        <td>{val.size}</td>
                        <td>{val.location}</td>
                        <td>{<img src={val.photo} style={{ maxWidth: 250, maxHeight: 500 }} />}</td>
                        <td><button type="button" className="btn btn-primary" onClick={() => { this.toggleEditProductYes(val.id) }}>Edit</button></td>
                        <td><button type="button" className="btn btn-danger" onClick={() => { this.toggleDeleteYes(val.id) }}>Remove</button></td>
                    </tr>
                )
            })
        }
        else {
            console.log("No product data");
        }
    }

    displayModalEditProduct() {
        return (
            <React.Fragment>
                {/* Modal untuk add data product */}
                <Modal isOpen={this.state.modalEditProduct} fade={false} centered={true} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Add data</ModalHeader>
                    <ModalBody>
                        <form className="border p-3 m-5">
                            <div id="regis">
                                {/* Name */}
                                <div className="form-group">
                                    <label htmlFor="productName">Product Name</label>
                                    <input type="text" className="form-control" id="productName" value={this.state.data_product.name} onChange={(e) => {
                                        let data_productCopy = this.state.data_product;
                                        data_productCopy.name = e.target.value;
                                        this.setState({
                                            data_product: data_productCopy
                                        });
                                    }}
                                        placeholder="Enter product name" />
                                </div>

                                {/* Price */}
                                <div className="form-group">
                                    <label htmlFor="price">Price</label>
                                    <input type="number" className="form-control" id="price" value={this.state.data_product.price} onChange={(e) => {
                                        let data_productCopy = this.state.data_product;
                                        data_productCopy.price = e.target.value;
                                        this.setState({
                                            data_product: data_productCopy
                                        });
                                    }}
                                        placeholder="Enter price" />
                                </div>

                                {/* Category */}
                                <div className="form-group">
                                    <label htmlFor="category" >Category</label>
                                    <select className="form-control" value={this.state.data_product.id_category} onChange={(e) => {
                                        let data_productCopy = this.state.data_product;
                                        data_productCopy.id_category = e.target.value;
                                        this.setState({
                                            data_product: data_productCopy
                                        });
                                    }}>
                                        <option value="1">Nato</option>
                                        <option value="2">Zulu</option>
                                        <option value="3">Perlon</option>
                                        <option value="4">Leather</option>
                                        <option value="5">Canvas</option>
                                    </select>
                                </div>

                                {/* Stock */}
                                <div className="form-group">
                                    <label htmlFor="stock">Stock</label>
                                    <input type="number" className="form-control" value={this.state.data_product.stock} onChange={(e) => {
                                        let data_productCopy = this.state.data_product;
                                        data_productCopy.stock = e.target.value;
                                        this.setState({
                                            data_product: data_productCopy
                                        });
                                    }}
                                        placeholder="Stock" />
                                </div>

                                {/* Description */}
                                <div className="form-group">
                                    <label htmlFor="description">Description</label>
                                    <textarea className="form-control" id="description" value={this.state.data_product.description} onChange={(e) => {
                                        let data_productCopy = this.state.data_product;
                                        data_productCopy.description = e.target.value;
                                        this.setState({
                                            data_product: data_productCopy
                                        });
                                    }} placeholder="Enter description" ></textarea>
                                </div>

                                {/* Size */}
                                <div className="form-group">
                                    <label htmlFor="size" >Size</label>
                                    <select className="form-control" value={this.state.data_product.size} onChange={(e) => {
                                        let data_productCopy = this.state.data_product;
                                        data_productCopy.size = e.target.value;
                                        this.setState({
                                            data_product: data_productCopy
                                        });
                                    }}>
                                        <option value="18" selected>18 mm</option>
                                        <option value="20">20 mm</option>
                                        <option value="22">22 mm</option>
                                    </select>
                                </div>

                                {/* Location */}
                                <div className="form-group">
                                    <label htmlFor="location">Location</label>
                                    <input type="text" className="form-control" value={this.state.data_product.location} onChange={(e) => {
                                        let data_productCopy = this.state.data_product;
                                        data_productCopy.location = e.target.value;
                                        this.setState({
                                            data_product: data_productCopy
                                        });
                                    }}
                                        placeholder="Location" />
                                </div>

                                {/* Product Picture */}
                                <div className="form-group">
                                    <p>Product Picture</p>
                                    {/* <img src={this.state.tempImageURL ? this.state.tempImageURL : this.state.data_product.photo} style={{ maxWidth: 100, maxHeight: 150 }} />
                                    <label htmlFor="file-upload" style={{ border: "2px solid #ccc", display: "inline-block", padding: "6px 12px", cursor: "pointer", backgroundColor: "gray", color: "white" }}> {this.state.files ? this.state.files.name.length > 20 ? this.state.files.name.slice(0, 15) + "..." : this.state.files.name : <span>Browse image..</span>}</label>
                                    <input id="file-upload" type="file" name="filename" accept="image/*" style={{ display: "none" }} onChange={(e) => { this.setState({ files: e.target.files[0], tempImageURL: URL.createObjectURL(e.target.files[0]) }) }} /> */}
                                    <label htmlFor="file-upload" className="m-1" style={{ border: "2px solid #ccc", display: "inline-block", padding: "6px 12px", cursor: "pointer", backgroundColor: "white", width: "100px", height: "90px", overflow: "hidden" }}> {this.state.tempImageURL ? <img src={this.state.tempImageURL} style={{ maxWidth: "100px", maxHeight: "80px", margin: "auto" }} /> : <img src={this.state.data_product.photo} style={{ maxWidth: "100px", maxHeight: "80px" }} />}</label>
                                    <input id="file-upload" type="file" name="filename" accept="image/*" style={{ display: "none" }} onChange={(e) => { this.setState({ files: e.target.files[0], tempImageURL: URL.createObjectURL(e.target.files[0]) }) }} />

                                    {/* <img src={this.state.tempImageURL2 ? this.state.tempImageURL2 : this.state.data_product.photo2} style={{ maxWidth: 100, maxHeight: 150 }} /> */}
                                    {/* <label htmlFor="file-upload2" style={{ border: "2px solid #ccc", display: "inline-block", padding: "6px 12px", cursor: "pointer", backgroundColor: "gray", color: "white" }}> {this.state.files2 ? this.state.files2.name.length > 20 ? this.state.files2.name.slice(0, 15) + "..." : this.state.files2.name : <span>Browse image..</span>}</label> */}
                                    <label htmlFor="file-upload2" className="m-1" style={{ border: "2px solid #ccc", display: "inline-block", padding: "6px 12px", cursor: "pointer", backgroundColor: "white", width: "100px", height: "90px", overflow: "hidden" }}> {this.state.tempImageURL2 ? <img src={this.state.tempImageURL2} style={{ maxWidth: "100px", maxHeight: "80px", margin: "auto" }} /> : this.state.data_product.photo2 ? <img src={this.state.data_product.photo2} style={{ maxWidth: "100px", maxHeight: "80px", margin: "auto" }} /> : <p style={{ margin: "0 auto" }}>Add image</p>}</label>
                                    <input id="file-upload2" type="file" name="filename2" accept="image/*" style={{ display: "none" }} onChange={(e) => { this.setState({ files2: e.target.files[0], tempImageURL2: URL.createObjectURL(e.target.files[0]) }) }} />

                                    {/* <img src={this.state.tempImageURL3 ? this.state.tempImageURL3 : this.state.data_product.photo3} style={{ maxWidth: 100, maxHeight: 150 }} /> */}
                                    {/* <label htmlFor="file-upload3" style={{ border: "2px solid #ccc", display: "inline-block", padding: "6px 12px", cursor: "pointer", backgroundColor: "gray", color: "white" }}> {this.state.files3 ? this.state.files3.name.length > 20 ? this.state.files3.name.slice(0, 15) + "..." : this.state.files3.name : <span>Browse image..</span>}</label> */}
                                    <label htmlFor="file-upload3" className="m-1" style={{ border: "2px solid #ccc", display: "inline-block", padding: "6px 12px", cursor: "pointer", backgroundColor: "white", width: "100px", height: "90px", overflow: "hidden" }}> {this.state.tempImageURL3 ? <img src={this.state.tempImageURL3} style={{ maxWidth: "100px", maxHeight: "80px", margin: "auto" }} /> : this.state.data_product.photo3 != "null" ? <img src={this.state.data_product.photo3} style={{ maxWidth: "100px", maxHeight: "80px", margin: "auto" }} /> : <p style={{ margin: "0 auto" }}>Add image</p>}</label>
                                    <input id="file-upload3" type="file" name="filename3" accept="image/*" style={{ display: "none" }} onChange={(e) => { this.setState({ files3: e.target.files[0], tempImageURL3: URL.createObjectURL(e.target.files[0]) }) }} />

                                </div>

                            </div>
                        </form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={() => { this.editDataproduct(this.state.id_temp) }}>Save</Button>
                        <Button color="secondary" onClick={this.toggleEditProductNo}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </React.Fragment>
        )
    }

    displayModalItemDetails() {
        return (
            <React.Fragment>
                {/* Modal untuk add data product */}
                <Modal isOpen={this.state.modalDetailItem} fade={false} centered={true} toggle={this.toggleDetailItem}>
                    <ModalHeader toggle={this.toggleDetailItem}>Detail Pesanan</ModalHeader>
                    <ModalBody>
                        <ul>
                            {this.state.item_details_temp ? this.state.item_details_temp.map((val) => {
                                return (
                                    <li>{val.name} - {val.size} mm ({val.quantity} pcs)</li>
                                )
                            }) : ""}
                        </ul>

                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.toggleDetailItem}>Close</Button>
                    </ModalFooter>
                </Modal>
            </React.Fragment>
        )
    }

    displayModalEditUser() {
        return (
            <React.Fragment>
                {/* Modal untuk edit data user */}
                <Modal isOpen={this.state.modalEditUser} fade={false} centered={true} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Edit data</ModalHeader>
                    <ModalBody>
                        <form className="border p-3 m-5">
                            <div id="regis" className={this.state.classDisplay}>

                                {/* Email */}
                                <div className="form-group">
                                    <label htmlFor="email">Email address</label>
                                    <input type="email" className="form-control" id="email" value={this.state.data_user.email} onChange={(e) => {
                                        let data_userCopy = this.state.data_user;
                                        data_userCopy.email = e.target.value;
                                        this.setState({
                                            data_user: data_userCopy
                                        });
                                    }}
                                        placeholder="Enter email" />
                                </div>

                                {/* Name */}
                                <div className="form-group">
                                    <label htmlFor="name">Name</label>
                                    <input type="name" className="form-control" id="email" value={this.state.data_user.name} onChange={(e) => {
                                        let data_userCopy = this.state.data_user;
                                        data_userCopy.name = e.target.value;
                                        this.setState({
                                            data_user: data_userCopy
                                        });
                                    }}
                                        placeholder="Enter name" />
                                </div>

                                {/* Username */}
                                <div className="form-group">
                                    <label htmlFor="username">Username</label>
                                    <input type="text" className="form-control" id="username" value={this.state.data_user.username} onChange={(e) => {
                                        let data_userCopy = this.state.data_user;
                                        data_userCopy.username = e.target.value;
                                        this.setState({
                                            data_user: data_userCopy
                                        });
                                    }}
                                        placeholder="Enter Username" />
                                </div>

                                {/* Address */}
                                <div className="form-group">
                                    <label htmlFor="address">Address</label>
                                    <textarea className="form-control" id="address" value={this.state.data_user.address} onChange={(e) => {
                                        let data_userCopy = this.state.data_user;
                                        data_userCopy.address = e.target.value;
                                        this.setState({
                                            data_user: data_userCopy
                                        });
                                    }} placeholder="Enter address" ></textarea>
                                </div>

                                {/* Phone Number */}
                                <div className="form-group">
                                    <label htmlFor="phone_number">Phone Number</label>
                                    <input type="text" className="form-control" id="phone_number" value={this.state.data_user.phone_number} onChange={(e) => {
                                        let data_userCopy = this.state.data_user;
                                        data_userCopy.phone_number = e.target.value;
                                        this.setState({
                                            data_user: data_userCopy
                                        });
                                    }}
                                        placeholder="Enter phone number" />
                                </div>

                                {/* Profile Picture */}
                                <div className="form-group">
                                    <p>Profile Picture</p>
                                    <img src={this.state.tempImageURL ? this.state.tempImageURL : this.state.data_user.profpict} style={{ maxWidth: 100, maxHeight: 150 }} />
                                    <label htmlFor="file-upload" style={{ border: "2px solid #ccc", display: "inline-block", padding: "6px 12px", cursor: "pointer", backgroundColor: "gray", color: "white" }}> {this.state.files ? this.state.files.name.length > 20 ? this.state.files.name.slice(0, 15) + "..." : this.state.files.name : <span>Browse image..</span>}</label>
                                    <input id="file-upload" type="file" accept="image/*" name="filename" style={{ display: "none" }} onChange={(e) => { this.setState({ files: e.target.files[0], tempImageURL: URL.createObjectURL(e.target.files[0]) }) }} />
                                </div>
                            </div>
                        </form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={() => { this.editDataUser(this.state.id_temp) }}>Save</Button>
                        <Button color="secondary" onClick={this.toggleEditUserNo}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </React.Fragment>
        )
    }

    displayModalDeleteUser() {
        return (
            <React.Fragment>
                {/* Modal untuk validasi sebelum hapus data user */}
                <Modal isOpen={this.state.modalDeleteUser} fade={false} centered={true} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>You sure want to delete?</ModalHeader>
                    <ModalFooter>
                        <Button color="primary" onClick={() => { this.removeDataUser(this.state.id_temp) }}>Yes</Button>
                        <Button color="secondary" onClick={this.toggleDeleteNo}>No</Button>
                    </ModalFooter>
                </Modal>
            </React.Fragment>
        )
    }

    displayModalDeleteProduct() {
        return (
            <React.Fragment>
                {/* Modal untuk validasi sebelum hapus data user */}
                <Modal isOpen={this.state.modalDeleteProduct} fade={false} centered={true} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>You sure want to delete?</ModalHeader>
                    <ModalFooter>
                        <Button color="primary" onClick={() => { this.removeDataProduct(this.state.id_temp) }}>Yes</Button>
                        <Button color="secondary" onClick={this.toggleDeleteNo}>No</Button>
                    </ModalFooter>
                </Modal>
            </React.Fragment>
        )
    }

    displayModalAddUser() {
        return (
            <React.Fragment>
                {/* Modal untuk add data user */}
                <Modal isOpen={this.state.modalAddUser} fade={false} centered={true} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Add data</ModalHeader>
                    <ModalBody>
                        <form className="border p-3 m-5">
                            <div id="regis">
                                {/* Email */}
                                <div className="form-group">
                                    <label htmlFor="email">Email address</label>
                                    <input type="email" className="form-control" id="email" value={this.state.data_user.email} onChange={(e) => {
                                        let data_userCopy = this.state.data_user;
                                        data_userCopy.email = e.target.value;
                                        this.setState({
                                            data_user: data_userCopy
                                        });
                                    }}
                                        placeholder="Enter email" />
                                </div>

                                {/* Name */}
                                <div className="form-group">
                                    <label htmlFor="name">Name</label>
                                    <input type="name" className="form-control" id="email" value={this.state.data_user.name} onChange={(e) => {
                                        let data_userCopy = this.state.data_user;
                                        data_userCopy.name = e.target.value;
                                        this.setState({
                                            data_user: data_userCopy
                                        });
                                    }}
                                        placeholder="Enter name" />
                                </div>

                                {/* Username */}
                                <div className="form-group">
                                    <label htmlFor="username">Username</label>
                                    <input type="text" className="form-control" id="username" value={this.state.data_user.username} onChange={(e) => {
                                        let data_userCopy = this.state.data_user;
                                        data_userCopy.username = e.target.value;
                                        this.setState({
                                            data_user: data_userCopy
                                        });
                                    }}
                                        placeholder="Enter Username" />
                                </div>

                                {/* Password */}
                                <div className="form-group">
                                    <label htmlFor="pass">Password</label>
                                    <input type="password" className="form-control" value={this.state.data_user.password} onChange={(e) => {
                                        let data_userCopy = this.state.data_user;
                                        data_userCopy.password = e.target.value;
                                        this.setState({
                                            data_user: data_userCopy
                                        });
                                    }}
                                        placeholder="Password" />
                                </div>

                                {/* Address */}
                                <div className="form-group">
                                    <label htmlFor="address">Address</label>
                                    <textarea className="form-control" id="address" value={this.state.data_user.address} onChange={(e) => {
                                        let data_userCopy = this.state.data_user;
                                        data_userCopy.address = e.target.value;
                                        this.setState({
                                            data_user: data_userCopy
                                        });
                                    }} placeholder="Enter address" ></textarea>
                                </div>

                                {/* Phone Number */}
                                <div className="form-group">
                                    <label htmlFor="phone_number">Phone Number</label>
                                    <input type="text" className="form-control" id="phone_number" value={this.state.data_user.phone_number} onChange={(e) => {
                                        let data_userCopy = this.state.data_user;
                                        data_userCopy.phone_number = e.target.value;
                                        this.setState({
                                            data_user: data_userCopy
                                        });
                                    }}
                                        placeholder="Enter phone number" />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="role" >Role</label>
                                    <select className="form-control" onChange={(e) => {
                                        let data_userCopy = this.state.data_user;
                                        data_userCopy.role = e.target.value;
                                        this.setState({
                                            data_user: data_userCopy
                                        });
                                    }}>
                                        <option value="User">User</option>
                                        <option value="Admin">Admin</option>
                                    </select>
                                </div>

                                {/* Profile Picture */}
                                <div className="form-group">
                                    <p>Profile Picture</p>
                                    <img src={this.state.tempImageURL ? this.state.tempImageURL : this.state.data_user.profpict} style={{ maxWidth: 100, maxHeight: 150 }} />
                                    <label htmlFor="file-upload" style={{ border: "2px solid #ccc", display: "inline-block", padding: "6px 12px", cursor: "pointer", backgroundColor: "gray", color: "white" }}> {this.state.files ? this.state.files.name.length > 20 ? this.state.files.name.slice(0, 15) + "..." : this.state.files.name : <span>Browse image..</span>}</label>
                                    <input id="file-upload" type="file" name="filename" accept="image/*" style={{ display: "none" }} onChange={(e) => { this.setState({ files: e.target.files[0], tempImageURL: URL.createObjectURL(e.target.files[0]) }) }} />
                                </div>

                            </div>
                        </form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.addDataUser}>Add</Button>
                        <Button color="secondary" onClick={() => { this.toggleAddNo(this.props.active) }}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </React.Fragment>
        )
    }


    displayModalAddProduct() {
        return (
            <React.Fragment>
                {/* Modal untuk add data product */}
                <Modal isOpen={this.state.modalAddProduct} fade={false} centered={true} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Add data</ModalHeader>
                    <ModalBody>
                        <form className="border p-3 m-5">
                            <div id="regis">
                                {/* Name */}
                                <div className="form-group">
                                    <label htmlFor="productName">Product Name</label>
                                    <input type="text" className="form-control" id="productName" value={this.state.data_product.name} onChange={(e) => {
                                        let data_productCopy = this.state.data_product;
                                        data_productCopy.name = e.target.value;
                                        this.setState({
                                            data_product: data_productCopy
                                        });
                                    }}
                                        placeholder="Enter product name" />
                                </div>

                                {/* Price */}
                                <div className="form-group">
                                    <label htmlFor="price">Price</label>
                                    <input type="number" className="form-control" id="price" value={this.state.data_product.price} onChange={(e) => {
                                        let data_productCopy = this.state.data_product;
                                        data_productCopy.price = e.target.value;
                                        this.setState({
                                            data_product: data_productCopy
                                        });
                                    }}
                                        placeholder="Enter price" />
                                </div>

                                {/* Category */}
                                <div className="form-group">
                                    <label htmlFor="category" >Category</label>
                                    <select className="form-control" value={this.state.data_product.id_category} onChange={(e) => {
                                        let data_productCopy = this.state.data_product;
                                        data_productCopy.id_category = e.target.value;
                                        this.setState({
                                            data_product: data_productCopy
                                        });
                                    }}>
                                        <option value="1">Nato</option>
                                        <option value="2">Zulu</option>
                                        <option value="3">Perlon</option>
                                        <option value="4">Leather</option>
                                        <option value="5">Canvas</option>
                                    </select>
                                </div>

                                {/* Stock */}
                                <div className="form-group">
                                    <label htmlFor="stock">Stock</label>
                                    <input type="number" className="form-control" value={this.state.data_product.stock} onChange={(e) => {
                                        let data_productCopy = this.state.data_product;
                                        data_productCopy.stock = e.target.value;
                                        this.setState({
                                            data_product: data_productCopy
                                        });
                                    }}
                                        placeholder="Stock" />
                                </div>

                                {/* Description */}
                                <div className="form-group">
                                    <label htmlFor="description">Description</label>
                                    <textarea className="form-control" id="description" value={this.state.data_product.description} onChange={(e) => {
                                        let data_productCopy = this.state.data_product;
                                        data_productCopy.description = e.target.value;
                                        this.setState({
                                            data_product: data_productCopy
                                        });
                                    }} placeholder="Enter description" ></textarea>
                                </div>

                                {/* Size */}
                                <div className="form-group">
                                    <label htmlFor="size" >Size</label>
                                    <select className="form-control" value={this.state.data_product.size} onChange={(e) => {
                                        let data_productCopy = this.state.data_product;
                                        data_productCopy.size = e.target.value;
                                        this.setState({
                                            data_product: data_productCopy
                                        });
                                    }}>
                                        <option value="18" selected>18 mm</option>
                                        <option value="20">20 mm</option>
                                        <option value="22">22 mm</option>
                                    </select>
                                </div>

                                {/* Location */}
                                <div className="form-group">
                                    <label htmlFor="location">Location</label>
                                    <input type="text" className="form-control" value={this.state.data_product.location} onChange={(e) => {
                                        let data_productCopy = this.state.data_product;
                                        data_productCopy.location = e.target.value;
                                        this.setState({
                                            data_product: data_productCopy
                                        });
                                    }}
                                        placeholder="Location" />
                                </div>

                                {/* Product Picture */}
                                <div className="form-group">
                                    <p>Product Picture</p>
                                    {/* <img src={this.state.tempImageURL ? this.state.tempImageURL : this.state.data_product.photo} style={{ maxWidth: 100, maxHeight: 150 }} /> */}
                                    <label htmlFor="file-upload" className="m-1" style={{ border: "2px solid #ccc", display: "inline-block", padding: "6px 12px", cursor: "pointer", backgroundColor: "white", width: "100px", height: "90px", overflow: "hidden" }}> {this.state.tempImageURL ? <img src={this.state.tempImageURL} style={{ maxWidth: "100px", maxHeight: "80px", margin: "auto" }} /> : <p style={{ margin: "0 auto" }}>Add image</p>}</label>
                                    <input id="file-upload" type="file" name="filename" accept="image/*" style={{ display: "none" }} onChange={(e) => { this.setState({ files: e.target.files[0], tempImageURL: URL.createObjectURL(e.target.files[0]) }) }} />

                                    {/* <img src={this.state.tempImageURL2 ? this.state.tempImageURL2 : this.state.data_product.photo2} style={{ maxWidth: 100, maxHeight: 150 }} /> */}
                                    {/* <label htmlFor="file-upload2" style={{ border: "2px solid #ccc", display: "inline-block", padding: "6px 12px", cursor: "pointer", backgroundColor: "gray", color: "white" }}> {this.state.files2 ? this.state.files2.name.length > 20 ? this.state.files2.name.slice(0, 15) + "..." : this.state.files2.name : <span>Browse image..</span>}</label> */}
                                    <label htmlFor="file-upload2" className="m-1" style={{ border: "2px solid #ccc", display: "inline-block", padding: "6px 12px", cursor: "pointer", backgroundColor: "white", width: "100px", height: "90px", overflow: "hidden" }}> {this.state.tempImageURL2 ? <img src={this.state.tempImageURL2} style={{ maxWidth: "100px", maxHeight: "80px", margin: "auto" }} /> : <p style={{ margin: "0 auto" }}>Add image</p>}</label>
                                    <input id="file-upload2" type="file" name="filename2" accept="image/*" style={{ display: "none" }} onChange={(e) => { this.setState({ files2: e.target.files[0], tempImageURL2: URL.createObjectURL(e.target.files[0]) }) }} />

                                    {/* <img src={this.state.tempImageURL3 ? this.state.tempImageURL3 : this.state.data_product.photo3} style={{ maxWidth: 100, maxHeight: 150 }} /> */}
                                    {/* <label htmlFor="file-upload3" style={{ border: "2px solid #ccc", display: "inline-block", padding: "6px 12px", cursor: "pointer", backgroundColor: "gray", color: "white" }}> {this.state.files3 ? this.state.files3.name.length > 20 ? this.state.files3.name.slice(0, 15) + "..." : this.state.files3.name : <span>Browse image..</span>}</label> */}
                                    <label htmlFor="file-upload3" className="m-1" style={{ border: "2px solid #ccc", display: "inline-block", padding: "6px 12px", cursor: "pointer", backgroundColor: "white", width: "100px", height: "90px", overflow: "hidden" }}> {this.state.tempImageURL3 ? <img src={this.state.tempImageURL3} style={{ maxWidth: "100px", maxHeight: "80px", margin: "auto" }} /> : <p style={{ margin: "0 auto" }}>Add image</p>}</label>
                                    <input id="file-upload3" type="file" name="filename3" accept="image/*" style={{ display: "none" }} onChange={(e) => { this.setState({ files3: e.target.files[0], tempImageURL3: URL.createObjectURL(e.target.files[0]) }) }} />
                                </div>

                            </div>
                        </form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.addDataProduct}>Add</Button>
                        <Button color="secondary" onClick={() => { this.toggleAddNo(this.props.active) }}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </React.Fragment>
        )
    }

    displayOrdersTable() {

        if (this.props.data_order) {
            console.log(this.props.data_order)
            return this.props.data_order.map((val, i) => {

                return (
                    <tr>
                        <td>{val.order_id}</td>
                        <td>{val.id_user}</td>
                        <td>{val.product_name}...</td>
                        <td>{`${val.cust_name} (${val.cust_phone}), ${val.cust_address}`}</td>
                        <td>{`${val.order_date.split('-')[2].split('')[0]}${val.order_date.split('-')[2].split('')[1]}-${val.order_date.split('-')[1]}-${val.order_date.split('-')[0]} - ${val.order_date.split('-')[2].split('')[3]}${val.order_date.split('-')[2].split('')[4]} : ${val.order_date.split('-')[2].split('')[6]}${val.order_date.split('-')[2].split('')[7]} : ${val.order_date.split('-')[2].split('')[9]}${val.order_date.split('-')[2].split('')[10]}`}</td>
                        <td><button type="button" className="btn btn-primary" onClick={() => { this.showDetailItem(val.order_id) }}>Detail Pesanan</button></td>
                        <td>{val.status == "Processed" ? <button type="button" className="btn btn-primary" disabled>Diproses <i class="fas fa-check"></i></button> : <button type="button" className="btn btn-primary" onClick={() => { this.props.processOrder(val.order_id) }}>Proses Pesanan</button>} </td>
                        {/* <td><button type="button" className="btn btn-primary" onClick={() => { this.props.processOrder(val.order_id) }}>{val.status == "Processed" ? "Diproses" : "Proses Pesanan"}</button></td> */}
                    </tr>
                )
            })
        }
        else {
            console.log("No order data");
        }

    }

    render() {

        return (
            <React.Fragment>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6">
                            <p className="my-3 d-inline">Showing {this.props.active == 1 && this.props.data_user.length - 1 || this.props.active == 2 && this.props.data_product.length || this.props.active == 3 && this.props.data_order.length} data.</p>
                            <button type="button" className="btn btn-outline-secondary mx-3 my-2" onClick={this.reloadData}>
                                <i class="fas fa-sync-alt"></i> Reload </button>
                        </div>
                        <div className="col-lg-6 d-flex flex-row-reverse">
                            {this.props.active == 3 || <button type="button" className="btn btn-outline-secondary mx-3 my-2" onClick={() => { this.toggleAddYes(this.props.active) }}>
                                <i class="fas fa-plus"></i> Add data </button>}
                        </div>
                    </div>
                </div>


                <Table responsive>
                    <thead>
                        {this.props.active == 1 &&
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Username</th>
                                <th>Address</th>
                                <th>Phone Number</th>
                                <th>Profile Picture</th>
                                <th>Role</th>
                                <th colSpan="2" className="text-center">Action</th>
                            </tr>
                        }
                        {this.props.active == 2 &&
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Category</th>
                                <th>Stock</th>
                                <th>Description</th>
                                <th>Size</th>
                                <th>Location</th>
                                <th>Image</th>
                                <th colSpan="2" className="text-center">Action</th>
                            </tr>
                        }
                        {this.props.active == 3 ? this.props.data_order.length != 0 ?
                            <tr>
                                <th>Order ID</th>
                                <th>ID User</th>
                                <th>Pesanan</th>
                                <th>Alamat</th>
                                <th style={{ width: "200px" }}>Waktu Order</th>
                                <th colSpan="2">Action</th>
                            </tr>
                            :
                            <div className="text-center my-5">
                                <h1>Data order is empty :(</h1>
                            </div>

                            :
                            <React.Fragment></React.Fragment>
                        }

                    </thead>
                    <tbody>
                        {this.displayUsersTable()}
                        {this.displayProductsTable()}
                        {this.displayOrdersTable()}
                    </tbody>
                </Table>

                {this.displayModalDeleteUser()}

                {this.displayModalEditUser()}

                {this.displayModalAddUser()}

                {this.displayModalAddProduct()}

                {this.displayModalDeleteProduct()}

                {this.displayModalEditProduct()}

                {this.displayModalItemDetails()}

            </React.Fragment>
        )
    }
}

export default TableData;