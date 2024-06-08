import React, { useState } from "react";
import axios from "axios";
import { CiImageOn } from "react-icons/ci";
import { IoMdAdd } from "react-icons/io";
import { useAuthContext } from "../../hooks/useAuthContext";

function SignUp() {
    const {dispatch} = useAuthContext();
  const [formData, setFormData] = useState({
    name: "",
    familyName: "",
    email: "",
    status: "",
    government: "",
    password: "",
    image: null,
  });

  const handleChange = (e) => {
    if (e.target.type === "file") {
      setFormData((prevState) => ({ ...prevState, image: e.target.files[0] }));
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      // Append form data fields
      formDataToSend.append("name", formData.name);
      formDataToSend.append("familyName", formData.familyName);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("status", formData.status);
      formDataToSend.append("government", formData.government);
      formDataToSend.append("password", formData.password);
      // Append the image file
      if (formData.image) {
        formDataToSend.append("image", formData.image);
        formDataToSend.append("img", "http://localhost:5000/uploads/usersimg/"+formData.image.name);
      }
  
      const response = await axios.post(
        "http://localhost:5000/user/signup",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      dispatch({type: "LOGIN",payload: response.data})
        localStorage.setItem("auth",JSON.stringify(response.data));
    } catch (error) {
      console.error("Error signing up:", error.response.data.error);
    }
  };
  
  

  return (
    <div className="wrapf">
      <section className="containers">
        <header>Registration Form</header>
        <form onSubmit={handleSubmit} className="form">
          <div className="input-box">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter name"
              required
            />
          </div>
          <div className="input-box">
            <label>Family Name</label>
            <input
              type="text"
              name="familyName"
              value={formData.familyName}
              onChange={handleChange}
              placeholder="Enter family name"
              required
            />
          </div>
          <div className="input-box">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email address"
              required
            />
          </div>
          <div className="input-box">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>
          <label className="input--image" htmlFor="inputTag">
            <IoMdAdd className="plus--icon icon" />
            <span>
              <CiImageOn className="icon" />
            </span>
            <input
              type="file"
              id="inputTag"
              accept="image/png, image/jpg, image/gif, image/jpeg"
              onChange={handleChange} // Handle file selection
            />
            <p>{formData.image && formData.image.name}</p>{" "}
            {/* Display selected file name */}
          </label>
          <div className="gender-box">
            <h3>Are you a</h3>
            <div className="gender-option">
              <div className="input df">
                <input
                  type="radio"
                  name="status"
                  id="freelancer"
                  value="available for work"
                  checked={formData.status === "available for work"}
                  onChange={handleChange}
                />
                <div className="checkmark"></div>
                <label htmlFor="freelancer">Freelancer</label>
              </div>
              <div className="input df">
                <input
                  type="radio"
                  name="status"
                  id="client"
                  value="hiring"
                  checked={formData.status === "hiring"}
                  onChange={handleChange}
                />
                <div className="checkmark"></div>
                <label htmlFor="client"> Client</label>
              </div>
            </div>
          </div>
          <div className="input-box address">
            <div className="select-box w-50">
              <select
                name="government"
                value={formData.government}
                onChange={handleChange}
              >
                <option value="" hidden>
                  Government
                </option>
                <option value="tataouine">Tataouine</option>
                <option value="ariana">Ariana</option>
                <option value="nabeul">Nabeul</option>
                <option value="beja">Beja</option>
              </select>
            </div>
          </div>
          <button type="submit" className="primary-btn mt w-100">
            Submit
          </button>
        </form>
      </section>
    </div>
  );
}

export default SignUp;
