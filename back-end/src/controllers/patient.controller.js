const { PatientConsultation } = require("../models/patients.model");

const addRequestConsultation = async (req, res) => {
  try {
    const { name, age, type, patientId, doctorId, requestAt, status, message } =
      req.body;

    if (!name || !age || !patientId || !doctorId) {
      return res.json({
        status: "error",
        message: "Invalid Params, Please provide a valid parameters",
      });
    }

    const result = new PatientConsultation({
      name,
      age,
      type,
      patientId,
      doctorId,
      requestAt,
      status,
      message,
    });

    await result.save();
    const data = await PatientConsultation.findById(result._id);

    res.json({
      status: "success",
      message: "Consulatation request generated successfully",
      data: data,
    });
  } catch (error) {
    res.status(500).json({ staus: "error", message: "Internal Server Error" });
  }
};

const expiredConsultation = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.json({
        status: "error",
        message: "Invalid Params, Please provide a valid parameters",
      });
    }

    const result = await PatientConsultation.findByIdAndUpdate(
      id,
      { status: 1 },
      { new: true }
    );

    if (!result) {
      return res.json({
        status: "error",
        message: "Invalid Id, Unable to find the patient consultation",
      });
    }

    res.json({
      status: "success",
      message: "Consulatation request updated successfully",
    });
  } catch (error) {
    res.status(500).json({ staus: "error", message: "Internal Server Error" });
  }
};

const lastConsultation = async (req, res) => {
  try {
    const { patientId } = req.body;

    if (!patientId) {
      return res.json({
        status: "error",
        message: "Invalid Params, Please provide a valid parameters",
      });
    }

    const data = await PatientConsultation.findOne({
      patientId: patientId,
    }).sort({ _id: -1 });

    if (!data) {
      return res.json({
        status: "error",
        message: "No record found",
        data: {},
      });
    }

    res.json({
      status: "success",
      message: "Record fetch successfully",
      data: data,
    });
  } catch (error) {
    res.status(500).json({ staus: "error", message: "Internal Server Error" });
  }
};

const pastConsultations = async (req, res) => {
  try {
    const { patientId } = req.body;

    if (!patientId) {
      return res.json({
        status: "error",
        message: "Invalid Params, Please provide a valid parameters",
      });
    }

    const data = await PatientConsultation.find({
      patientId: patientId,
    }).sort({ _id: -1 });

    if (!data) {
      return res.json({
        status: "error",
        message: "No record found",
        data: {},
      });
    }

    res.json({
      status: "success",
      message: "Record fetch successfully",
      data: data,
    });
  } catch (error) {
    res.status(500).json({ staus: "error", message: "Internal Server Error" });
  }
};

module.exports = {
  addRequestConsultation,
  expiredConsultation,
  lastConsultation,
  pastConsultations,
};
