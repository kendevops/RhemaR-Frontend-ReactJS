import React, { useState } from "react";
import { FaRegFilePdf } from "react-icons/fa";
import UploadPDFForSessionModal from "../../components/modals/UploadPDFForSessionModal";
import useToggle from "../../utility/hooks/useToggle";

type courseVideoProps = {
  data?: any;
};

const CoursePDF = ({ data }: courseVideoProps) => {
  const [isOpen, toggle] = useToggle();

  console.log("data", data);

  const domData = [
    "session 1",
    "session 2",
    "session 3",
    "session 4",
    "session 5",
  ];
  return (
    <div className="d-flex gap-5 align-items-start justify-content-between ">
      <div className="d-flex align-items-center gap-5 flex-wrap mt-5  ">
        {data?.map((ses: any, i: number) => {
          console.log(ses);

          return (
            <div key={i}>
              <div className="text-center">
                <a
                  href={ses?.data?.path}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaRegFilePdf style={{ fontSize: "60px", color: "red" }} />
                </a>
                <p className="text-2xl my-3">{ses.title}</p>
              </div>
            </div>
          );
        })}
      </div>
      {/* <div
        className="py-2 px-5 my-4 fw-bold mt-5 "
        style={{
          background: "#203864",
          color: "#fff",
          cursor: "pointer",
        }}
        onClick={() => toggle()}
      >
        + Add PDF
      </div>
      <UploadPDFForSessionModal isOpen={isOpen} toggle={toggle} /> */}
    </div>
  );
};

export default CoursePDF;
