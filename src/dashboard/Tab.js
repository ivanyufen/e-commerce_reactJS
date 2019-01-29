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
            files: ""
        }
    }
    componentDidMount() {
        if (this.props.activeTab == '1') {
            axios.get('http://localhost:3007/users').then((x) => {
                this.setState({
                    data_user: x.data
                })
            }).catch((err) => {
                console.log(err);
            })
        }
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

    reloadData = () => {
        if (this.props.activeTab == '1') {
            axios.get('http://localhost:3007/users').then((x) => {
                this.setState({
                    data_user: x.data
                })
            });
        }
    }

    render() {
        return (
            <TabContent activeTab={this.props.activeTab}>
                <TabPane tabId="1">
                    <Row>
                        <Col sm="12">
                            <TableData data_user={this.state.data_user} removeDataUser={this.removeDataUser} editDataUser={this.editDataUser} addDataUser={this.addDataUser} reloadData={this.reloadData} />
                        </Col>
                    </Row>
                </TabPane>

                <TabPane tabId="2">
                    <Row>
                        <Col sm="6">
                            <Card body>
                                <CardTitle>Special Title Treatment</CardTitle>
                                <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                                <Button>Go somewhere</Button>
                            </Card>
                        </Col>
                        <Col sm="6">
                            <Card body>
                                <CardTitle>Special Title Treatment</CardTitle>
                                <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                                <Button>Go somewhere</Button>
                            </Card>
                        </Col>
                    </Row>
                </TabPane>
            </TabContent>
        )
    }
}


export default Tab;