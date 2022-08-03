import React, { createContext, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "../src/components/Landing/Landing";
import SideBar from "./components/SideBar/SideBar";
import ClientDashboard from "./components/Dashboard/Dashboard";
import UserManage from "./components/UserManage/UserManage";
import Feedback from "./components/Feedback/Feedback";
import { Col, Row } from "react-bootstrap";
import Ads from "./components/Ads/Ads";
import Company from "./components/Company/Company";
import Popup from "./components/Ads/Popup";
import Top from "./components/Ads/Top";
import Bottom from "./components/Ads/Bottom";
import { Categoryads } from "./components/Axios/apis";
import Category from "./components/Ads/Category";

const UserContext = createContext();
function App() {
  const [show, setShow] = useState(false);
  let u = localStorage.getItem("user");
  let user = JSON.parse(u);
  return (
    <UserContext.Provider value={{ show: show, setShow: setShow }}>
      <div className="app-main">
        <Router>
          <Row style={{ height: "100vh", width: "100%" }}>
            <Col
              style={{
                display: window.location.pathname !== "/" ? "" : "none",
              }}
              lg={show ? 1 : 2}
            >
              {window.location.pathname !== "/" &&
                window.location.pathname !== "/register" && <SideBar />}
            </Col>
            <Col
              lg={
                window.location.pathname === "/" ||
                window.location.pathname === "/register"
                  ? 12
                  : show
                  ? 11
                  : 10
              }
            >
              <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="*" element={<Landing />} />

                {/* Clientside */}

                <Route
                  exact
                  path="/dashboard"
                  element={<ClientDashboard />}
                />

                <Route
                  exact
                  path="/usermanage"
                  element={ <UserManage />}
                />

                <Route
                  exact
                  path="/ads"
                  element={ <Ads />}
                />
                <Route
                  exact
                  path="/ads/popupadd"
                  element={ <Popup />}
                />
                <Route
                  exact
                  path="/ads/topadd"
                  element={ <Top />}
                />
                <Route
                  exact
                  path="/ads/bottomadd"
                  element={ <Bottom />}
                />
                <Route
                  exact
                  path="/ads/categoryadd"
                  element={ <Category />}
                />
                <Route
                  exact
                  path="/feedback"
                  element={<Feedback />}
                />
                <Route
                  exact
                  path="/companymanage"
                  element={ <Company />}
                />
              </Routes>
            </Col>
          </Row>
        </Router>
      </div>
    </UserContext.Provider>
  );
}

export default App;
export { UserContext };
