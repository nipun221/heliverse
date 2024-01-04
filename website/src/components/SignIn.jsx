import { useState } from "react";
import Mockdata from "../apis/Mockdata";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
    const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
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
    if (values.username && values.password) {
      setValid(true);
      try {
        const requestData = {
            username: values.username,
            email: values.email,
            password: values.password,
        };
      
        const response = await Mockdata.post(`/login`, requestData);
      
        console.log("POST request successful");
        localStorage.setItem('token', response.data.accessToken);
      } catch (error) {
        console.error("Error sending POST request:", error);
      }    
    }
    setSubmitted(true);
    navigate(`/dashboard`);
  };

  return (
    <div className="form-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h1 className='form-title'>Login</h1>
        <h2>New user? <a href="/register">Sign up here</a></h2>

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
            Login
          </button>
        )}
      </form>
    </div>
  );
}
