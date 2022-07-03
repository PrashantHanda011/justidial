import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../../App";
import { FetchPlans } from "../Axios/apis";
import {
  Row,
  Button,
  Modal,
  Form,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import CommonHeader from "../Header/Header";
const PlanManage = () => {
  const { show } = useContext(UserContext);
  const [plans, setPlans] = useState([]);
  const [view, setView] = useState(false);

  const GetPlans = async () => {
    try {
      const { data } = await FetchPlans();
      setPlans(data?.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    GetPlans();
  }, []);

  console.log(plans);
  return (
    <>
      <div className="main-div">
        <div
          className="clientsales-main"
          style={{ marginLeft: show ? "1px" : "2.3em" }}
        >
          <Row>
            <CommonHeader />
            {plans?.length !== 0 ? (
              <>
                <div>
                  <h2 className="title"> Plans Management</h2>
                </div>

                <h2 className="mt-3">Poster Plan</h2>
                <div className="d-flex justify-content-between">
                  {plans?.slice(0, 4)?.map((data, id) => (
                    <div className="card-plan mt-3" key={id}>
                      <h6>{data?.name} Plan User</h6>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam.
                      </p>

                      <Button
                        className="button-submit btn-ripple"
                        type="submit"
                        style={{ fontSize: "20px", fontWeight: "600" }}
                      >
                        Rs. {data?.price}
                      </Button>

                      <h2
                        style={{ cursor: "pointer" }}
                        onClick={() => setView(true)}
                      >
                        Change plan
                      </h2>
                    </div>
                  ))}
                </div>

                <h2 className="mt-5">Viewer Plan</h2>
                <div className="d-flex justify-content-between mb-5">
                  {plans?.slice(4, 5)?.map((data, id) => (
                    <div className="card-plan mt-3" key={id}>
                      <h6>{data?.name} Plan User</h6>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam.
                      </p>

                      <Button
                        className="button-submit btn-ripple"
                        type="submit"
                        style={{ fontSize: "20px", fontWeight: "600" }}
                      >
                        Rs. {data?.price}
                      </Button>

                      <h2
                        style={{ cursor: "pointer" }}
                        onClick={() => setView(true)}
                      >
                        Change plan
                      </h2>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="d-flex justify-content-center mt-5">
                <div className="loading-main ">
                  <div className="loader" />
                </div>
              </div>
            )}
          </Row>
        </div>
      </div>
      <Modal show={view} onHide={() => setView(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title className="title">Update Plan</Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex justify-content-center mb-5">
          <div>
            {plans?.slice(4, 5)?.map((data, id) => (
              <div
                className="card-plan mt-3"
                style={{ width: "350px" }}
                key={id}
              >
                <h6>Silver Plan</h6>
                <Form>
                  <Form.Group className="mb-2">
                    <Form.Label>Set Amount</Form.Label>
                    <Form.Control type="text" className="landing-input-form" />
                  </Form.Group>

                  <Form.Group className="mb-2">
                    <Form.Label>Duration</Form.Label>
                    <Form.Control type="text" className="landing-input-form" />
                  </Form.Group>
                  <Form.Group className="mb-2">
                    <Form.Label>No. of Add Uploads</Form.Label>
                    <Form.Control type="text" className="landing-input-form" />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label>No. of Post Can See</Form.Label>
                    <Form.Control type="text" className="landing-input-form" />
                  </Form.Group>
                </Form>

                <Button
                  className="button-submit btn-ripple"
                  type="submit"
                  style={{ fontSize: "20px", fontWeight: "600" }}
                >
                  Update
                </Button>
              </div>
            ))}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default PlanManage;
