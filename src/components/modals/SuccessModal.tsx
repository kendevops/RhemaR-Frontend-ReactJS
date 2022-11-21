import { ReactNode } from "react";
import { CheckCircle } from "react-feather";
import { Modal, ModalBody } from "reactstrap";

type SuccessModalProps = {
  isVisible: boolean;
  toggle: VoidFunction;
  title?: string;
  message: string;
  CTA?: ReactNode;
};

export default function SuccessModal({
  message,
  CTA,
  title,
  isVisible,
  toggle,
}: SuccessModalProps) {
  return (
    <Modal centered isOpen={isVisible} toggle={toggle} id="success">
      <ModalBody className="text-center">
        <h2 className="text-bold">
          <span>
            <CheckCircle color="#5C993D" />
          </span>
          {title ?? "Success"}
        </h2>

        <p className="my-5">{message}</p>

        <div>{CTA}</div>
      </ModalBody>
    </Modal>
  );
}
