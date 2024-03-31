import React from "react";
import { Navbar } from "../Navbar/Navbar";
import { Link } from "react-router-dom";
import { Footer } from "../Footor/Footor";

import UnderConstruction from "../../images/UnderConst.png";
import { useNavigate } from "react-router-dom";

export function UnderConst() {
  return (
    <>
      <Navbar />
      <div className="App bg-light">
        <div>
          <div className="container bg-light">
            <div className="row">
              <div className="col-md-6 text-center text-dark d-flex align-items-center justify-content-center pb-3">
                <h1>
                  Page Is Still <br /> Under Construction
                </h1>
              </div>
              <div className="col-md-6 pt-4">
                <img
                  className="w-100"
                  src={UnderConstruction}
                  alt="UnderConstruction"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
