import React from "react";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { MdCancel } from "react-icons/md";
import { Link } from "react-router-dom";

const LectureButton = (props) => {
  const { onClick, text, done, id } = props;

  return (
    <>
      <Link to={`/student/${id}`}>
        <button
          // onClick={toggle}
          className="btn btn-blue-800 btn-lg w-100  d-flex align-items-center justify-content-between position-relative my-3"
        >
          {text}{" "}
          <div style={{ position: "absolute", right: "15px", top: "10px" }}>
            {done ? (
              <BsFillCheckCircleFill
                style={{ color: "green", fontSize: "23px" }}
              />
            ) : (
              <MdCancel style={{ color: "red", fontSize: "23px" }} />
            )}
          </div>
        </button>
      </Link>
    </>
  );
};

export default LectureButton;
