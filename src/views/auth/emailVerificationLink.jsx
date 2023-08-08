import React, { useState, useRef, useEffect } from "react";

const AuthVerificationPage = () => {
  // const rhemaLogo = require(`@src/assets/img/logo/logo.svg`).default;
  const rhemaLogo = `@src/assets/img/logo/logo.svg`;

  return (
    <>
      <div className="container mt-5">
        <div className="auth-wrapper">
          <div className="row">
            <div className="col-lg-7 col-md-9 col-12 mx-auto">
              {/* <div className="mb-5 text-center nav-logo">
                  <img src={rhemaLogo} alt="" style={{ width: "100px" }} />
                </div> */}

              <div className="text-center p-5">
                <h3 className="title mb-4">Verification Link Sent</h3>
                <p className="pb-5">
                  We’ve sent a verification link to your email, click the link{" "}
                  <br />
                  to proceed with your registration
                </p>
                <button className="btn btn-blue-800 btn-lg" type="button">
                  Resend Link
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthVerificationPage;
