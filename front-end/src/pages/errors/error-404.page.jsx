import React from "react";
import { Link } from "react-router-dom";

export default function Error404() {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100">
      <div style={{ fontSize: "10em", fontWeight: 600, color: "red" }}>404</div>
      <div style={{ fontSize: "2em" }}>Page Not Found</div>
      <h5 className="mt-4">
        <Link to="/">Go to Home Page</Link>
      </h5>
    </div>
  );
}
