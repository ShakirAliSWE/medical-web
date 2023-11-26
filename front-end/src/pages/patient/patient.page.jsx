import React, { useEffect, useState } from "react";
import PatientDoctor from "../../components/patient/patient-doctor";
import PatientModal from "../../components/patient/patient-modal";
import { serverRequestPost } from "../../utils/server-request";

import { timeNowUnix } from "../../utils/date-time";
import { PATIENT_ID } from "../../config/constants";
import { socketEmit, socketOn } from "../../utils/socket-io";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

export default function PatientPage() {
  const [consultations, setConsultations] = useState({});
  const [doctorId, setDoctorId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchLastConsultations();
    socketOn("patient", (data) => {
      if (data.channelName === "refresh-patient-countdown") {
        toast(data?.message);
        fetchLastConsultations();
      }
    });
  }, []);

  const fetchLastConsultations = async () => {
    await serverRequestPost(
      "patients/last-consultation",
      {
        patientId: PATIENT_ID,
      },
      (response) => {
        const { data } = response;
        setConsultations(data);
      }
    );
  };

  const handlerFormSubmit = async (data) => {
    let params = {
      ...data,
      patientId: PATIENT_ID,
      doctorId: doctorId,
      status: 0,
      requestAt: timeNowUnix(),
    };

    await serverRequestPost(
      "patients/add-request-consultation",
      params,
      (response) => {
        const { data, message } = response;
        setShowModal(false);
        setConsultations(data);
        socketEmit("doctor", { channelName: "refresh-consultations", ...data });
        toast.success(message);
      }
    );
  };

  const handlerButtonConsultation = (doctorId) => {
    setShowModal(true);
    setDoctorId(doctorId);
  };

  const handlerCountDownComplete = async () => {
    await serverRequestPost(
      "patients/expired-consultation",
      { id: consultations._id, status: 1 },
      (response) => {
        setConsultations({});
        socketEmit("doctor", { channelName: "refresh-consultations" });
        toast.error("Consultation Request has been Expired");
      }
    );
  };

  return (
    <>
      <div className="container mt-4">
        <div className="d-flex justify-content-between mb-5">
          <div className="h4 fw-bold">Welcom Back, Patient!</div>
          <div>
            <Link
              className="btn btn-success btn-custom btn-lg"
              to="../patient/past-consultations"
            >
              Past Consultations
            </Link>
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <PatientDoctor
            status={consultations.status}
            onClickConsultation={handlerButtonConsultation}
            countDown={consultations.requestAt}
            onCountDownComplete={handlerCountDownComplete}
          />
        </div>
      </div>

      <PatientModal
        showModal={showModal}
        onClose={setShowModal}
        onSubmit={handlerFormSubmit}
      />
    </>
  );
}
