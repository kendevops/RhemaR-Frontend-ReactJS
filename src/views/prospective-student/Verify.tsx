import { useEffect } from "react";

export default function Verify() {
  useEffect(() => {
    //recheck every {{interval}} for when the user has verified their email
    //then route the user to the prospective student dashboard
  });

  function resendLink() {
    //maybe check the history params for an email property
  }

  return (
    <section className="container mt-5">
      <div className="auth-wrapper">
        <div className="row">
          <div className="col-xl-7 col-lg-8 col-md-10 col-12 mx-auto">
            <div className="bg-white shadow rounded-2 p-5">
              <div className="text-center mb-5">
                <h3 className="title mb-4">Verification Link Sent</h3>
                <p>
                  We've sent a verification link to your email, click the link
                  <br />
                  to proceed with your registration
                </p>
              </div>
              <button
                onClick={resendLink}
                className="btn btn-blue-800 btn-lg w-100"
                type="button"
              >
                Resend Link
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
