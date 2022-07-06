import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../../App";
import { UserAd } from "../Axios/apis";
import { Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import CommonHeader from "../Header/Header";
import AD from "../../assets/adsimage.png";
const UserDetails = () => {
  const id = useParams();
  const { show } = useContext(UserContext);
  const [plans, setPlans] = useState([]);
  console.log(id);

  const GetAd = async () => {
    let NewData = { userId: id.id };
    try {
      const { data } = await UserAd(NewData);
      setPlans(data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GetAd();
  }, []);

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
                  <h2 className="title"> {plans[0]?.listedBy}</h2>
                </div>

                <h2 className="mt-3">All Property</h2>
                <div className="d-flex justify-content-between">
                  {plans?.map((data, id) => (
                    <div className="card-plan mt-3" key={id}>
                      <div>
                        <img src={AD} alt="default" />
                      </div>
                      <h6>{data?.title}</h6>
                      <p>{data?.description}</p>

                      <h6 style={{ fontSize: "15px" }}>
                        {data?.address?.state},{data?.address?.country}
                      </h6>

                      <h2 style={{ cursor: "pointer" }}>{data?.price}/Month</h2>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <h2 className="text-center">No Ads To Display....</h2>
            )}
          </Row>
        </div>
      </div>
    </>
  );
};

export default UserDetails;
