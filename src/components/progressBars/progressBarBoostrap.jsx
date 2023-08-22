import React from "react";
import LinearProgress from "@mui/material/LinearProgress";

// type ProgressBarMuiProps = {
//   name: string;
//   percentage: number | undefined;
//   progressColor: string;
// };

const ProgressBarBootstrap = ({ name, percentage, progressColor }) => {
  return (
    <div className="p-5">
      <p>{name}</p>
      <div className="progress">
        <div
          className="progress-bar"
          role="progressbar"
          style={{ width: `${percentage}%`, backgroundColor: progressColor }}
          aria-valuenow={percentage}
          aria-valuemin="0"
          aria-valuemax="100"
        ></div>
      </div>
    </div>
  );
};

export default ProgressBarBootstrap;
