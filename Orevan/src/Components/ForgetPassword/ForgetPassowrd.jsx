import { Link } from "react-router-dom";

const ForgetPassword = () => {
  return (
    <>


    <div className="alert   alert-danger p-5 gap-4 d-flex justify-content-center align-items-center message">
        <strong>
          Please Contact The Technical Team on{" "}
          <a href="mailto:ehab.reda@orevan.org">ehab.reda@orevan.org</a>
        </strong>
        <button className="btn btn-primary GoBack">
          <Link
            to="/"
            className="p-2"
            style={{ color: "white", textDecoration: "none" }}
          >
            <b>Go Back</b>
          </Link>
        </button>
      </div>


   
    
    </>
  );
};

export default ForgetPassword;
