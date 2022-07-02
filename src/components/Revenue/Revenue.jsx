import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../../App";
import { FetchRevenue } from "../Axios/apis";
import { Row } from "react-bootstrap";
import CommonHeader from "../Header/Header";
import Cash from "../../assets/cash.png";
import "./revenue.css";
import Line from "./LineChart";
const Revenue = () => {
  const { show } = useContext(UserContext);
  const [revenue, setRevenue] = useState([]);

  const GetRevenue = async () => {
    try {
      const { data } = await FetchRevenue();
      setRevenue(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    GetRevenue();
  }, []);

  console.log(revenue);
  return (
    <>
      <div className="main-div">
        <div
          className="clientsales-main"
          style={{ marginLeft: show ? "1px" : "2.3em" }}
        >
          <Row>
            <CommonHeader />
            {revenue?.length !== 0 ? (
              <>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <h2 className="title"> Revenue</h2>
                    <div className="card-rev mt-3">
                      <p className="text-center">Total Revenue</p>
                      <span className="d-flex justify-content-around mt-4">
                        <img src={Cash} alt="cash" />
                        <h2 className="text-center">{revenue?.total}</h2>
                      </span>
                    </div>
                  </div>

                  <div className="d-flex justify-content-end">
                    <input type="date" className="date-calendar" />
                  </div>
                </div>

                <h2 className="mt-5">Poster Plan</h2>
                <div className="d-flex justify-content-between">
                  <div>
                    <div className="card-rev mt-3">
                      <h6>Single Post Plan User</h6>
                      <p>{revenue?.single?.users}</p>

                      <h6>Revenue</h6>
                      <h2>{revenue?.single?.total}</h2>
                    </div>
                  </div>
                  <div>
                    <div className="card-rev mt-3">
                      <h6>Silver Post Plan User</h6>
                      <p>{revenue?.silver?.users}</p>

                      <h6>Revenue</h6>
                      <h2>{revenue?.silver?.total}</h2>
                    </div>
                  </div>
                  <div>
                    <div className="card-rev mt-3">
                      <h6>Gold Post Plan User</h6>
                      <p>{revenue?.gold.users}</p>

                      <h6>Revenue</h6>
                      <h2>{revenue?.gold?.total}</h2>
                    </div>
                  </div>
                  <div>
                    <div className="card-rev mt-3">
                      <h6>Platinum Post Plan User</h6>
                      <p>{revenue?.platinium?.users}</p>

                      <h6>Revenue</h6>
                      <h2>{revenue?.platinium?.total}</h2>
                    </div>
                  </div>
                </div>

                <h2 className="mt-5">Viewer Plan</h2>
                <div className="d-flex justify-content-between">
                  <div>
                    <div className="card-rev mt-3">
                      <h6>Viewer Post Plan User</h6>
                      <p>{revenue?.viewer?.users}</p>

                      <h6>Revenue</h6>
                      <h2>{revenue?.viewer?.total}</h2>
                    </div>
                  </div>
                </div>
                <div className="mt-3 mb-5">
                  <Line />
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

export default Revenue;
