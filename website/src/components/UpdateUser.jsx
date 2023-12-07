import { useState } from "react";
import Mockdata from "../apis/Mockdata";
import { useParams } from "react-router-dom";

export default function UpdateUser() {
    const { id } = useParams();
    console.log(id);
    const [values, setValues] = useState({
        first_name: "",
        last_name: "",
        email: "",
        gender: "",
        avatar: "",
        domain: "",
        available: "",
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
        if (values.first_name && values.last_name && values.email && values.gender && values.avatar && values.domain && values.available) {
        setValid(true);
        try {
            const requestData = {
            first_name: values.first_name,
            last_name: values.last_name,
            email: values.email,
            gender: values.gender,
            avatar: values.avatar,
            domain: values.domain,
            available: Boolean(values.available),
            };
        
            const response = await Mockdata.put(`/${id}`, requestData);
        
            console.log("PUT request successful");
            console.log("Response:", response.data);
        } catch (error) {
            console.error("Error sending PUT request:", error);
        }    
        }
        setSubmitted(true);
    };

    return (
        <div className="form-container">
        <form className="register-form" onSubmit={handleSubmit}>
            <h1 className='form-title'>Update User Details!</h1>

            {submitted && valid && (
            <div className="success-message">
                <h3>
                Congratulations {values.first_name}!
                </h3>
                <div> User updated successfully! </div>
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
                placeholder="First Name"
                name="first_name"
                value={values.first_name}
                onChange={handleInputChange}
            />
            )}

            {submitted && !values.first_name && (
            <span className="form-span" id="first-name-error">Please enter first name</span>
            )}

            {!valid && (
            <input
                className="form-field form-input"
                type="text"
                placeholder="Last Name"
                name="last_name"
                value={values.last_name}
                onChange={handleInputChange}
            />
            )}

            {submitted && !values.last_name && (
            <span className="form-span" id="last-name-error">Please enter last name</span>
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
            <select
                className="form-field form-input"
                name="gender"
                value={values.gender}
                onChange={handleInputChange}
            >
                <option value="" disabled selected hidden>
                Select Gender
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Agender">Agender</option>
                <option value="Bigender">Bigender</option>
                <option value="Polygender">Polygender</option>
                <option value="Non-binary">Non-binary</option>
                <option value="Genderfluid">Genderfluid</option>
                <option value="Genderqueer">Genderqueer</option>
            </select>
            )}

            {submitted && !values.gender && (
            <span className="form-span" id="gender-error">Please select your gender</span>
            )}

            {!valid && (
            <input
                className="form-field form-input"
                type="text"
                placeholder="Avatar Link"
                name="avatar"
                value={values.avatar}
                onChange={handleInputChange}
            />
            )}

            {submitted && !values.avatar && (
            <span className="form-span" id="avatar-error">Please add an avatar link</span>
            )}

            {!valid && (
            <select
                className="form-field form-input"
                name="domain"
                value={values.domain}
                onChange={handleInputChange}
            >
                <option value="" disabled selected hidden>
                Select Domain
                </option>
                <option value="Sales">Sales</option>
                <option value="Finance">Finance</option>
                <option value="Marketing">Marketing</option>
                <option value="IT">IT</option>
                <option value="Management">Management</option>
                <option value="UI Designing">UI Designing</option>
                <option value="Business Development">Business Development</option>
            </select>
            )}

            {submitted && !values.gender && (
            <span className="form-span" id="domain-error">Please select your gender</span>
            )}

            {!valid && (
            <select
                className="form-field form-input"
                type="text"
                placeholder="Availability"
                name="available"
                value={values.available.toString()}
                onChange={handleInputChange}
            >
                <option value="" disabled hidden>
                Select Availability
                </option>
                <option value={true}>Available</option>
                <option value={false}>Not Available</option>
            </select>
            )}

            {submitted && values.available === undefined && (
            <span className="form-span" id="available-error">Please select availability</span>
            )}

            {!valid && (
            <button className="form-field form-button" type="submit">
                Update
            </button>
            )}
        </form>
        </div>
    );
}
