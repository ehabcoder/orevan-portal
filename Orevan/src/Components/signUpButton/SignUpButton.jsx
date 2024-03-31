import React from "react";
import Diamond from "../../images/googleIcon.svg";
import axios from "axios";

export function SignUpButton() {
  return (
    <>
      <button
        // onClick={login}
        id="signInDiv"
        className="googleButton btn btn-dark text-white  w-100 "
      >
        <img className="px-1 mb-1" src={Diamond} alt="" /> or sign in with
        Google
      </button>
    </>
  );
}
