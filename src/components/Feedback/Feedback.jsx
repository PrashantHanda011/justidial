import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../../App";
import { FetchPlans } from "../Axios/apis";
import { Row, Button } from "react-bootstrap";
import CommonHeader from "../Header/Header";
const Feedback = () => {
  const { show } = useContext(UserContext);
  const [plans, setPlans] = useState([]);

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
                  <h2 className="title"> FeedBack Management</h2>
                </div>

                <div className="d-flex justify-content-between flex-wrap mb-5">
                  {plans?.map((id) => (
                    <div className="card-plan mt-3" key={id}>
                      <h6>Rohit Pal</h6>
                      <div className="d-flex justify-content-center">
                        <div className="user-img d-flex justify-content-center" />
                      </div>
                      <p className="mt-3">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam.
                      </p>

                      <h2><b>E-mail:</b> rohit23@gmail.com<br/><br/><b>Contact:</b> +91 786 5347 894</h2>
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
    </>
  );
};

export default Feedback;
