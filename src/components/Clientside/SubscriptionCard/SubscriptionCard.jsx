import React, { useContext } from "react";
import { UserContext } from "../../../App";
import { Col, Row, Button } from "react-bootstrap";
import CommonHeader from "../../Header/Header";
import "./SubscriptionCard.css";
import cpu from "../../../assets/cpu.svg";
import compass from "../../../assets/compass.svg";
import disc from "../../../assets/disc.svg";
import chrome from "../../../assets/chrome.svg";
import clipboard from "../../../assets/clipboard.svg";

function Card(props) {
  const { feature, price, type, tag } = props;
  return (
    <>
      <div className="card-main">
        <div className="card-heading">
          <div className="card-price">${price}</div>
          <div className="card-type">{type}</div>
          <div className="card-tag">{tag}</div>
        </div>
        <div className="card-feature">
          {feature.map((item) => {
            return (
              <div className="card-feature-li">
                <div>
                  <img src={item.icon} alt="icon" />
                </div>
                <div className="card-feature-item">{item.value}</div>
              </div>
            );
          })}
        </div>
        <div className="card-btn">
          <Button className="subscription-card-buy-btn">Buy Now</Button>
        </div>
      </div>
    </>
  );
}

function SubscriptionCard() {
  const { show } = useContext(UserContext);
  const card_feature = [
    {
      id: 1,
      value: "Typography System",
      icon: cpu,
    },
    {
      id: 2,
      value: "Branding Kit",
      icon: chrome,
    },
    {
      id: 3,
      value: "30+ Atoms",
      icon: disc,
    },
    {
      id: 4,
      value: "300+ Variants",
      icon: compass,
    },
    {
      id: 5,
      value: "50+ Molecules",
      icon: clipboard,
    },
  ];
  return (
    <div className="main-div">
      <div
        className="clientsales-main"
        style={{ marginLeft: show ? "1px" : "2.3em" }}
      >
        <Row>
          <CommonHeader title="Subscription" />
          <Row>
            <Col>
              <Card
                feature={card_feature}
                price="350"
                type="Bronze"
                tag="Pro Level UI Kit"
              />
            </Col>
            <Col>
              <Card
                feature={card_feature}
                price="600"
                type="Silver"
                tag="Entre Level UI Kit"
              />
            </Col>
            <Col>
              <Card
                feature={card_feature}
                price="850"
                type="Gold"
                tag="Free UI Kit"
              />
            </Col>
          </Row>
        </Row>
      </div>
    </div>
  );
}

export default SubscriptionCard;
