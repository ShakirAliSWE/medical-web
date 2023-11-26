import React from "react";

import CONSULTATION_STATUS from "../../mock/consultation-status.json";
import CONSULTATION_TYPES from "../../mock/cosultation-types.json";

export default function DoctorPatientInfo(props) {
  return (
    <div className="mt-4">
      <div className="row">
        <div className="col-md-6">
          <DoctorPatientInfoItem title="Patient ID" value={props?.patientId} />
          <DoctorPatientInfoItem title="Patient Name" value={props?.name} />
          <DoctorPatientInfoItem title="Patient Age" value={props?.age} />
          <DoctorPatientInfoItem
            title="Consultation Type"
            value={CONSULTATION_TYPES[props?.type]}
          />
          <DoctorPatientInfoItem
            title="Patient Message"
            value={props?.message}
          />
        </div>
        <div className="col-md-6">
          <DoctorPatientInfoItem
            title="Consultation Status"
            value={CONSULTATION_STATUS[props?.status]}
          />
          <DoctorPatientInfoItem
            title="Consultation Session (s)"
            value={props?.consultationTime}
          />
          <DoctorPatientInfoItem
            title="Doctor Perceptions/Notes"
            value={props?.notes}
          />
        </div>
      </div>
      {props.status === 0 ? (
        <div className="row">
          <div className="col-md-12 text-end">
            <button
              onClick={props?.onDeclined || (() => {})}
              className="btn btn-danger me-1"
              style={{ width: 120 }}
            >
              Decline
            </button>
            <button
              onClick={props?.onAccepted || (() => {})}
              className="btn btn-success"
              style={{ width: 120 }}
            >
              Accept
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

const DoctorPatientInfoItem = ({ title, value }) => {
  return (
    <div className="mb-2">
      <div className="fw-bold">{title} : </div>
      <div>{value}</div>
    </div>
  );
};
