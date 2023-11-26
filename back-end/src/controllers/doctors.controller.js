const { PatientConsultation } = require("../models/patients.model");

const consultationRequests = async (req, res) => {
  try {
    const { doctorId } = req.body;

    if (!doctorId) {
      return res.json({
        status: "error",
        message: "Invalid Params, Please provide a valid parameters",
      });
    }

    const data = await PatientConsultation.find({
      doctorId: doctorId,
    }).sort({ _id: -1 });

    res.json({
      status: "success",
      message: "Record fetch successfully",
      data: data,
    });
  } catch (error) {
    res.status(500).json({ staus: "error", message: "Internal Server Error" });
  }
};

const consultationAccepeted = async (req, res) => {
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
      { status: 2 },
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
      message: "Consulatation request accepted successfully",
    });
  } catch (error) {
    res.status(500).json({ staus: "error", message: "Internal Server Error" });
  }
};

const consultationDeclined = async (req, res) => {
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
      { status: 3 },
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
      message: "Consulatation request declined successfully",
    });
  } catch (error) {
    res.status(500).json({ staus: "error", message: "Internal Server Error" });
  }
};

const consultationCompleted = async (req, res) => {
  try {
    const { id, consultationTime, notes } = req.body;

    if (!id || !consultationTime) {
      return res.json({
        status: "error",
        message: "Invalid Params, Please provide a valid parameters",
      });
    }

    const result = await PatientConsultation.findByIdAndUpdate(
      id,
      { consultationTime, notes, status: 4 },
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
      message: "Consulatation request declined successfully",
    });
  } catch (error) {
    res.status(500).json({ staus: "error", message: "Internal Server Error" });
  }
};

module.exports = {
  consultationRequests,
  consultationAccepeted,
  consultationDeclined,
  consultationCompleted,
};
