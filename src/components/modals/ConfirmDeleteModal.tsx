import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, Spinner } from "reactstrap";
import useDeleteSession from "../../hooks/mutations/classes/useDeleteSession";
import ToastContent from "../molecules/ToastContent";
import { toast } from "react-toastify";

interface ConfirmDeleteModalProps {
  toggle: VoidFunction;
  visibility: boolean;
  defaultValues?: any;
  onDelete?: VoidFunction;
}

export function ConfirmDeleteModal({
  visibility,
  toggle,
  defaultValues,
}: ConfirmDeleteModalProps) {
  const deleteIt = useDeleteSession(defaultValues?.id as string);

  const IsLoading = deleteIt?.isLoading;

  const deleteMutation = useDeleteSession(defaultValues?.id as string);

  const handleDelete = async () => {
    try {
      await deleteMutation.mutateAsync();
      console.log("Resource deleted");
      toast.success(
        <ToastContent
          type={"success"}
          heading={"Successful"}
          message={"Session created successfully"}
        />,
        ToastContent.Config
      );
      toggle();
    } catch (error: any) {
      console.error("Error deleting resource", error);
      toast.error(
        <ToastContent
          type={"error"}
          heading={"Error"}
          message={error?.response?.data?.error?.message?.toString()}
        />,
        ToastContent.Config
      );
      toggle();
    }
  };

  return (
    <Modal isOpen={visibility} toggle={toggle}>
      <ModalHeader toggle={toggle}>Confirm Delete</ModalHeader>
      {IsLoading && <Spinner />}
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
            onClick={handleDelete}
          >
            {"Delete"}
          </button>
        </div>
      </ModalBody>
    </Modal>
  );
}
