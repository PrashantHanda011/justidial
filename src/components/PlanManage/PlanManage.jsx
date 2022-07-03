import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../../App";
import { FetchPlans } from "../Axios/apis";
import { Row, Button } from "react-bootstrap";
import CommonHeader from "../Header/Header";
const PlanManage = () => {
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
                  <h2 className="title"> Plans Management</h2>
                </div>

                <h2 className="mt-3">Poster Plan</h2>
                <div className="d-flex justify-content-between">
                  {plans?.slice(0, 4)?.map((data, id) => (
                    <div className="card-plan mt-3" key={id}>
                      <h6>{data?.name}  Plan User</h6>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam.
                      </p>

                      <Button
                        className="button-submit btn-ripple"
                        type="submit"
                        style={{fontSize: '20px',fontWeight: '600'}}
                      >
                        Rs. {data?.price}
                      </Button>

                      <h2>Change plan</h2>
                    </div>
                  ))}
                  
                </div>

                <h2 className="mt-5">Viewer Plan</h2>
                <div className="d-flex justify-content-between mb-5">
                  
                  {plans?.slice(4, 5)?.map((data, id) => (
                    <div className="card-plan mt-3" key={id}>
                      <h6>{data?.name}  Plan User</h6>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam.
                      </p>

                      <Button
                        className="button-submit btn-ripple"
                        type="submit"
                        style={{fontSize: '20px',fontWeight: '600'}}
                      >
                        Rs. {data?.price}
                      </Button>

                      <h2>Change plan</h2>
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

export default PlanManage;
