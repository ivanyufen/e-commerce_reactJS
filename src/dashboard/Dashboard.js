import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col, Container } from 'reactstrap';
import classnames from 'classnames';
import Tab from './Tab';
import swal from '@sweetalert/with-react';

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: '1',
            tabId: '1'
        };
    }

    toggle = (tab) => {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    render() {
        if (this.props.location.role != "Admin" && this.props.role != "Admin") { //cek apakah role user admin atau bukan, kalau bukan, akan otomatis di direct ke Home
            return (
                <Redirect to="/" />
            )
        }
        else {
            return (
                <React.Fragment>
                    <h1 className="text-center my-3">Welcome, admin</h1>
                    <Container>
                        {/* START NAVIGATION NAME */}
                        <Nav tabs>
                            <NavItem style={{ cursor: "pointer" }}>
                                <NavLink
                                    className={classnames({ active: this.state.activeTab === '1' })}
                                    onClick={(e) => { this.toggle('1'); this.setState({ tabId: 1 }) }}
                                >
                                    Users
                                    </NavLink>
                            </NavItem>

                            <NavItem style={{ cursor: "pointer" }}>
                                <NavLink
                                    className={classnames({ active: this.state.activeTab === '2' })}
                                    onClick={() => { this.toggle('2'); this.setState({ tabId: 2 }) }}
                                >
                                    Products
                                    </NavLink>
                            </NavItem>
                            <NavItem style={{ cursor: "pointer" }}>
                                <NavLink
                                    className={classnames({ active: this.state.activeTab === '3' })}
                                    onClick={() => { this.toggle('3'); this.setState({ tabId: 3 }) }}
                                >
                                    Orders
                                    </NavLink>
                            </NavItem>
                        </Nav>
                        {/* END OF NAVIGATION NAME */}

                        {/* START OF TAB CONTENT */}
                        <Tab activeTab={this.state.activeTab} />
                    </Container>


                </React.Fragment>
            )
        }
    }
}


export default Dashboard;