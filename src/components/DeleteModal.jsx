import React from "react";
import { Modal, Button } from "react-bootstrap";
import modalImg from "../asset/img-BeepBeep.png";

function DeleteModal(props) {
  const { showModal } = props;
  const { handleClose } = props;
  const { deleteCar } = props;

  return (
    <Modal show={showModal}>
      <Modal.Body>
        <div>
          <div className="d-flex justify-content-center">
            <img src={modalImg} alt="" />
          </div>
          <div className="d-flex flex-column align-items-center pt-3">
            <h6 className="fw-bold">Menghapus Data Mobil</h6>
            <p style={{ textAlign: "center", fontSize: "14px" }}>
              Setelah dihapus, data mobil tidak dapat dikembalikan. Yakin ingin
              menghapus?
            </p>
          </div>
          <div
            className="d-flex justify-content-center"
            style={{ gap: "16px" }}
          >
            <div>
              <Button
                variant="primary"
                onClick={deleteCar}
                style={{ width: "87px", borderRadius: "2px" }}
              >
                Ya
              </Button>
            </div>
            <div>
              <Button
                variant="outline-primary"
                onClick={handleClose}
                style={{ width: "87px", borderRadius: "2px" }}
              >
                Tidak
              </Button>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default DeleteModal;
