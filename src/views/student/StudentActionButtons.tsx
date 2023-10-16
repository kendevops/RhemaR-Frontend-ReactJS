import React, { useEffect, useState } from "react";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { MdCancel } from "react-icons/md";
import { Link } from "react-router-dom";
import useToggle from "../../utility/hooks/useToggle";
import LevelClearanceModal from "../../components/modals/ClearanceModal";
import RequestRBTCTranscript from "../../components/modals/RequestRBTCTranscriptModal";
import ApplyForLevel2Modal from "../../components/modals/ApplyForLevel2Modal";
import CareReplacementModal from "../../components/modals/CardReplacementModal";
import TranscriptModal from "../../components/modals/TranscriptModal";

const StudentActionButtons = ({ level }: any) => {
  //   const { onClick, text, done, id } = props;
  const [showClearanceModal, setShowClearanceModal] = useState(false);
  const [showRequestRBTCTranscript, setShowRequestRBTCTranscript] =
    useState(false);
  const [showApplyForLevel2, setShowApplyForLevel2] = useState(false);

  const [visibility, toggle] = useToggle();
  const [isCardReplacementVisibility, toggleCardReplacement] = useToggle();

  const cancelModelVisibility = () => {
    setShowClearanceModal(() => false);
    setShowRequestRBTCTranscript(() => false);
    setShowApplyForLevel2(() => false);
  };

  useEffect(() => {
    if (!visibility) {
      cancelModelVisibility();
    }
  }, [visibility]);

  return (
    <div className="d-flex align-items-start justify-content-between gap-5">
      <div className="d-flex align-items-center gap-4  w-100 flex-wrap ">
        <div>
          <button
            onClick={() => {
              toggle();
              setShowClearanceModal(() => true);
            }}
            className="btn btn-blue-800 btn-lg w-100  d-flex align-items-center justify-content-between"
          >
            {level === "Level 2"
              ? "Apply For L2 Clearance"
              : "Apply For L1 Clearance"}
          </button>
          {showClearanceModal && (
            <LevelClearanceModal
              toggle={toggle}
              visibility={visibility}
              level={level}
            />
          )}
        </div>
        <div>
          <button
            // onClick={toggle}
            className="btn btn-blue-800 btn-lg w-100  d-flex align-items-center justify-content-between"
          >
            {level === "Level 2"
              ? "Apply For L2 Deferment"
              : "Apply For L1 Deferment"}
          </button>
          {/* <StudentFeedbackModal
                      {...{ formValues, isOpen, toggle, courseId: classId }}
                    /> */}
        </div>

        <div>
          <button
            onClick={() => {
              toggle();
              if (level === "Level 2") {
                setShowRequestRBTCTranscript(() => true);
              }

              if (level === "Level 1") {
                setShowApplyForLevel2(() => true);
              }
            }}
            className="btn btn-blue-800 btn-lg w-100  d-flex align-items-center justify-content-between"
          >
            {level === "Level 2" ? "Apply For Transcript" : "Apply For Level 2"}
          </button>
          {level === "Level 2" && showRequestRBTCTranscript && (
            // <RequestRBTCTranscript toggle={toggle} visibility={visibility} />
            <TranscriptModal toggle={toggle} visibility={visibility} />
          )}

          {level === "Level 1" && showApplyForLevel2 && (
            <ApplyForLevel2Modal toggle={toggle} visibility={visibility} />
          )}
        </div>
      </div>

      <div className="d-flex align-items-center justify-content-start w-100">
        <div className="">
          <button
            onClick={() => {
              toggleCardReplacement();
            }}
            className="btn btn-blue-800 btn-lg w-100  d-flex align-items-center justify-content-between"
          >
            Apply For ID Card Replacement
          </button>
          <CareReplacementModal
            visibility={isCardReplacementVisibility}
            toggle={toggleCardReplacement}
          />
        </div>
      </div>
    </div>
  );
};

export default StudentActionButtons;
