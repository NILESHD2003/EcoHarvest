# EcoHarvest APIs

This document provides an overview of the EcoHarvest API, which is used for user authentication.

## Base URL

The base URL for all endpoints is:

```
https://ecoharvest.onrender.com
```

## Endpoints

### Server Status

- **Summary:** Check server status.
- **HTTP Method:** GET
- **Path:** `/`
- **Responses:**
  - **200:** Server health
    - **Content:** `application/json`
      ```json
      {
        "success": true,
        "status": "normal",
        "message": "Service is Up"
      }
      ```

### User Login

- **Summary:** Authenticate user
- **HTTP Method:** POST
- **Path:** `/api/v1/auth/login`
- **Request Body:**
  - `email`: User's email (string)
  - `password`: User's password (string, format: password)
- **Responses:**
  - **200:** User logged in successfully
    - **Content:** `application/json`
      ```json
      {
        "access_token": "JWT token"
      }
      ```
  - **401:** Unauthorized - Invalid credentials
  - **404:** User is not registered. Please sign up to continue.

### User Signup

- **Summary:** Register new user.
- **HTTP Method:** POST
- **Path:** `/api/v1/auth/signup`
- **Request Body:**
  - `name`: User's name (string)
  - `email`: User's email (string)
  - `password`: User's password (string, format: password)
  - `confirmPassword`: Confirm user's password (string, format: password)
  - `otp`: OTP sent to email address (string)
- **Responses:**
  - **200:** User created successfully
    - **Content:** `application/json`
      ```json
      {
        "access_token": "JWT token"
      }
      ```
  - **400:** Missing fields
  - **422:** Password and Confirm Password must be the same.
  - **401:** Unauthorized - Invalid OTP
  - **409:** User already exists. Please sign in to continue.

### Send OTP

- **Summary:** Send OTP to user's email.
- **HTTP Method:** POST
- **Path:** `/api/v1/auth/send-otp`
- **Request Body:**
  - `email`: User's email (string)
- **Responses:**
  - **200:** OTP sent successfully
    - **Content:** `application/json`
      ```json
      {
        "access_token": "JWT token"
      }
      ```
  - **401:** Unauthorized - User already exists.
