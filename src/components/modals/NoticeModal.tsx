import { Modal, ModalHeader, ModalBody, Spinner } from "reactstrap";

interface StudentNoticeModalProps {
  data: any;
  toggle: VoidFunction;
  visibility: boolean;
}

export default function StudentNoticeModal({
  data,
  visibility,
  toggle,
}: StudentNoticeModalProps) {
  //   const [visibility, toggle] = useToggle();

  console.log(data);

  return (
    <div>
      {/* <p onClick={toggle} className=" click d-flex">
        Edit
      </p> */}

      {/* Modal */}
      <Modal centered isOpen={visibility} toggle={toggle} scrollable>
        <ModalHeader toggle={toggle}>General Exams will start soon</ModalHeader>
        <ModalBody>
          <div>
            <h2>Date of The Event</h2>

            <div className="py-4">
              <img
                src="https://assets.goal.com/v3/assets/bltcc7a7ffd2fbf71f5/bltee609014dcab6c81/64d48ffe55515fbb38d0b8f6/Club_Preview_Liverpool.jpg?auto=webp&format=pjpg&width=3840&quality=60"
                alt=""
                style={{ width: "100%" }}
              />
            </div>

            <div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis
              officiis necessitatibus quos possimus porro dolor maxime libero.
              Perspiciatis, ratione iusto? Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Voluptas aut dicta nemo voluptatibus
              rem similique totam fuga repudiandae hic illum?
            </div>

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
