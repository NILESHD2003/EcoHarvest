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
  const handleClick = () => {
    navigate("/sign_up");
  };
  const onSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      const { email, password } = values;
      await dispatch(loginAsync({ email, password }));
      setTimeout(() => {
        navigate("/home");
      }, 2000);
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
        <p className="form__text">
          Don't have an account?{" "}
          <a onClick={handleClick} className=" green">
            Sign Up
          </a>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
