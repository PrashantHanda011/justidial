import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../../App";
import { FetchRevenue } from "../Axios/apis";
import { Row, Form, Button } from "react-bootstrap";
import CommonHeader from "../Header/Header";
import Cash from "../../assets/cash.png";
import "./revenue.css";
import { BsFillCalendarDateFill } from "react-icons/bs";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Line from "./LineChart";
const Revenue = () => {
  const { show } = useContext(UserContext);
  const [revenue, setRevenue] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [filter, setFilter] = useState(false);
  const GetRevenue = async () => {
    try {
      const { data } = await FetchRevenue();
      setRevenue(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const FilterUsers = async () => {
    let NewData = { from: startDate, to: toDate };
    try {
      const { data } = await FetchRevenue(NewData);
      setRevenue(data.data);
    } catch (error) {
      console.log(error);
    }
    setFilter(false);
  };
  const Reset = () => {
    GetRevenue();
    setFilter(false);
    setStartDate("");
    setToDate("");
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
                  <div>
                    <div className="d-flex justify-content-end mt-5">
                      <h2
                        className="filterDate"
                        onClick={() =>
                          filter ? setFilter(false) : setFilter(true)
                        }
                      >
                        Filter Revenue{" "}
                        <BsFillCalendarDateFill size="24" color="#000" />{" "}
                      </h2>
                    </div>
                    {filter && (
                      <div className="d-flex justify-content-end">
                        <Form.Group>
                          <Form.Label>From Date</Form.Label>
                          <DatePicker
                            selected={startDate}
                            placeholderText="Please select from date"
                            onChange={(date) => setStartDate(date)}
                            className="landing-input-form "
                            dateFormat="dd MMMM yyyy"
                          />
                        </Form.Group>
                        <Form.Group>
                          <Form.Label>To Date</Form.Label>
                          <DatePicker
                            selected={toDate}
                            placeholderText="Please select to date"
                            onChange={(date) => setToDate(date)}
                            dateFormat="dd MMMM yyyy"
                            className="landing-input-form "
                          />
                        </Form.Group>
                        <br />
                      </div>
                    )}
                    {startDate && toDate && filter && (
                      <div className="d-flex justify-content-end mt-3 ">
                        <Button
                          className="button-submit btn-ripple "
                          type="submit"
                          onClick={FilterUsers}
                          style={{ width: "6em", margin: "10px 0em" }}
                        >
                          Filter
                        </Button>
                        <Button
                          className="button-submit btn-ripple"
                          type="submit"
                          onClick={Reset}
                          style={{ width: "6em", margin: "10px 3em" }}
                        >
                          Reset
                        </Button>
                      </div>
                    )}
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
