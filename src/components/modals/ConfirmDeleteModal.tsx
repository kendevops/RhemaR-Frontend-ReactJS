import React from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Modal, ModalHeader, ModalBody, Spinner } from "reactstrap";

interface ConfirmDeleteModalProps {
  toggle: VoidFunction;
  visibility: boolean;
  onDelete?: VoidFunction;
  isLoading?: boolean;
}

export function ConfirmDeleteModal({
  visibility,
  toggle,
  onDelete,
  isLoading,
}: ConfirmDeleteModalProps) {
  return (
    <>
      {/* <p
        className=""
        style={{ color: "red", cursor: "pointer" }}
        onClick={toggle}
      >
        Delete
      </p> */}

      <RiDeleteBin6Line
        style={{
          cursor: "pointer",
          fontSize: "23px",
          color: "red",
          marginTop: "-5px",
        }}
        onClick={toggle}
      />

      <Modal isOpen={visibility} toggle={toggle}>
        <ModalHeader toggle={toggle}>Confirm Delete</ModalHeader>
        {isLoading && <Spinner />}
        <ModalBody>
          <div>
            Are you sure you want to delete this item? This action cannot be
            undone.
          </div>

          <div className="d-flex gap-4 ">
            <button className="btn  btn-lg my-5" type="submit" onClick={toggle}>
              {"Cancel"}
            </button>
            <button
              className="btn  btn-lg my-5"
              type="submit"
              style={{ color: "red" }}
              onClick={onDelete}
            >
              {"Delete"}
            </button>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
}
