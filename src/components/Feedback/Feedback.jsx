import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../../App";
import { Fetchfeedback } from "../Axios/apis";
import { Row, Button } from "react-bootstrap";
import CommonHeader from "../Header/Header";
import FeedbackCard from "./FeedbackCard";
import './Feedback.css'
const Feedback = () => {
  const { show } = useContext(UserContext);
  const [feedback, setfeedback] = useState([]);


  const GetPlans = async () => {
    try {
       const { data } = await Fetchfeedback();
       console.log(data)
       setfeedback(data?.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    GetPlans();
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
            {feedback?.length >0 ? (
              <>
              <div
                className="card-Dash text-start ms-5 ms-3 h-25"
                style={{ backgroundColor: "transparent" }}
              >
                <h2 className="mt-4">Feedback</h2>
              </div>

                <div className="d-flex  row flex-wrap mb-5 ms-5">
                  {feedback?.map((item,index) => {
                   return <FeedbackCard
                            key={index}
                            message={item?.message}
                            rating={item?.rating}
                            date={item?.createdAt}
                            name = {item?.user?.name}
                   />
                  }
                  )}
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

export default Feedback;
