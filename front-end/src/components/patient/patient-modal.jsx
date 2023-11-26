import React from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { useForm } from "react-hook-form";

const OPTIONS_REQUEST_TYPE = [
  { label: "Initial Consultation", value: "initial-consultation" },
  { label: "Treatment", value: "treatment" },
  { label: "Post Treatment", value: "post-treatment" },
  { label: "Other", value: "other" },
];

export default function PatientModal({
  showModal,
  onClose = () => {},
  onSubmit = () => {},
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handlerClose = () => {
    onClose(false);
  };

  return (
    <Modal open={showModal} onClose={handlerClose} center>
      <h2 className="me-5">Consultation Information</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-2">
          <label htmlFor="name" className="form-label">
            Name:<b className="text-danger">*</b>
          </label>
          <input
            className="form-control"
            placeholder="Enter Name"
            {...register("name", { required: true })}
          />
          {errors.name && (
            <div className="text-danger">Please enter the name</div>
          )}
        </div>
        <div className="mb-2">
          <label htmlFor="age" className="form-label">
            Age:<b className="text-danger">*</b>
          </label>
          <input
            className="form-control"
            type="number"
            placeholder="27"
            {...register("age", { required: true })}
          />
          {errors.age && (
            <div className="text-danger">Please enter the age</div>
          )}
        </div>
        <div className="mb-2">
          <label htmlFor="type" className="form-label">
            Consultation Request Type:<b className="text-danger">*</b>
          </label>
          <select className="form-select" {...register("type")}>
            {OPTIONS_REQUEST_TYPE.map((option, i) => (
              <option key={i} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.type && (
            <div className="text-danger">Please select consultation type</div>
          )}
        </div>
        <div className="mb-2">
          <label htmlFor="message" className="form-label">
            Message:<b className="text-danger">*</b>
          </label>
          <textarea
            className="form-control"
            rows={5}
            placeholder="Describe the problem"
            {...register("message", { required: true })}
          ></textarea>
          {errors.message && (
            <div className="text-danger">Please Describe the problem</div>
          )}
        </div>

        <div className="mb-2 text-end">
          <button type="submit" className="btn btn-primary">
            Submit Information
          </button>
        </div>
      </form>{" "}
    </Modal>
  );
}
