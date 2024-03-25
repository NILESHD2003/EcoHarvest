import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { sendOTP } from "../Slice/authSlice";
import { useNavigate } from "react-router-dom";

const Sign_up = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    console.log("handle Submit Signup");
    e.preventDefault();
    localStorage.setItem("signupData", JSON.stringify(formData));
    try {
      await dispatch(sendOTP(formData));
      navigate("/otp");
    } catch (error) {
      throw new error(error);
    }
  };
  return (
    <div className="login">
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="" className="form-label">
            Name
          </label>
          <input
            type="text"
            name="name"
            className="form-input"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="" className="form-label">
            Email
          </label>

          <input
            type="email"
            className="form-input"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="" className="form-label">
            password
          </label>

          <input
            type="password"
            name="password"
            className="form-input"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="" className="form-label">
            Confirm-Password
          </label>

          <input
            type="password"
            className="form-input"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn--green">
          Sing-up
        </button>
      </form>
    </div>
  );
};

export default Sign_up;
