import { Modal, ModalHeader, ModalBody, Spinner } from "reactstrap";
import getTimeString from "../../utils/getTimeString";

interface StudentNoticeModalProps {
  data: any;
  toggle: VoidFunction;
  visibility: boolean;
  id: string;
}

export default function StudentNoticeModal({
  data,
  visibility,
  toggle,
  id,
}: StudentNoticeModalProps) {
  //   const [visibility, toggle] = useToggle();

  console.log(data);

  const getNoticeById = (id: string) => {};

  // const dateCreated = new Date(data?.createdAt)

  return (
    <div>
      {/* <p onClick={toggle} className=" click d-flex">
        Edit
      </p> */}

      {/* Modal */}
      <Modal centered isOpen={visibility} toggle={toggle} scrollable>
        <ModalHeader toggle={toggle}>{data?.title}</ModalHeader>
        <ModalBody>
          <div>
            <h2>{new Date(data?.createdAt).toDateString()}</h2>

            <div className="py-4">
              <img
                // src="https://assets.goal.com/v3/assets/bltcc7a7ffd2fbf71f5/bltee609014dcab6c81/64d48ffe55515fbb38d0b8f6/Club_Preview_Liverpool.jpg?auto=webp&format=pjpg&width=3840&quality=60"
                src={data?.attachments[0]?.path}
                alt=""
                style={{ width: "100%" }}
              />
            </div>

            <div>{data?.content}</div>

            <button
              className="btn btn-blue-800 btn-lg w-100 my-5"
              type="button"
              onClick={toggle}
            >
              {"Close"}
            </button>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
}
