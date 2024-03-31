import React from "react";
import { Navbar } from "../Navbar/Navbar";
import { Link } from "react-router-dom";
import { Footer } from "../Footor/Footor";

import homeImage from "../../images/Banner.png";
import { useNavigate } from "react-router-dom";

export function PaymentRequest() {
  return (
    <>
      <Navbar />
      <div className="App">
        <div className="row pb-5 pt-5">
          <h1>Request a Payment</h1>
        </div>
        <div className="container">
          <div className="Payment">
            <iframe
              class="clickup-embed clickup-dynamic-height"
              src="https://forms.clickup.com/4546869/f/4ar9n-16695/CWP40R2E3G52AJPV9Y"
              onwheel=""
              width="100%"
              height="100%"
            ></iframe>
            <script
              async
              src="https://app-cdn.clickup.com/assets/js/forms-embed/v1.js"
            ></script>
          </div>
        </div>
      </div>
    </>
  );
}
