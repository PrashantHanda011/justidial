import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../../App";
import { FetchsubAdmin } from "../Axios/apis";
import { Row, Button } from "react-bootstrap";
import CommonHeader from "../Header/Header";
import { useNavigate } from "react-router-dom";
import TableData from "./Table";

const SubAdmin = () => {
  const { show } = useContext(UserContext);
  const navigate = useNavigate();
  const [user, setUser] = useState([]);
  const [state, setState] = useState(false);

  const FetchUsers = async () => {
    try {
      const { data } = await FetchsubAdmin();
      setUser(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    FetchUsers();
  }, []);
  useEffect(() => {
    if (state) {
      FetchUsers();
    }
    setState(false);
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

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <h2 className="title mt-4">Admin Panel</h2>
              <div style={{ marginRight: "4em" }}>
                <Button
                  className="button-submit btn-ripple mt-4"
                  type="submit"
                  onClick={() => navigate("/subadmin/add")}
                  style={{ width: "9em" }}
                >
                  Add SubAdmin
                </Button>
              </div>
            </div>
            {user?.length !== 0 ? (
              <>
                <Row style={{ marginTop: "20px" }}>
                  <TableData user={user?.data} setState={setState} />
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

export default SubAdmin;
