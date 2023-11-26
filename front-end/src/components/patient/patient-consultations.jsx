import React from "react";
import { dateTimeFormat } from "../../utils/date-time";
import mockDoctor from "../../mock/doctors.json";

import CONSULTATION_STATUS from "../../mock/consultation-status.json";
import CONSULTATION_TYPES from "../../mock/cosultation-types.json";

export default function PatientConsultations(props) {
  return (
    <>
      <div className="card consultation-card p-4 mb-3">
        <div className="row">
          <div className="col-md-6">
            <PatientConsultationItem title="Request ID" value={props?._id} />
            <PatientConsultationItem
              title="Request At"
              value={dateTimeFormat(props?.requestAt)}
            />
            <PatientConsultationItem title="Patient Name" value={props?.name} />
            <PatientConsultationItem title="Patient Age" value={props?.age} />
            <PatientConsultationItem
              title="Consultation Type"
              value={CONSULTATION_TYPES[props?.type]}
            />
            <PatientConsultationItem
              title="Patient Message"
              value={props?.message}
            />
          </div>
          <div className="col-md-6">
            <PatientConsultationItem
              title="Doctor Name"
              value={mockDoctor?.name}
            />
            <PatientConsultationItem
              title="Consultation Status"
              value={CONSULTATION_STATUS[props?.status]}
            />
            <PatientConsultationItem
              title="Consultation Session (s)"
              value={props?.consultationTime}
            />
            <PatientConsultationItem
              title="Doctor Perceptions/Notes"
              value={props?.notes}
            />
          </div>
        </div>
      </div>
      <hr />
    </>
  );
}

const PatientConsultationItem = ({ title, value }) => {
  return (
    <div className="row mb-2">
      <div className="col-md-5 fw-bold">{title} :</div>
      <div className="col-md-7">{value}</div>
    </div>
  );
};
