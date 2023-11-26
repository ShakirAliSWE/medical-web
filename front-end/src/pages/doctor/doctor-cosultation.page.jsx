import React, { useEffect, useState } from "react";
import TimerStopWatch from "../../components/timer-stopwatch";
import { useNavigate, useParams } from "react-router-dom";
import { serverRequestPost } from "../../utils/server-request";
import { socketEmit } from "../../utils/socket-io";

export default function DoctorConsultationPage() {
  const navigate = useNavigate();
  const { id = null } = useParams();
  const [notes, setNotes] = useState("");
  const [consultationSeconds, setConsultationSeconds] = useState(0);

  useEffect(() => {
    fetchConsultationSession();
  }, []);

  const fetchConsultationSession = () => {};

  const handlerEndConsultation = async () => {
    await serverRequestPost(
      "doctors/consultation-completed",
      {
        id,
        notes,
        consultationTime: consultationSeconds,
      },
      () => {
        socketEmit("patient", {
          channelName: "refresh-patient-countdown",
          message: "Consultation has been completed",
        });
        navigate("../../doctor", { replace: true });
      }
    );
  };

  return (
    <div className="container mt-2 mb-2 d-flex justify-content-center">
      <div className="d-flex flex-column">
        <div className="mb-3">
          <TimerStopWatch getSeconds={setConsultationSeconds} />
        </div>
        <div className="mb-3">
          <label htmlFor="notes" className="form-label fw-bold">
            Notes/Prescription :
          </label>
          <textarea
            className="form-control"
            rows={8}
            cols={80}
            id="notes"
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Enter Notes/Prescription"
          ></textarea>
        </div>
        <div className="mb-3 text-center">
          <button
            className="btn btn-primary"
            style={{ width: 220 }}
            onClick={handlerEndConsultation}
          >
            End Consultation
          </button>
        </div>
      </div>
    </div>
  );
}
