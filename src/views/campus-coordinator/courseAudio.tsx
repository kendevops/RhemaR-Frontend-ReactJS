import React, { useState } from "react";
import ReactPlayer from "react-player";
import UploadAudioForSessionModal from "../../components/modals/UploadAudioForSessionModal";
import useToggle from "../../utility/hooks/useToggle";

type courseAudioProps = {
  data?: any;
};

const CourseAudio = ({ data }: courseAudioProps) => {
  const [currentAudio, setCurrentAudio] = useState(0);
  const [watching, setWatching] = useState(data ? data[0]?.audio?.path : "");
  const [currentSession, setCurrentSession] = useState(
    data ? data[0]?.name : ""
  );
  const [currentAudioName, setCurrentAudioName] = useState(
    data ? data[0]?.audio?.name : ""
  );
  const [isOpen, toggle] = useToggle();

  console.log(data);

  return (
    <div className="d-flex gap-5 align-items-start ">
      <div>
        {data.map((ses: any, i: number) => {
          return (
            <div
              key={ses.id}
              className="py-2 px-5 mb-4 fw-semibold "
              style={{
                border: "2px solid #203864",
                background: `${currentAudio === i ? "#203864" : ""}`,
                color: `${currentAudio === i ? "#fff" : "#203864"}`,
                cursor: "pointer",
              }}
              onClick={() => {
                setCurrentAudio(i);
                setWatching(ses?.audio?.path);
                setCurrentSession(ses?.name);
                setCurrentAudioName(ses?.audio?.name);
              }}
            >
              {ses.name}
            </div>
          );
        })}

        {/* <div
          className="py-2 px-5 my-4 fw-bold mt-5 "
          style={{
            background: "#203864",
            color: "#fff",
            cursor: "pointer",
          }}
          onClick={() => toggle()}
        >
          + Add Audio
        </div> */}
      </div>

      <div
        style={{
          position: "relative",
          width: "80%",

          marginLeft: "30px",

          //   paddingTop: "56.25%" /* Player ratio: 100 / (1280 / 720) */,
        }}
      >
        <p className="mb-3 fw-bold text-2xl">
          {currentSession ? currentSession : "No"} (Audio)
        </p>
        <p className="mb-5 text-2xl">{currentAudioName}</p>

        <ReactPlayer
          url={watching}
          // url={"https://soundcloud.com/miami-nights-1984/accelerated"}
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
