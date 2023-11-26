import React from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import DoctorPatientInfo from "./doctor-patient-info";
import { useNavigate } from "react-router-dom";
import { serverRequestPost } from "../../utils/server-request";
import { socketEmit } from "../../utils/socket-io";

export default function DoctorModal({
  content = {},
  showModal,
  setShowModal = () => {},
}) {
  const navigate = useNavigate();

  const handlerClose = () => {
    setShowModal(false);
  };

  const handlerSocket = (message = "") => {
    socketEmit("doctor", {
      channelName: "refresh-consultations",
    });
    socketEmit("patient", {
      channelName: "refresh-patient-countdown",
      message: message,
    });
  };

  const handlerButtonAccept = async () => {
    await serverRequestPost(
      "doctors/consultation-accepted",
      {
        id: content?._id,
      },
      () => {
        handlerSocket("Consultation request has been accepted");
        navigate(`../doctor/${content?._id}`, { replace: true });
      }
    );
  };

  const handlerButtonDecline = async () => {
    await serverRequestPost(
      "doctors/consultation-declined",
      {
        id: content?._id,
      },
      (response) => {
        setShowModal(false);
        handlerSocket("Consultation request has been declined");
        navigate("../doctor", { replace: true });
      }
    );
  };

  return (
    <Modal open={showModal} onClose={handlerClose} center>
      <h2>Consultation Request</h2>
      <DoctorPatientInfo
        {...content}
        onAccepted={handlerButtonAccept}
        onDeclined={handlerButtonDecline}
      />
    </Modal>
  );
}
