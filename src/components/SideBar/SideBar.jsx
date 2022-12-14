import React, { useEffect, useContext } from "react";
import { UserContext } from "../../App";
import "react-bootstrap-drawer/lib/style.css";
import { NavLink, useNavigate } from "react-router-dom";
import { Drawer } from "react-bootstrap-drawer";
import Logo from "../../assets/stelologo.png";
import Collapseicon from "../../assets/Collapse.svg";
import Cookies from "js-cookie";
import { AiFillHome, AiOutlineStock, AiFillSnippets } from "react-icons/ai";
import "./sidebar.css";

const SideBar = () => {
  const { show, setShow } = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!Cookies.get("RentOutToken")) {
      navigate("/");
      window.location.reload();
    }
  }, []);

  let u = localStorage.getItem("user");
  let user = JSON.parse(u);
  return (
    <Drawer
      className={show === false ? "sidebar-main" : "sidebar-main-collapse"}
    >
      {/* <Drawer.Toggle /> */}

      {/* <Collapse> */}
      <Drawer.Overflow>
        <Drawer.ToC style={{ overflow: "hidden" }}>
          <Drawer.Header href="/" className="menu-item-header" title="Rent Out">
            <img
              src={Logo}
              alt="Logo"
              className={show === false ? "sidebarLogo" : "sidebarLogo-hide"}
            />{" "}
              Stelo
          </Drawer.Header>
          <hr style={{ marginTop: "-11px" }} />
          <Drawer.Nav>
            
              <Drawer.Item className="hover">
                <NavLink
                  exact
                  to="/dashboard"
                  className={({ isActive }) =>
                    isActive ? "NavLink-active" : "NavLink"
                  }
                  style={{ color: "white" }}
                  title="Dashboard"
                >
                  <h2
                    className={
                      show === false
                        ? "menu-item-sidebar"
                        : "menu-item-sidebar-hide"
                    }
                  >
                    <span
                      style={{ paddingRight: show === true ? "60px" : "15px" }}
                    >
                      <AiFillHome size={24} />
                    </span>
                    Dashboard
                  </h2>
                </NavLink>
              </Drawer.Item>
            

            
              <Drawer.Item>
                <NavLink
                  to="/usermanage"
                  className={({ isActive }) =>
                    isActive ? "NavLink-active" : "NavLink"
                  }
                  title="User"
                >
                  <h2
                    className={
                      show === false
                        ? "menu-item-sidebar"
                        : "menu-item-sidebar-hide"
                    }
                  >
                    <span
                      style={{ paddingRight: show === true ? "60px" : "15px" }}
                    >
                      <AiOutlineStock size={24} />
                    </span>
                    User
                  </h2>
                </NavLink>
              </Drawer.Item>
            
            
              <Drawer.Item>
                <NavLink
                  to="/ads"
                  className={({ isActive }) =>
                    isActive ? "NavLink-active" : "NavLink"
                  }
                  title="Revenue"
                >
                  <h2
                    className={
                      show === false
                        ? "menu-item-sidebar"
                        : "menu-item-sidebar-hide"
                    }
                  >
                    <span
                      style={{ paddingRight: show === true ? "60px" : "15px" }}
                    >
                      <AiOutlineStock size={24} />
                    </span>
                    Ads
                  </h2>
                </NavLink>
              </Drawer.Item>
            
            
              <Drawer.Item>
                <NavLink
                  to="/companymanage"
                  className={({ isActive }) =>
                    isActive ? "NavLink-active" : "NavLink"
                  }
                  title="Plan Management"
                >
                  <h2
                    className={
                      show === false
                        ? "menu-item-sidebar"
                        : "menu-item-sidebar-hide"
                    }
                  >
                    <span
                      style={{ paddingRight: show === true ? "60px" : "15px" }}
                    >
                      <AiFillSnippets size={24} />
                    </span>
                    Company Management
                  </h2>
                </NavLink>
              </Drawer.Item>

              <Drawer.Item>
                <NavLink
                  to="/feedback"
                  className={({ isActive }) =>
                    isActive ? "NavLink-active" : "NavLink"
                  }
                  title="Feedback Management"
                >
                  <h2
                    className={
                      show === false
                        ? "menu-item-sidebar"
                        : "menu-item-sidebar-hide"
                    }
                  >
                    <span
                      style={{ paddingRight: show === true ? "60px" : "15px" }}
                    >
                      <AiFillSnippets size={24} />
                    </span>
                    Feedback Management
                  </h2>
                </NavLink>
              </Drawer.Item>

              <Drawer.Item>
                <NavLink
                  to="/sendnotification"
                  className={({ isActive }) =>
                    isActive ? "NavLink-active" : "NavLink"
                  }
                  title="Feedback Management"
                >
                  <h2
                    className={
                      show === false
                        ? "menu-item-sidebar"
                        : "menu-item-sidebar-hide"
                    }
                  >
                    <span
                      style={{ paddingRight: show === true ? "60px" : "15px" }}
                    >
                      <AiFillSnippets size={24} />
                    </span>
                    Send Notifiation
                  </h2>
                </NavLink>
              </Drawer.Item>

          </Drawer.Nav>
          <div style={{ position: "relative" }}>
            <div
              onClick={() => {
                show === false ? setShow(true) : setShow(false);
              }}
              className={
                show === false ? "collapse-icon" : "collapse-hide-icon"
              }
            >
              <img width="40px" src={Collapseicon} alt="Shape" />
            </div>
          </div>
        </Drawer.ToC>
      </Drawer.Overflow>
      {/* </Collapse> */}
    </Drawer>
  );
};

export default SideBar;
