const mongoose = require("mongoose");

const patientConsultationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  type: { type: String },
  patientId: { type: String },
  doctorId: { type: String },
  requestAt: { type: Number },
  message: { type: String },
  status: { type: Number }, //0 : Waiting, 1: Expired, 2: Accepted, 3:Declined, 4:Completed
  consultationTime: { type: Number },
  notes: { type: String },
});

const PatientConsultation = mongoose.model(
  "Patient_Consultation",
  patientConsultationSchema
);

module.exports = { PatientConsultation };
