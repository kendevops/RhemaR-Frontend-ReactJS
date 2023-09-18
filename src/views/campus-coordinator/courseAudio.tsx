import React, { useState } from "react";
import ReactPlayer from "react-player";
import UploadAudioForSessionModal from "../../components/modals/UploadAudioForSessionModal";
import useToggle from "../../utility/hooks/useToggle";

type courseVideoProps = {
  data?: any;
};

const CourseAudio = ({ data }: courseVideoProps) => {
  const [currentVideo, setCurrentVideo] = useState(0);
  const [isOpen, toggle] = useToggle();

  const domData = [
    "session 1",
    "session 2",
    "session 3",
    "session 4",
    "session 5",
  ];
  return (
    <div className="d-flex gap-5 align-items-start ">
      <div>
        {domData.map((ses, i) => {
          return (
            <div
              key={ses + i}
              className="py-2 px-5 mb-4 fw-semibold "
              style={{
                border: "2px solid #203864",
                background: `${currentVideo === i ? "#203864" : ""}`,
                color: `${currentVideo === i ? "#fff" : "#203864"}`,
                cursor: "pointer",
              }}
              onClick={() => setCurrentVideo(i)}
            >
              {ses}
            </div>
          );
        })}

        <div
          className="py-2 px-5 my-4 fw-bold mt-5 "
          style={{
            background: "#203864",
            color: "#fff",
            cursor: "pointer",
          }}
          onClick={() => toggle()}
        >
          + Add Audio
        </div>
      </div>

      <div
        style={{
          position: "relative",
          width: "80%",

          marginLeft: "30px",

          //   paddingTop: "56.25%" /* Player ratio: 100 / (1280 / 720) */,
        }}
      >
        <p className="mb-5 fw-bold text-2xl">Session 5 (Audio)</p>
        <ReactPlayer
          // url={watching}
          url={"https://soundcloud.com/miami-nights-1984/accelerated"}
          controls
          width="80%"
          //   height="100%"
        />
      </div>

      <UploadAudioForSessionModal isOpen={isOpen} toggle={toggle} />
    </div>
  );
};

export default CourseAudio;
