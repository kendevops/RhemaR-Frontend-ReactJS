import React from "react";
import LinearProgress from "@mui/material/LinearProgress";

type ProgressBarMuiProps = {
  name: string;
  percentage?: number | undefined;
  progressColor?: string;
  progessNumber?: any;
  icon?: any;
  others?: any;
};

const ProgressBarMui = ({
  name,
  percentage,
  progressColor,
  progessNumber,
  icon,
  others,
}: ProgressBarMuiProps) => {
  return (
    <div className="bg-white r-card px-5 py-4 mb-4 bg-cap ">
      <div
        className="d-flex w-100 justify-content-between al align-items-center mb-2"
        style={{ fontWeight: 700 }}
      >
        <div className="d-flex gap-3 justify-content-center align-items-center ">
          {icon && (
            <div className="d-flex justify-content-center  align-items-center mb-3">
              {icon}
            </div>
          )}
          <p>{name}</p>
        </div>
        {percentage && <p>{percentage}%</p>}
        {progessNumber && <p>{progessNumber}</p>}
      </div>
      <div>
        <LinearProgress
          variant="determinate"
          value={percentage}
          sx={{
            backgroundColor: "#fff", // Set unfilled part color to white
            height: 10, // Increase height for a larger progress bar
          }}
          style={{ backgroundColor: progressColor }}
        />
      </div>
      {others}

      {/* <div className="progress" style={{ height: "10px" }}>
        <div
          className="progress-bar"
          role="progressbar"
          style={filledStyle}
        ></div>
      </div> */}
    </div>
  );
};

export default ProgressBarMui;
