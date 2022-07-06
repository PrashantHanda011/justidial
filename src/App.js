import React, { createContext, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//Common import
import Landing from "../src/components/Landing/Landing";
import SideBar from "./components/SideBar/SideBar";
import ClientDashboard from "./components/Dashboard/Dashboard";
import UserManage from "./components/UserManage/UserManage";
import UserDetails from "./components/UserManage/UserDetails";
import Revenue from "./components/Revenue/Revenue";
import PlanManage from "./components/PlanManage/PlanManage";
import Feedback from "./components/Feedback/Feedback";
import SubAdmin from "./components/SubAdmin/SubAdmin";
import Addsub from "./components/SubAdmin/Addsub";
import Editsub from "./components/SubAdmin/Editsub";
import { Col, Row } from "react-bootstrap";
const UserContext = createContext();
function App() {
  const [show, setShow] = useState(false);

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
                <Route exact path="/dashboard" element={<ClientDashboard />} />
                <Route exact path="/usermanage" element={<UserManage />} />
                <Route
                  exact
                  path="/usermanage/:id"
                  element={<UserDetails />}
                />
                <Route exact path="/revenue" element={<Revenue />} />
                <Route exact path="/plans" element={<PlanManage />} />
                <Route exact path="/feedback" element={<Feedback />} />
                <Route exact path="/subadmin" element={<SubAdmin />} /> 
                <Route exact path="/subadmin/add" element={<Addsub />} /> 
                <Route exact path="/subadmin/edit/:id" element={<Editsub />} /> 
                {/* Clientside */}

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
