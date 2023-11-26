import React from "react";
import { formatDigits } from "../utils/format-digits";

export default function TimerCountDown({ hours, minutes, seconds, completed }) {
  if (!completed)
    return (
      <TimerCountDownUI hours={hours} minutes={minutes} seconds={seconds} />
    );
}

const TimerCountDownUI = ({ hours, minutes, seconds }) => {
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: "2em" }}>
        <span>{formatDigits(hours)}</span>:<span>{formatDigits(minutes)}</span>:
        <span>{formatDigits(seconds)}</span>
      </div>
    </div>
  );
};
