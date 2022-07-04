import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../../App";
import "./dashboard.css";
import { DashUsers, FetchSearch } from "../Axios/apis";
import { Row, Form, InputGroup, Button } from "react-bootstrap";
import CommonHeader from "../Header/Header";
import { BsSearch, BsFillCalendarDateFill } from "react-icons/bs";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import TableData from "./Table";

const ClientDashboard = () => {
  const { show } = useContext(UserContext);
  const [filter, setFilter] = useState(false);
  const [user, setUser] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [search, setSearch] = useState("");
  const [searchData, setSearchData] = useState([]);

  const FetchUsers = async () => {
    try {
      const { data } = await DashUsers();
      setUser(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    FetchUsers();
  }, []);

  const FilterUsers = async () => {
    let NewData = { from: startDate, to: toDate };
    try {
      const { data } = await DashUsers(NewData);
      setUser(data.data);
    } catch (error) {
      console.log(error);
    }
    setFilter(false);
  };
  const Reset = () => {
    FetchUsers();
    setFilter(false);
    setStartDate("");
    setToDate("");
  };
  useEffect(() => {
    const SearchUser = async () => {
      let NewData = { name: search };
      try {
        const { data } = await FetchSearch(NewData);
        setSearchData(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    SearchUser();
  }, [search]);
  let result =search?.length===0?user?.users:searchData
  return (
    <>
      <div className="main-div">
        <div
          className="clientsales-main"
          style={{ marginLeft: show ? "1px" : "2.3em" }}
        >
          <Row>
            <CommonHeader />
            {user?.length !== 0 ? (
              <>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <div className="card-Dash text-start p-4">
                    <p> Total Users</p>

                    <h2 className="mt-4">{user?.count}</h2>
                  </div>

                  <Form className="search-main">
                    <InputGroup className="mb-3">
                      <InputGroup.Text className="rsearch-button-icon">
                        <BsSearch size={20} />
                      </InputGroup.Text>
                      <Form.Control
                        className="rsearch-bar"
                        type="text"
                        placeholder="Search"
                        value={search}
                        onChange={(e) => setSearch(e?.target?.value)}
                      />
                    </InputGroup>
                  </Form>
                </div>
                <div className="d-flex justify-content-end">
                  <h2
                    className="filterDate"
                    onClick={() =>
                      filter ? setFilter(false) : setFilter(true)
                    }
                  >
                    Filter Users{" "}
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
                <Row style={{ marginTop: "20px" }}>
                  <TableData user={result} />
                </Row>
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

export default ClientDashboard;
