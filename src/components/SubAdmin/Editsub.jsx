import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../../App";
import { EditsubAdmin } from "../Axios/apis";
import { Row, Col, Button, Form } from "react-bootstrap";
import CommonHeader from "../Header/Header";
import { useNavigate, useParams, useLocation } from "react-router-dom";

const EditSub = () => {
  const { show } = useContext(UserContext);
  const navigate = useNavigate();
  const id = useParams();
  const { state } = useLocation();
  const [input, setInput] = useState({
    name: "",
    email: "",
    number: "",
    password: "",
  });
  const [check, setCheck] = useState({
    dashboard: false,
    users: false,
    revenue: false,
    feedback: false,
    plans: false,
    SubAdmin: false,
  });
  const handleChange = (e) => {
    const { name } = e.target;
    setInput({ ...input, [name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input.name && input.password && input.email && input.number) {
      const { name, password, email, number } = input;
      const { dashboard, users, revenue, feedback, plans, SubAdmin } = check;
      let formData = {
        name,
        email,
        number,
        password,
        dashboard,
        users,
        revenue,
        feedback,
        plans,
        isSubadmin: SubAdmin,
        id: id.id,
      };
      try {
        const { data } = await EditsubAdmin(formData);
        alert(data.message);
        navigate("/subadmin");
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Fields cannot be empty");
    }
  };
  useEffect(() => {
    if (state) {
      setInput({
        name: state.name,
        email: state.email,
        number: state.number,
        password: state.password,
      });
      setCheck({
        dashboard: state.dashboard,
        users: state.users,
        revenue: state.revenue,
        feedback: state.feedback,
        plans: state.plans,
        SubAdmin: state.isSubadmin,
      });
    }
  }, [state]);
  return (
    <>
      <div className="main-div">
        <div
          className="clientsales-main"
          style={{ marginLeft: show ? "1px" : "2.3em" }}
        >
          <Row>
            <CommonHeader />

            <h2 className="title mt-4 mb-5">Add Sub-Admin </h2>

            <Form>
              <Row className="mb-3">
                <Form.Group as={Col} md="5">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    className="landing-input-form"
                    placeholder="Name"
                    aria-label="Name"
                    autoComplete="on"
                    required
                    type="text"
                    name="name"
                    value={input.name}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group as={Col} md="5" controlId="validationCustom03">
                  <Form.Label>Number</Form.Label>
                  <Form.Control
                    className="landing-input-form"
                    placeholder="number"
                    aria-label="number"
                    required
                    autoComplete="on"
                    type="number"
                    name="number"
                    value={input.number}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} md="5">
                  <Form.Label>E-mail</Form.Label>
                  <Form.Control
                    className="landing-input-form"
                    placeholder="E-mail or phone"
                    aria-label="E-mail or phone"
                    required
                    type="email"
                    autoComplete="on"
                    name="email"
                    value={input.email}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group as={Col} md="5" controlId="validationCustom04">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    className="landing-input-form"
                    placeholder="password"
                    aria-label="password"
                    required
                    autoComplete="on"
                    type="password"
                    name="password"
                    value={input.password}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Row>
              <Form.Group>
                <Form.Check
                  className="m-5"
                  inline
                  label="DashBoard"
                  type="checkbox"
                  name="dashboard"
                  checked={check.dashboard}
                  value={check.dashboard}
                  onChange={() =>
                    setCheck({
                      ...check,
                      dashboard: check.dashboard === true ? false : true,
                    })
                  }
                />
                <Form.Check
                  className="m-5"
                  inline
                  label="Users"
                  type="checkbox"
                  name="users"
                  checked={check.users}
                  value={check.users}
                  onChange={() =>
                    setCheck({
                      ...check,
                      users: check.users === true ? false : true,
                    })
                  }
                />
                <Form.Check
                  className="m-5"
                  inline
                  label="Revenue"
                  type="checkbox"
                  name="revenue"
                  checked={check.revenue}
                  value={check.revenue}
                  onChange={() =>
                    setCheck({
                      ...check,
                      revenue: check.revenue === true ? false : true,
                    })
                  }
                />
                <Form.Check
                  className="m-5"
                  inline
                  label="Feedback"
                  type="checkbox"
                  name="feedback"
                  checked={check.feedback}
                  value={check.feedback}
                  onChange={() =>
                    setCheck({
                      ...check,
                      feedback: check.feedback === true ? false : true,
                    })
                  }
                />
                <Form.Check
                  className="m-5"
                  inline
                  label="Plans"
                  type="checkbox"
                  name="plans"
                  checked={check.plans}
                  value={check.plans}
                  onChange={() =>
                    setCheck({
                      ...check,
                      plans: check.plans === true ? false : true,
                    })
                  }
                />
                <Form.Check
                  className="m-5"
                  inline
                  label="SubAdmin"
                  type="checkbox"
                  name="SubAdmin"
                  checked={check.SubAdmin}
                  value={check.SubAdmin}
                  onChange={() =>
                    setCheck({
                      ...check,
                      SubAdmin: check.SubAdmin === true ? false : true,
                    })
                  }
                />
              </Form.Group>
              <div
                className="d-flex justify-content-center"
                style={{ marginRight: "12em" }}
              >
                <Button
                  className="button-submit btn-ripple "
                  type="button"
                  onClick={handleSubmit}
                  style={{ width: "15em" }}
                >
                  Update SubAdmin
                </Button>
              </div>
            </Form>
          </Row>
        </div>
      </div>
    </>
  );
};

export default EditSub;
