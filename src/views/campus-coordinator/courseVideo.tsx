import React, { useState } from "react";
import ReactPlayer from "react-player";
import UploadVideoForSessionModal from "../../components/modals/UploadVideoForSessionModal";
import useToggle from "../../utility/hooks/useToggle";

type courseVideoProps = {
  data?: any;
};

const CourseVideo = ({ data }: courseVideoProps) => {
  const [currentVideo, setCurrentVideo] = useState(0);
  const [watching, setWatching] = useState(data ? data[0]?.video?.path : "");
  const [currentSession, setCurrentSession] = useState(
    data ? data[0]?.name : ""
  );

  const [isOpen, toggle] = useToggle();

  return (
    <div className="d-flex gap-5 align-items-start ">
      <div>
        {data?.map((ses: any, i: number) => {
          return (
            <div
              key={ses.id}
              className="py-2 px-5 mb-4 fw-semibold "
              style={{
                border: "2px solid #203864",
                background: `${currentVideo === i ? "#203864" : ""}`,
                color: `${currentVideo === i ? "#fff" : "#203864"}`,
                cursor: "pointer",
              }}
              onClick={() => {
                setCurrentVideo(i);
                setWatching(ses?.video?.path);
                setCurrentSession(ses?.name);
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
          + Add Video
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
        <p className="mb-5 fw-bold text-2xl">
          {currentSession ? currentSession : "No"} (Video)
        </p>
        <ReactPlayer
          url={watching}
          // url={"https://youtu.be/CAavJmWDKkc?si=0nCubdqFQVVbG-wn"}
          // url={"https://youtu.be/m3kYb-vUMXQ?si=nqqLxSyU_lBSyVv_"}
          controls
          width="80%"
          //   height="100%"
        />
      </div>

      <UploadVideoForSessionModal isOpen={isOpen} toggle={toggle} />
    </div>
  );
};

export default CourseVideo;
