import React from "react";
import Countdown from "react-countdown";
import { IconStar, IconStarFill } from "../icons";

import TimerCountDown from "../timer-count-down";
import { startCountDown } from "../../utils/date-time";

import AVATAR_DOCTOR from "../../assets/images/avatar-doctor.webp";
import mockDoctor from "../../mock/doctors.json";
import TimerStopWatch from "../timer-stopwatch";

export default function PatientDoctor({
  status = -1,
  countDown,
  onClickConsultation = () => {},
  onCountDownComplete = () => {},
}) {
  return (
    <div className="card doctor-card p-5 py-3 text-center">
      <div className="img mb-2">
        <img
          src={AVATAR_DOCTOR}
          width="120"
          className="rounded-circle"
          alt={mockDoctor?.name}
        />
      </div>
      <h4 className="fw-bold mb-0">Dr. {mockDoctor?.name}</h4>
      <small>{mockDoctor?.specialist}</small>
      <div className="doctor-ratings mt-2 mb-3">
        {[...Array(5)].map((_, i) =>
          i >= mockDoctor?.rating ? (
            <IconStar key={i} />
          ) : (
            <IconStarFill key={i} />
          )
        )}
      </div>
      {status === -1 || status === 1 || status === 3 || status === 4 ? (
        <div className="doctor-consultation">
          <button
            className="btn btn-primary text-uppercase btn-lg"
            onClick={() => onClickConsultation(mockDoctor?.id)}
          >
            Request consultation
          </button>
        </div>
      ) : null}

      {status === 2 ? <TimerStopWatch /> : null}

      {status === 0 ? (
        <Countdown
          date={startCountDown(countDown)}
          renderer={TimerCountDown}
          onComplete={() => {
            onCountDownComplete(mockDoctor?.id);
          }}
        />
      ) : null}
    </div>
  );
}
