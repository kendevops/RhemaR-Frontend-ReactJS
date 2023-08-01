import { Modal, ModalBody, ModalHeader } from "reactstrap";

interface Props {
  toggle: VoidFunction;
  isOpen: boolean;
  data?: any;
}

export default function ViewPmrScoreModal({ isOpen, toggle, data }: Props) {
  const studentComment = data?.studentComment;
  const mentorComment = data?.mentorComment;

  const scores = Object.keys(data?.studentAttScore);

  //scores?.map((s) => <flex>s, object.keys(data?.studentAttScore[s])?.filter((val) => data?.studentAttScore[s][val] === true )  </flex>)
  return (
    <>
      <Modal centered {...{ isOpen, toggle }}>
        <ModalHeader toggle={toggle} title="View Attachment Score">
          View Attachment Score
        </ModalHeader>

        <ModalBody></ModalBody>
      </Modal>
    </>
  );
}
