import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { confirmOTP } from "../Slice/authSlice";
import { useNavigate } from "react-router-dom";

const Otp = () => {
  let [otp, setOTP] = useState(["", "", "", ""]); // Array to store each character of the OTP
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChange = (e, index) => {
    const { value } = e.target;
    // Ensure that only alphanumeric characters are entered
    if (/^[a-zA-Z0-9]*$/.test(value) || value === "") {
      const newOTP = [...otp];
      newOTP[index] = value.toUpperCase().slice(0, 1); // Convert to uppercase and only keep the first character
      setOTP(newOTP);
      // Focus on the next input field if the current field is not empty
      if (value !== "" && index < 3) {
        document.getElementById(`otpInput${index + 1}`).focus();
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const signupData = JSON.parse(localStorage.getItem("signupData"));
    const Enteredotp = otp.join(""); // Retrieve form data from local storage
    if (signupData) {
      const { name, email, password } = signupData;
      const confirmPassword = password;
      try {
        dispatch(
          confirmOTP({ name, email, password, confirmPassword, Enteredotp })
        );
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } catch (error) {
        throw new Error(error);
      }
    }
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit} className="otp">
        <h3>OTP</h3>
        <div>
          {otp.map((value, index) => (
            <input
              key={index}
              type="text"
              value={value}
              maxLength="1"
              className="otp--input"
              onChange={(e) => handleChange(e, index)}
              id={`otpInput${index}`}
            />
          ))}
        </div>
        <button type="submit" className="otp--btn btn--green">
          Confirm OTP
        </button>
      </form>
    </div>
  );
};

export default Otp;
