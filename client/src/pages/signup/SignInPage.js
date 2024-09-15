import React from "react";
import SignIn from "../../components/SignIn";

function SignInPage() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-3"></div>
        <div className="col-md-6 col-12">
          <SignIn />
        </div>
        <div className="col-md-3"></div>
      </div>
    </div>
  );
}

export default SignInPage;
