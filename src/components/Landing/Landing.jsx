import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import { Signin } from "../Axios/apis";
import Cookies from "js-cookie";
import "./landing.css";
import { InputGroup, FormControl, Button, Form } from "react-bootstrap";
import LoginItem from "../../assets/LoginItem.svg";
import LoginImage from "../../assets/LoginImage.svg";
const initialData = {
  email: "",
  password: "",
};
const Landing = () => {
  let navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState(initialData);

  const handleChange = (e) => {
    const { name } = e.target;
    setFormData({ ...formData, [name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (formData.email && formData.password) {
      try {
        const { data } = await Signin(formData);

        Cookies.set("RentOutToken", data?.data?.token);
        localStorage.setItem("RentOutToken", JSON.stringify(data?.data?.token));        
        window.location.reload();
      } catch (error) {
        console.log(error);
        alert("Invalid Email or Password");
      }
    } else {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
  };

  useEffect(() => {
    if (Cookies.get("RentOutToken")) {
      navigate("/dashboard");
      window.location.reload();
    }
  }, []);
  return (
    <>
      <Navbar />
      <div className="landing-main">
        <div className="landing-Form-main">
          <div className="landing-title">Welcome Back</div>
          <div
            style={{ fontWeight: 400, fontSize: "20px", marginTop: "-10px" }}
            className="landing-title"
          >
            &nbsp;We are happy to have you back!
          </div>
          <Form noValidate validated={validated} onSubmit={() => handleSubmit}>
            <div className="login-Form">
              <InputGroup className="mb-3" hasValidation>
                <FormControl
                  className="landing-input-form"
                  placeholder="E-mail or phone"
                  aria-label="E-mail or phone"
                  type="email"
                  name="email"
                  autoComplete="on"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Email or phone is required
                </Form.Control.Feedback>
              </InputGroup>
            </div>
            <div className="login-Form">
              <InputGroup className="mb-3" hasValidation>
                <FormControl
                  required
                  className="landing-input-form"
                  placeholder="Password"
                  aria-label="Password"
                  autoComplete="on"
                  onChange={handleChange}
                  value={formData.password}
                  type="password"
                  name="password"
                />
                <Form.Control.Feedback type="invalid">
                  Password is required
                </Form.Control.Feedback>
              </InputGroup>

              <p className="forgot-password-form">Forgot password?</p>

              <Button
                className="button-submit btn-ripple"
                type="submit"
                onClick={(e) => handleSubmit(e)}
              >
                Login
              </Button>
            </div>
          </Form>
        </div>

        <div className="landing-grid2">
          <img src={LoginImage} className="landing-image" alt="landing" />
        </div>
        <img src={LoginItem} className="landing-item" alt="LoginItem" />
      </div>
    </>
  );
};

export default Landing;
