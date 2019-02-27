import React from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col, Container, Table } from 'reactstrap';
import classnames from 'classnames';
import TableData from './TableData';
import axios from 'axios';
import swal from '@sweetalert/with-react';

class Tab extends React.Component {

    constructor() {
        super();
        this.state = {
            data_user: "",
            files: "",
            data_product: "",
            isLoading: false,
            posted: true,
            data_order: ""
        }
    }
    componentDidMount() {
        this.setState({
            isLoading: true
        });
        // if (this.props.activeTab == "1") {
        axios.get('http://localhost:3007/users').then((x) => {
            this.setState({
                data_user: x.data,
                isLoading: false
            })
        })
        // }
        // else if (this.props.activeTab == "2") {
        axios.get('http://localhost:3007/products').then((x) => {
            this.setState({
                data_product: x.data,
                isLoading: false
            });
            console.log(x.data)
        })

        axios.get("http://localhost:3007/orders").then((x) => {
            var dataReverse = [...x.data].reverse();
            this.setState({
                data_order: dataReverse
            });
        });
        // }
    }

    editDataUser = (id, newData, files) => {
        axios.put(`http://localhost:3007/users/${id}`, newData).then((x) => {

            //kalau file nya ada, upload
            if (files) {
                var url = 'http://localhost:3007/upload';
                var formData = new FormData();

                //ngirim id user ke back end
                formData.append('userid', id);

                //ngirim file gambarnya ke back end
                formData.append('file', files);

                var config = {
                    headers:
                        { 'Content-Type': 'multipart/form-data' }
                };

                axios.post(url, formData, config).then(() => {
                    this.reloadData();
                });
            }
            else {
                this.reloadData();
            }
        })
    }

    editDataProduct = (id, newData, files, files2, files3) => {
        console.log(id)
        console.log(files)
        console.log(files2)
        console.log(files3)
        axios.put(`http://localhost:3007/products/${id}`, newData).then((x) => {

            //kalau file nya ada, upload
            if (files || files2 || files3) {
                var url = 'http://localhost:3007/uploadProduct';
                var formData = new FormData();

                //ngirim id user ke back end
                formData.append('productid', id);

                //ngirim file gambarnya ke back end
                formData.append('file', files);
                formData.append('file2', files2);
                formData.append('file3', files3);

                var config = {
                    headers:
                        { 'Content-Type': 'multipart/form-data' }
                };

                axios.post(url, formData, config).then(() => {
                    this.reloadData();
                });
            }
            else {
                this.reloadData();
            }
        })
    }

    addDataUser = (newData, files) => {
        axios.post(`http://localhost:3007/users`, newData).then((x) => {
            if (x.data.status == "wrongPassword" || x.data.status == "notRegistered") {
                this.setState({
                    posted: false
                })
            }
            else {
                this.setState({
                    posted: true
                })
                //kalau file nya ada, upload
                if (files) {
                    // upload foto
                    var url = 'http://localhost:3007/upload';
                    var formData = new FormData();

                    //ngirim id user ke back end
                    formData.append('userid', x.data.id_user);

                    //ngirim file gambarnya ke back end
                    formData.append('file', files);

                    var config = {
                        headers:
                            { 'Content-Type': 'multipart/form-data' }
                    };

                    axios.post(url, formData, config).then(() => {
                        this.reloadData();
                    })
                }
                else {
                    this.reloadData();
                }
            }
        })
    }



    removeDataProduct = (id) => {
        axios.delete(`http://localhost:3007/products/${id}`).then((x) => {
            // di reload datanya
            this.reloadData();
        })
    }

    removeDataUser = (id) => {
        axios.delete(`http://localhost:3007/users/${id}`).then((x) => {
            // di reload datanya
            this.reloadData();
        })
    }

    addDataProduct = (newData, files, files2, files3) => {
        axios.post(`http://localhost:3007/products`, newData).then((x) => {
            //kalau file nya ada, upload
            if (files) {
                // upload foto
                var url = 'http://localhost:3007/uploadProduct';
                var formData = new FormData();

                //ngirim file gambarnya ke back end
                // formData.append('file', files);

                //ngirim id user ke back end
                formData.append('productid', x.data.id_product);

                formData.append('file', files);
                formData.append('file2', files2);
                formData.append('file3', files3);

                var config = {
                    headers:
                        { 'Content-Type': 'multipart/form-data' }
                };

                axios.post(url, formData, config).then(() => {
                    this.reloadData();
                })
            }
            else {
                this.reloadData();
            }
        })
    }

    processOrder = (order_id) => {
        axios.put(`http://localhost:3007/order/${order_id}`).then(() => {
            swal("Pesanan diproses");
            this.reloadData();
        })
    }

    reloadData = () => {
        // if (this.props.activeTab == '1') {
        axios.get('http://localhost:3007/products').then((x) => {
            this.setState({
                data_product: x.data,
                isLoading: false
            });
        });
        axios.get('http://localhost:3007/users').then((x) => {
            this.setState({
                data_user: x.data
            });
        });
        axios.get("http://localhost:3007/orders").then((x) => {
            var dataReverse = [...x.data].reverse();
            this.setState({
                data_order: dataReverse
            });
        });
        // }

    }

    render() {
        return (
            <TabContent activeTab={this.props.activeTab}>
                {this.props.activeTab == 1 &&
                    <TabPane tabId="1">
                        <Row>
                            <Col sm="12">
                                <TableData data_user={this.state.data_user} active="1" removeDataUser={this.removeDataUser} editDataUser={this.editDataUser} addDataUser={this.addDataUser} reloadData={this.reloadData} posted={this.state.posted} />
                            </Col>
                        </Row>
                    </TabPane>
                }

                {this.props.activeTab == 2 &&
                    <TabPane tabId="2">
                        <Row>
                            <Col sm="12">
                                <TableData data_product={this.state.data_product} active="2" removeDataProduct={this.removeDataProduct} editDataproduct={this.editDataProduct} addDataProduct={this.addDataProduct} reloadData={this.reloadData} posted={this.state.posted} />
                            </Col>
                        </Row>
                    </TabPane>
                }

                {this.props.activeTab == 3 &&
                    <TabPane tabId="3">
                        <Row>
                            <Col sm="12">
                                <TableData data_order={this.state.data_order} active="3" reloadData={this.reloadData} processOrder={this.processOrder} />
                            </Col>
                        </Row>
                    </TabPane>
                }
            </TabContent>
        )
    }
}


export default Tab;