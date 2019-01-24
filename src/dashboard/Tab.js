import React from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col, Container, Table } from 'reactstrap';
import classnames from 'classnames';
import TableData from './TableData';
import axios from 'axios';

class Tab extends React.Component {

    constructor() {
        super();
        this.state = {
            data_user: ""
        }
    }
    componentDidMount() {
        console.log(this.props.activeTab)
        console.log("wkwkwk")
        if (this.props.activeTab == '1') {
            axios.get('http://localhost:3007/users').then((x) => {
                console.log(x);
                this.setState({
                    data_user: x.data
                })
            }).catch((err) => {
                console.log(err);
            })
        }
    }

    editDataUser = (id, newData) => {
        console.log(id);
        console.log(newData)
        axios.put(`http://localhost:3007/users/${id}`, newData).then((x) => {
            console.log(x);
            // di get supaya ke refresh datanya
            axios.get('http://localhost:3007/users').then((x) => {
                console.log(x);
                this.setState({
                    data_user: x.data
                })
            }).catch((err) => {
                console.log(err);
            })
        })
    }

    addDataUser = (newData) => {
        axios.post(`http://localhost:3007/users`, newData).then((x) => {
            console.log(x);
            console.log("sukses");
            // di get supaya ke refresh datanya
            axios.get('http://localhost:3007/users').then((x) => {
                console.log(x);
                this.setState({
                    data_user: x.data
                })
            }).catch((err) => {
                console.log(err);
            })
        })
    }

    removeDataUser = (id) => {
        axios.delete(`http://localhost:3007/users/${id}`).then((x) => {
            console.log(x);
            // di get supaya ke refresh datanya
            axios.get('http://localhost:3007/users').then((x) => {
                console.log(x);
                this.setState({
                    data_user: x.data
                })
            }).catch((err) => {
                console.log(err);
            })
        }).catch((err) => {
            console.log(err)
        })
    }

    reloadData = () => {
        if (this.props.activeTab == '1') {
            axios.get('http://localhost:3007/users').then((x) => {
                console.log(x);
                this.setState({
                    data_user: x.data
                })
            }).catch((err) => {
                console.log(err);
            })
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