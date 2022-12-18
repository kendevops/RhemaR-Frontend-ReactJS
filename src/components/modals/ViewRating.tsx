import { Modal, ModalHeader, ModalBody } from "reactstrap";
import CardWrapper from "../students/CardWrapper";

interface ViewRatingProps {
  toggle: VoidFunction;
  visibility: boolean;
  data: any[];
}

export default function ViewRatingModal({
  toggle,
  visibility,
  data,
}: ViewRatingProps) {
  return (
    <>
      <Modal centered isOpen={visibility} toggle={toggle} id="ratingModal">
        <ModalHeader toggle={toggle}>View Rating</ModalHeader>
        <ModalBody>
          <ul className="no-padding-left">
            {data?.map((d, i) => {
              return (
                <CardWrapper key={i.toString()}>
                  <div className="d-flex justify-content-between">
                    <h4>
                      {d?.title} ({d?.rating}%)
                    </h4>

                    <div className="progress w-25">
                      <div
                        className="progress-bar progress-bar-animated bg-success "
                        role="progressbar"
                        style={{ width: `${d?.rating}%` }}
                        aria-valuenow={d?.rating}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      ></div>
                    </div>
                  </div>

                  <br />

                  <ul className="no-padding-left">
                    <h5>Comments from students - </h5>
                    {d?.comments?.map((c: string, i: number) => (
                      <li key={c}>
                        {i + 1}. {c}
                      </li>
                    ))}
                  </ul>
                </CardWrapper>
              );
            })}
          </ul>
        </ModalBody>
      </Modal>
    </>
  );
}
