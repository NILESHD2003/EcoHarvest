import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginAsync } from "../Slice/authSlice";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [values, setValues] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      const { email, password } = values;
      await dispatch(loginAsync({ email, password }));
      navigate("/home"); // Navigate to home page after successful login
    } catch (error) {
      // Handle login error
      console.error("Login error:", error);
    }
  };

  return (
    <div className="login">
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="" className="form-label">
            email
          </label>
          <input
            type="email"
            value={values.email}
            name="email"
            onChange={handleChange}
            className="form-input"
            placeholder="email"
          ></input>
        </div>
        <div className="form-group">
          <label htmlFor="" className="form-label">
            password
          </label>
          <input
            type="password"
            value={values.password}
            className="form-input"
            name="password"
            onChange={handleChange}
            placeholder="Password"
          ></input>
        </div>
        <button type="submit" className="btn btn--green">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
