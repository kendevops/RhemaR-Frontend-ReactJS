import { useEffect, useState } from "react";
import { Clock } from "react-feather";

type TimerProps = {
  onEnd: VoidFunction;
};

export default function Timer({ onEnd }: TimerProps) {
  let [sec, setSec] = useState(3600);
  let secs = sec % 60;
  let mins = Math.floor(sec / 60);

  let seconds = secs.toString();
  let minutes = mins.toString();

  // if (mins < 10) {
  //   minutes = `0${mins}`;
  // }

  // if (secs < 10) {
  //   minutes = `0${secs}`;
  // }

  if (secs === 0) {
    minutes = `00`;
    seconds = `00`;
    onEnd();
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setSec((p) => p - 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  });

  return (
    <div className="d-flex align-items-center rounded-4 text-white bg-blue-800 py-3 px-5 gap-3">
      <span>
        <Clock color="#fff" />
      </span>
      <time>
        {minutes}:{seconds}
      </time>
    </div>
  );
}
