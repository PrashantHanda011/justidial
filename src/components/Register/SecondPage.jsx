import React from "react";
import { FormControl, Button, Form } from "react-bootstrap";
const SecondPage = ({ show,setState, formData, setFormData }) => {
  const handleSubmit = () => {
    if (!formData.name) {
      alert("Name can't be empty");
    } else if (!formData.email) {
      alert("Email is required field");
    } else if (!formData.phone) {
      alert("Phone Number can't be empty");
    } else if (!formData.password) {
      alert("Password is required");
    } else if (!formData.company) {
      alert("Company Name can't be empty");
    } else {
      setState(3);
    }
  };
  const handleChange = (e) => {
    const { name } = e.target;
    setFormData({ ...formData, [name]: e.target.value });
  };
  return (
    <>
      <Form>
        <div style={{ display: show === 2 ? "grid" : "none" }}>
          <div className="login-Form">
            <Form.Group className="mb-3">
              <FormControl
                required
                type="name"
                className="landing-input-form"
                placeholder="Name"
                aria-label="Name"
                name="name"
                autocomplete="on"
                value={formData.name}
                onChange={handleChange}
              />
            </Form.Group>
          </div>

          <div className="login-Form">
            <Form.Group className="mb-3">
              <FormControl
                type="email"
                required
                autocomplete="on"
                className="landing-input-form"
                placeholder="E-mail"
                aria-label="E-mail"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Form.Group>
          </div>
          <div className="login-Form">
            <Form.Group className="mb-3">
              <FormControl
                required
                type="number"
                autocomplete="on"
                className="landing-input-form"
                placeholder="Phone Number"
                aria-label="Phone Number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </Form.Group>
          </div>
          <div className="login-Form">
            <Form.Group className="mb-3">
              <FormControl
                required
                autocomplete="on"
                className="landing-input-form"
                placeholder="Password"
                aria-label="Password"
                onChange={handleChange}
                value={formData.password}
                type="password"
                name="password"
              />
            </Form.Group>
          </div>
          <div className="login-Form">
            <Form.Group className="mb-3">
              <FormControl
                type="name"
                required
                autocomplete="on"
                className="landing-input-form"
                placeholder="Company Name"
                aria-label="Company Name"
                name="company"
                value={formData.company}
                onChange={handleChange}
              />
            </Form.Group>

            <Button className="button-submit" onClick={handleSubmit}>
              Next
            </Button>
          </div>
        </div>
      </Form>
    </>
  );
};

export default SecondPage;
