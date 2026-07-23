import React, { useState } from "react";
import axios from "axios";
import { FaMotorcycle } from "react-icons/fa";
import "../Css/DriverApplication.css";
import Swal from "sweetalert2";
function DriverApplication() {
  const [formData, setFormData] = useState({
    phone: "",
    city: "",
    vehicleType: "motorcycle",
    vehicleNumber: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:5000/api/applications/driver",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Swal.fire({
  icon: "success",
  title: "Application Submitted!",
  text: "Our admin will review your application shortly.",
  confirmButtonText: "Awesome!",
  confirmButtonColor: "#f4b400",
  background: "#ffffff",
  color: "#222",
});

      setFormData({
        phone: "",
        city: "",
        vehicleType: "motorcycle",
        vehicleNumber: "",
      });
    } catch (error) {
     Swal.fire({
  icon: "error",
  title: "Submission Failed",
  text:
    error.response?.data?.message ||
    "Something went wrong.",
  confirmButtonColor: "#d33",
});
    }
  };

  return (
    <div className="driver-page">

      <div className="driver-header">

        <div className="driver-icon">
          <FaMotorcycle />
        </div>

        <h1>Become a Driver</h1>

        <p>
          Deliver with Zenbaba and earn money on your own schedule.
        </p>

      </div>

      <form
        className="driver-form"
        onSubmit={handleSubmit}
      >

        <h2>Driver Application</h2>

        <div className="form-grid">

          <div className="input-box">

            <label>Phone Number</label>

            <input
              type="text"
              name="phone"
              placeholder="0912345678"
              value={formData.phone}
              onChange={handleChange}
              required
            />

          </div>

          <div className="input-box">

            <label>City</label>

            <input
              type="text"
              name="city"
              placeholder="Bahir Dar"
              value={formData.city}
              onChange={handleChange}
              required
            />

          </div>

          <div className="input-box">

            <label>Vehicle Type</label>

            <select
              name="vehicleType"
              value={formData.vehicleType}
              onChange={handleChange}
            >
              <option value="motorcycle">
                Motorcycle
              </option>

              <option value="car">
                Car
              </option>

              <option value="bicycle">
                Bicycle
              </option>
            </select>

          </div>

          <div className="input-box">

            <label>Vehicle Number</label>

            <input
              type="text"
              name="vehicleNumber"
              placeholder="AA-12345"
              value={formData.vehicleNumber}
              onChange={handleChange}
              required
            />

          </div>

        </div>

        <button
          className="submit-driver"
          type="submit"
        >
          Submit Application
        </button>

      </form>

    </div>
  );
}

export default DriverApplication;