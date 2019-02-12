import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col } from 'reactstrap';

class ModalCart extends React.Component {
    render() {
        return (
            <Modal isOpen={this.props.modal} toggle={this.props.toggle} centered>
                <ModalHeader toggle={this.props.toggle}>Added to cart!</ModalHeader>
                <ModalBody>
                    <Row>
                        <Col lg="8">
                            <img src={this.props.data.image} style={{ maxWidth: "75px", maxHeight: "75px" }} /> {this.props.data.name} - {this.props.data.size} mm
                        </Col>
                        <Col lg="4">
                            <Button color="success" onClick={this.props.toggle}>View cart</Button>
                        </Col>
                    </Row>
                </ModalBody>
                <ModalFooter>

                </ModalFooter>
            </Modal>
        )
    }
}

export default ModalCart;