import React from "react";
import { Navbar } from "../Navbar/Navbar";
// import internal from "../../images/internal.png";
// import central from "../../images/CRM.png";
// import payment from "../../images/payment.png";
// import orientation from "../../images/orientation.png";
// import website from "../../images/orevanWebsite.png";
// import drive from "../../images/drive.png";
// import people from "../../images/PTSystem.png";
// import system from "../../images/OtSystem.png";
import Internal from "../../images/CommunicationIcons/Internal.png";
import CRM from "../../images/CommunicationIcons/Crm.png";
import Payment from "../../images/CommunicationIcons/Payment.svg";
import Orientation from "../../images/CommunicationIcons/Orientation.png";
import Web from "../../images/CommunicationIcons/Web.png";
import Drive from "../../images/CommunicationIcons/Drive.png";
import PT from "../../images/CommunicationIcons/PT.svg";
import Org from "../../images/CommunicationIcons/Org.png";
import { Container, Row, Col } from "react-bootstrap";
import { Footer } from "../Footor/Footor";
import { Link, useNavigate } from "react-router-dom";
import CommunicationImage from "../../images/CommunicationTools.png";
import decore from "../../images/Decoration.png";

export function Communication() {
  const navigate = useNavigate();
  const handleButton = () => {
    // Navigate to a specific route when the button is clicked
    navigate("/PaymentRequest");
  };
  const handleButton2 = () => {
    // Navigate to a specific route when the button is clicked
    window.open("/UnderConst", "_blank");
  };
  return (
    <>
      <Navbar />

      <div className="App">
        <div>
          <Container>
            <Row>
              <Col>
                <h2 className="text-center titleCommunication pb-5 ">
                  Communication Tools
                </h2>
              </Col>
            </Row>
          </Container>
          <div className="container">
            <div className="row">
              <div className="col-md-6 pt-4">
                <img className="w-100" src={CommunicationImage} alt="" />
              </div>

              <div className="col-md-6 text-center bg-black commPadding ">
                <div className="img-grid">
                  <Link to="https://app.clickup.com/login" target="_blank">
                    <button
                      className="text-left btn buttonTitle buttonTitle1 text-white mb-2  mx-2 py-2"
                      style={{ backgroundColor: "#948af4" }}
                    >
                      <img src={Internal} alt="Internal" className="px-2" />
                      Internal System
                    </button>
                  </Link>
                  <Link
                    to="https://app.pipedrive.com/auth/login"
                    target="_blank"
                  >
                    <button
                      className="text-left btn buttonTitle buttonTitle1 text-white mb-2  mx-2 py-2"
                      style={{ backgroundColor: "#948af4" }}
                    >
                      <img src={CRM} alt="Internal" className="px-2" />
                      CRM System
                    </button>
                  </Link>

                  <button
                    onClick={handleButton}
                    className="text-left btn buttonTitle buttonTitle1 text-white mb-2  mx-2 py-2"
                    style={{ backgroundColor: "#948af4" }}
                  >
                    <img src={Payment} alt="Internal" className="px-2" />
                    Payment Request
                  </button>

                  <button
                    onClick={handleButton2}
                    className="btn buttonTitle buttonTitle1 text-white mb-2  mx-2 py-2"
                    style={{ backgroundColor: "#948af4" }}
                  >
                    <img src={Orientation} alt="Internal" className="px-2" />
                    Orientation
                  </button>
                </div>
                <div className="img-grid ">
                  <Link to="https://orevan.org/" target="_blank">
                    <button
                      className="btn buttonTitle buttonTitle1 text-white mb-2  mx-2 py-2"
                      style={{ backgroundColor: "#948af4" }}
                    >
                      <img src={Web} alt="Internal" className="px-2" />
                      Orevan Website
                    </button>
                  </Link>
                  <Link
                    to="https://drive.google.com/drive/u/0/shared-drives"
                    target="_blank"
                  >
                    <button
                      className="btn buttonTitle buttonTitle1 text-white mb-2  mx-2 py-2"
                      style={{ backgroundColor: "#948af4" }}
                    >
                      <img src={Drive} alt="Internal" className="px-2" />
                      Drive Workspace
                    </button>
                  </Link>

                  <button
                    onClick={handleButton2}
                    className="btn buttonTitle buttonTitle1 text-white mb-2  mx-2 py-2"
                    style={{ backgroundColor: "#948af4" }}
                  >
                    <img src={PT} alt="Internal" className="px-2" />
                    PT System
                  </button>

                  <Link
                    target="_blank"
                    to="https://accounts.intuit.com/app/sign-in?app_group=QBO&asset_alias=Intuit.accounting.core.qbowebapp&locale=en-ROW&state=%7B%22queryParams%22%3A%7B%22locale%22%3A%22en-ROW%22%7D%7D&app_environment=prod"
                  >
                    <button
                      className="btn buttonTitle buttonTitle1 text-white mb-2  mx-2 py-2"
                      style={{ backgroundColor: "#948af4" }}
                    >
                      <img src={Org} alt="Internal" className="px-2" />
                      OT System
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container-fluid pt-5 mt-5 ">
          <div className="row bg-black">
            <img className="w-100" src={decore} alt="" />
          </div>
        </div>
      </div>
    </>
  );
}
