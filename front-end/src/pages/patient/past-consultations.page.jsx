import React, { useEffect, useState } from "react";
import { serverRequestPost } from "../../utils/server-request";
import { PATIENT_ID } from "../../config/constants";
import PatientConsultations from "../../components/patient/patient-consultations";

export default function PastConsultationsPage() {
  const [pastConsultations, setPastConsultations] = useState([]);

  useEffect(() => {
    fetchPastConsultations();
  }, []);

  const fetchPastConsultations = async () => {
    await serverRequestPost(
      "patients/past-consultations",
      {
        patientId: PATIENT_ID,
      },
      (response) => {
        setPastConsultations(response.data);
        console.log("response", response);
      }
    );
  };

  return (
    <div className="container mt-4">
      <div className="text-center h4 fw-bold mb-3">
        PATIENT PAST CONSULTATIONS HISTORY
      </div>
      {!pastConsultations.length ? (
        <div className="p-5 m-5 h5 text-center text-muted">No record found</div>
      ) : null}
      <div className="row">
        <div className="col-md-12">
          {pastConsultations.map((pastConsultation, i) => (
            <PatientConsultations {...pastConsultation} key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
