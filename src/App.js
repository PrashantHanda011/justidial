import React, { createContext, useState,useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
//Common import
import Landing from "../src/components/Landing/Landing";
import Register from "../src/components/Register/Register";
import SideBar from "./components/SideBar/SideBar";
import UserManage from "./components/UserManage/UserManage";
import UserDetails from "./components/UserManage/UserDetails";
import AstrologerManage from "./components/AstrologerManage/AstrologerManage";
import AstroDetails from "./components/AstrologerManage/AstroDetails";
// Clientside
import ClientDashboard from "./components/Dashboard/Dashboard";
import ClientPurchases from "./components/Clientside/Purchase/Purchase";
import ClientBills from "./components/Clientside/Bills/Bills";
import ClientInvoice from "./components/Clientside/Bills/Invoice";
import ClientEditInvoice from "./components/Clientside/Bills/EditInvoice";
import ClientWorkStatus from "./components/Clientside/WorkStatus/WorkStatus";
import ClientSubscriptionCard from "./components/Clientside/SubscriptionCard/SubscriptionCard";
import ClientWorkDetails from "./components/Clientside/WorkStatus/WorkDetails";
import ClientChat from "./components/Clientside/Chats/Chat";

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

                <Route path="/register" element={<Register />} />
                {/* Clientside */}
                <Route exact path="/dashboard" element={<ClientDashboard />} />
                <Route exact path="/usermanage" element={<UserManage />} />
                <Route exact path="/usermanage/details" element={<UserDetails />} />
                <Route exact path="/astrologermanage" element={<AstrologerManage />} />
                <Route exact path="/astrologermanage/details" element={<AstroDetails />} />

                <Route exact path="/purchases" element={<ClientPurchases />} />
                <Route exact path="/bank" element={<ClientBills />} />
                <Route
                  exact
                  path="/sales/invoice"
                  element={<ClientInvoice />}
                />
                <Route
                  exact
                  path="/sales/Editinvoice/:id"
                  element={<ClientEditInvoice />}
                />
                <Route
                  exact
                  path="/workstatus"
                  element={<ClientWorkStatus />}
                />
                <Route
                  exact
                  path="/subscription"
                  element={<ClientSubscriptionCard />}
                />
                <Route
                  exact
                  path="/workstatus/details/:id"
                  element={<ClientWorkDetails />}
                />
                <Route exact path="/chats" element={<ClientChat />} />
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
