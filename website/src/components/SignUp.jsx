import { useState } from "react";
import Mockdata from "../apis/Mockdata";

export default function SignUp() {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleInputChange = (event) => {
    /* event.persist(); NO LONGER USED IN v.17*/
    event.preventDefault();

    const { name, value } = event.target;
    setValues((values) => ({
      ...values,
      [name]: value
    }));
  };

  const [submitted, setSubmitted] = useState(false);
  const [valid, setValid] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (values.username && values.email && values.password) {
      setValid(true);
      try {
        const requestData = {
            username: values.username,
            email: values.email,
            password: values.password,
        };
      
        const response = await Mockdata.post(`/register`, requestData);
      
        console.log("POST request successful");
        console.log("Response:", response.data);
      } catch (error) {
        console.error("Error sending POST request:", error);
      }    
    }
    setSubmitted(true);
  };

  return (
    <div className="form-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h1 className='form-title'>Create a new user!</h1>
        <h2>Already have an account? <a href="/">Login here</a></h2>

        {submitted && valid && (
          <div className="success-message">
            <h3>
              Congratulations {values.username}!
            </h3>
            <div> User created successfully! </div>
            <a href="/">Login</a>
            <br />
          </div>
        )}

        {submitted && !valid && (
          <div className="error-message">
            <span>Form submission failed. Please fill in all the required fields.</span>
          </div>
        )}

        {!valid && (
          <input
            className="form-field form-input"
            type="text"
            placeholder="Enter username"
            name="username"
            value={values.username}
            onChange={handleInputChange}
          />
        )}

        {submitted && !values.username && (
          <span className="form-span" id="last-name-error">Please enter username</span>
        )}

        {!valid && (
          <input
            className="form-field form-input"
            type="email"
            placeholder="Email"
            name="email"
            value={values.email}
            onChange={handleInputChange}
          />
        )}

        {submitted && !values.email && (
          <span className="form-span" id="email-error">Please enter email address</span>
        )}

        {!valid && (
            <input
            className="form-field form-input"
            type="password"
            placeholder="Password"
            name="password"
            value={values.password}
            onChange={handleInputChange}
          />
        )}

        {submitted && !values.password && (
            <span className="form-span" id="password-error">Please enter password</span>
        )}

        {!valid && (
          <button className="form-field form-button" type="submit">
            Register
          </button>
        )}
      </form>
    </div>
  );
}
