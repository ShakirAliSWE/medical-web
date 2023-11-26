import React, { useEffect, useState } from "react";
import { serverRequestPost } from "./../../utils/server-request";
import DoctorModal from "../../components/doctor/doctor-modal";
import { DOCTOR_ID } from "../../config/constants";
import { socketOn } from "../../utils/socket-io";
import DoctorDataTable from "../../components/doctor/doctor-data-table";

export default function DoctorPage() {
  const [consultations, setConsultations] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchConsultations();
    socketOn("doctor", (data) => {
      if (data.channelName === "refresh-consultations") {
        fetchConsultations();
      }
    });
  }, []);

  const fetchConsultations = async () => {
    await serverRequestPost(
      "doctors/consultation-requests",
      {
        doctorId: DOCTOR_ID,
      },
      (response) => {
        const { data } = response;
        setConsultations(data);
      }
    );
  };

  const onRowClick = ({ id }) => {
    setSelectedId(id);
    setShowModal(true);
  };

  const findConsultation = (id) => {
    const data = consultations.filter(
      (consultation) => consultation._id === id
    );
    return data.length ? data[0] : {};
  };

  return (
    <>
      <div className="container mt-2 mb-2">
        <div className="text-center mb-4 mt-4">
          <h4 className="fw-bold">DOCTOR COSULTATION REQUEST</h4>
        </div>
        <DoctorDataTable rows={consultations} onClick={onRowClick} />
      </div>
      <DoctorModal
        content={findConsultation(selectedId)}
        showModal={showModal}
        setShowModal={setShowModal}
      />
    </>
  );
}
