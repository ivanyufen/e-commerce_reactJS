import React from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col, Container, Table } from 'reactstrap';
import classnames from 'classnames';
import TableData from './TableData';
import axios from 'axios';

class Tab extends React.Component {

    constructor() {
        super();
        this.state = {
            data_user: "",
            files: "",
            data_product: "",
            isLoading: false
        }
    }
    componentDidMount() {
        this.setState({
            isLoading: true
        })
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
            })
        })
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

    addDataUser = (newData, files) => {
        axios.post(`http://localhost:3007/users`, newData).then((x) => {

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
        })
    }

    removeDataUser = (id) => {
        axios.delete(`http://localhost:3007/users/${id}`).then((x) => {
            // di reload datanya
            this.reloadData();
        })
    }

    addDataProduct = (newData, photo) => {
        console.log(newData)
        axios.post(`http://localhost:3007/products`, newData).then((x) => {
            console.log(x);
            alert(x.data.id_product)
            //kalau file nya ada, upload
            if (photo) {
                console.log(photo);
                // upload foto
                var url = 'http://localhost:3007/uploadProduct';
                var formData = new FormData();

                //ngirim file gambarnya ke back end
                // formData.append('file', files);

                //ngirim id user ke back end
                formData.append('productid', x.data.id_product);

                formData.append('file', photo);

                var config = {
                    headers:
                        { 'Content-Type': 'multipart/form-data' }
                };

                axios.post(url, formData, config).then(() => {
                    alert("posted")
                    this.reloadData();
                })
            }
            else {
                this.reloadData();
            }
        })
    }

    reloadData = () => {
        // if (this.props.activeTab == '1') {
        axios.get('http://localhost:3007/users').then((x) => {
            this.setState({
                data_user: x.data
            })
        });
        // }
        axios.get('http://localhost:3007/products').then((x) => {
            this.setState({
                data_product: x.data,
                isLoading: false
            })
        })
    }

    render() {
        return (
            <TabContent activeTab={this.props.activeTab}>
                {this.props.activeTab == 1 &&
                    <TabPane tabId="1">
                        <Row>
                            <Col sm="12">
                                <TableData data_user={this.state.data_user} active="1" removeDataUser={this.removeDataUser} editDataUser={this.editDataUser} addDataUser={this.addDataUser} reloadData={this.reloadData} />
                            </Col>
                        </Row>
                    </TabPane>}

                {this.props.activeTab == 2 &&
                    <TabPane tabId="2">
                        <Row>
                            <Col sm="12">
                                <TableData data_product={this.state.data_product} active="2" removeDataUser={this.removeDataUser} editDataUser={this.editDataUser} addDataProduct={this.addDataProduct} reloadData={this.reloadData} />
                            </Col>
                        </Row>
                    </TabPane>
                }
            </TabContent>
        )
    }
}


export default Tab;