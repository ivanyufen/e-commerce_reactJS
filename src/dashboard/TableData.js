import React from 'react';
import { Table } from 'reactstrap';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import swal from 'sweetalert';


class TableData extends React.Component {

    constructor() {
        super();
        this.state = {
            users: "",
            isLoading: false,
            modalEdit: false,
            modalDelete: false,
            modalAdd: false,
            id_temp: "",
            data_user: {
                name: "",
                email: "",
                username: "",
                address: "",
                phone_number: "",
                role: ""
            },
            files: ""
        }
    }


    toggleDeleteYes = (id) => {
        this.setState({
            modalDelete: !this.state.modalDelete,
            id_temp: id
        });

    }

    toggleDeleteNo = () => {
        this.setState({
            modalDelete: !this.state.modalDelete
        })
    }

    toggleAddYes = () => {
        this.setState({
            modalAdd: !this.state.modalAdd
        });
    }

    toggleAddNo = () => {
        this.setState({
            modalAdd: !this.state.modalAdd
        })
    }

    toggleEditYes = (id) => {
        this.setState({
            modalEdit: !this.state.modalEdit,
            id_temp: id
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
                    }
                })
            }
        })
    }

    toggleEditNo = () => {
        this.setState({
            modalEdit: !this.state.modalEdit,
            data_user: {
                name: "",
                email: "",
                username: "",
                address: "",
                phone_number: ""
            }
        });
    }


    removeDataUser = (x) => {
        this.props.removeDataUser(x);
        this.setState({
            modalDelete: !this.state.modalDelete
        });
        swal("Data deleted!");
    }

    editDataUser = (x) => {
        this.props.editDataUser(x, this.state.data_user, this.state.files);
        this.setState({
            modalEdit: !this.state.modalEdit
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

    addDataUser = () => {
        this.props.addDataUser(this.state.data_user, this.state.files);
        this.setState({
            modalAdd: !this.state.modalAdd
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

    reloadData = () => {
        console.log("reloaded!")
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
                            <td>{<img src={val.profpict} style={{ width: 50, height: 50 }} />}</td>
                            <td>{val.role}</td>
                            <td><button type="button" className="btn btn-primary" onClick={() => { this.toggleEditYes(val.id) }}>Edit</button></td>
                            <td><button type="button" className="btn btn-danger" onClick={() => { this.toggleDeleteYes(val.id) }}>Remove</button></td>
                            {/* <td><button type="button" className="btn btn-danger">{val.profpict.substr(37, [val.profpict.length - 1])}</button></td> */}
                        </tr>
                    )
                }
            })
        }
        else {
            console.log("No user data");
        }
    }

    displayModalEditUser() {
        return (
            <React.Fragment>
                {/* Modal untuk edit data user */}
                <Modal isOpen={this.state.modalEdit} fade={false} centered={true} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Edit data</ModalHeader>
                    <ModalBody>
                        <form className="border p-3 m-5">
                            <div id="regis" className={this.state.classDisplay}>

                                {/* Email */}
                                <div className="form-group">
                                    <label for="email">Email address</label>
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
                                    <label for="name">Name</label>
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
                                    <label for="username">Username</label>
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
                                    <label for="phone_number">Phone Number</label>
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
                                    <img src={this.state.data_user.profpict} style={{ maxWidth: 100, maxHeight: 150 }} />
                                    <label for="file-upload" style={{ border: "2px solid #ccc", display: "inline-block", padding: "6px 12px", cursor: "pointer", backgroundColor: "gray", color: "white" }}> {this.state.files ? this.state.files.name.length > 20 ? this.state.files.name.slice(0, 15) + "..." : this.state.files.name : <span>Browse image..</span>}</label>
                                    <input id="file-upload" type="file" name="filename" style={{ display: "none" }} onChange={(e) => { this.setState({ files: e.target.files[0] }) }} />
                                </div>
                            </div>
                        </form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={() => { this.editDataUser(this.state.id_temp) }}>Save</Button>
                        <Button color="secondary" onClick={this.toggleEditNo}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </React.Fragment>
        )
    }

    displayModalDelete() {
        return (
            <React.Fragment>
                {/* Modal untuk validasi sebelum hapus data user */}
                <Modal isOpen={this.state.modalDelete} fade={false} centered={true} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>You sure want to delete?</ModalHeader>
                    <ModalFooter>
                        <Button color="primary" onClick={() => { this.removeDataUser(this.state.id_temp) }}>Yes</Button>
                        <Button color="secondary" onClick={this.toggleDeleteNo}>No</Button>
                    </ModalFooter>
                </Modal>
            </React.Fragment>
        )
    }

    displayModalAddUser() {
        return (
            <React.Fragment>
                {/* Modal untuk edit data user */}
                <Modal isOpen={this.state.modalAdd} fade={false} centered={true} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Add data</ModalHeader>
                    <ModalBody>
                        <form className="border p-3 m-5">
                            <div id="regis">
                                {/* Email */}
                                <div className="form-group">
                                    <label for="email">Email address</label>
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
                                    <label for="name">Name</label>
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
                                    <label for="username">Username</label>
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
                                    <label for="pass">Password</label>
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
                                    <label for="address">Address</label>
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
                                    <label for="phone_number">Phone Number</label>
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
                                    <label for="role" >Role</label>
                                    <select onChange={(e) => {
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
                                    <label for="file-upload" style={{ border: "2px solid #ccc", display: "inline-block", padding: "6px 12px", cursor: "pointer", backgroundColor: "gray", color: "white" }}> {this.state.files ? this.state.files.name.length > 20 ? this.state.files.name.slice(0, 15) + "..." : this.state.files.name : <span>Browse image..</span>}</label>
                                    <input id="file-upload" type="file" name="filename" style={{ display: "none" }} onChange={(e) => { this.setState({ files: e.target.files[0] }) }} />
                                </div>

                            </div>
                        </form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.addDataUser}>Add</Button>
                        <Button color="secondary" onClick={this.toggleAddNo}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </React.Fragment>
        )
    }

    render() {
        return (
            <React.Fragment>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6">
                            <p className="my-3 d-inline">Total {this.props.data_user.length - 1} users.</p>
                            <button type="button" className="btn btn-outline-secondary mx-3 my-2" onClick={this.reloadData}>
                                <i class="fas fa-sync-alt"></i> Reload </button>
                        </div>
                        <div className="col-lg-6 d-flex flex-row-reverse">
                            <button type="button" className="btn btn-outline-secondary mx-3 my-2" onClick={this.toggleAddYes}>
                                <i class="fas fa-plus"></i> Add data </button>
                        </div>
                    </div>
                </div>


                <Table>
                    <thead>
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
                    </thead>
                    <tbody>
                        {this.displayUsersTable()}
                    </tbody>
                </Table>

                {this.displayModalDelete()}

                {this.displayModalEditUser()}

                {this.displayModalAddUser()}

            </React.Fragment>
        )
    }
}

export default TableData;