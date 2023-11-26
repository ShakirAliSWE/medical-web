import React from "react";
import { useStopwatch } from "react-timer-hook";
import { formatDigits } from "../utils/format-digits";

export default function TimerStopWatch({
  autoStart = true,
  setStart = () => {},
  setPause = () => {},
  getSeconds = () => {},
}) {
  const { totalSeconds, seconds, minutes, hours, start } = useStopwatch({
    autoStart,
  });

  setStart(start);
  setPause(start);
  getSeconds(totalSeconds);

  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: "3em" }}>
        <span>{formatDigits(hours)}</span>:<span>{formatDigits(minutes)}</span>:
        <span>{formatDigits(seconds)}</span>
      </div>
    </div>
  );
}
