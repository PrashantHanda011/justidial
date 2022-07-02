import React from "react";
import { Modal, Button } from "react-bootstrap";
import "./CommonModal.css";

function CommonModal(props) {
  return (
    <>
      <Modal
        show={props.isModalVisible}
        onHide={props.handleClose}
        dialogClassName="bill-modal-dialog"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="modal-container"
      >
        <Modal.Header className="bill-modal-header">
          <Modal.Title>Select payment type</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bill-payment-modal">
          <div>
            <input
              type="radio"
              value={props.value[0]}
              name="payment"
              className="modal-list"
              checked={props.payment === props.value[0]}
              onChange={props.handleChange}
            />{" "}
            {props.value[0]}
          </div>
          <div>
            <input
              type="radio"
              value={props.value[1]}
              name="payment"
              className="modal-list"
              checked={props.payment === props.value[1]}
              onChange={props.handleChange}
            />{" "}
            {props.value[1]}
          </div>
        </Modal.Body>
        <Modal.Footer className="modal-footer">
          <Button
            variant="primary"
            onClick={props.handleNext}
            className="modal-next-btn"
          >
            Next
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CommonModal;
