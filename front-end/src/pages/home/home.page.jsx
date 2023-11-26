import React from "react";

import AVATAR_PATIENT from "../../assets/images/avatar-patient.webp";
import AVATAR_DOCTOR from "../../assets/images/avatar-doctor.webp";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="d-flex align-items-center justify-content-center vh-100 gap-2">
      <Link className="card card-home" to="../patient">
        <img src={AVATAR_PATIENT} width={220} alt="patient" />
        <span className="h4 fw-bold text-center mt-1">PATIENT</span>
      </Link>
      <Link className="card card-home" to="../doctor">
        <img src={AVATAR_DOCTOR} width={220} alt="doctor" />
        <span className="h4 fw-bold text-center mt-1">DOCTOR</span>
      </Link>
    </div>
  );
  // return (
  //   <div className="d-flex align-items-center justify-content-center vh-100 gap-2">
  //     <Link className="btn btn-primary btn-lg p-4" to="../patient">
  //       <div className="d-flex align-items-center justify-content-center gap-2">
  //         <IconPatient />
  //         <span>Patient</span>
  //       </div>
  //     </Link>
  //     <Link className="btn btn-primary btn-lg p-4" to="../doctor">
  //       <div className="d-flex align-items-center justify-content-center gap-2">
  //         <IconDoctor />
  //         <span>Doctor</span>
  //       </div>
  //     </Link>
  //   </div>
  // );
}
