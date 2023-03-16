// // ** React Imports
// import React, { useEffect, useState, Fragment } from "react";
// import { Link, useHistory, useParams } from "react-router-dom";

// // ** Custom Hooks

// // ** Custom Components
// // import Avatar from "@components/avatar";
// import InputPasswordToggle from "@components/input-password-toggle";

// const ToastContent = ({ name, role }) => (
//   <Fragment>
//     <div className="toastify-header">
//       <div className="title-wrapper">
//         {/* <Avatar size="sm" color="success" icon={<Coffee size={12} />} /> */}
//         <h6 className="toast-title fw-bold">Welcome, {name}</h6>
//       </div>
//     </div>
//     <div className="toastify-body">
//       <span>
//         You have successfully logged in as an {role} user to Vuexy. Now you can
//         start to explore. Enjoy!
//       </span>
//     </div>
//   </Fragment>
// );

// const AuthResetPasswordPage = () => {
//   const param = useParams();
//   const [visible, setVisible] = useState(true);
//   const [validUrl, setValidUrl] = useState(false);
//   const [responseMsg, setResponseMsg] = useState("");
//   const [responseError, setResponseError] = useState("");
//   const history = useHistory();
//   const url = ``; // get react route and send to useEffect

//   useEffect(() => {
//     const verifyUrl = async () => {
//       try {
//         useJwt
//           .resetPassword({ id: param.id, token: param.token })
//           .then((res) => {
//             setValidUrl(true);
//           });
//       } catch (error) {
//         setValidUrl(false);
//       }
//     };
//     verifyUrl();
//   }, [param, url]);

//   const rhemaLogo = require(`@src/assets/img/logo/logo.svg`).default;

//   return (
//     <Fragment>
//       {validUrl ? (
//         <div className="container mt-5">
//           <div className="auth-wrapper">
//             <div className="row">
//               <div className="col-xl-6 col-lg-7 col-md-8 col-12 mx-auto">
//                 <div className="mb-5 text-center nav-logo">
//                   <img src={rhemaLogo} alt="" style={{ width: "100px" }} />
//                 </div>

//                 <div className="bg-white shadow rounded-2 p-5">
//                   <div className="text-center mb-5">
//                     <h3 className="title mb-4">Reset Password</h3>
//                     <p className="mx-auto" style={{ lineHeight: "1.234", maxWidth: "80%" }}>
//                       You can now change your account password
//                     </p>
//                   </div>

//                   {responseMsg && (
//                     <Alert
//                       color="success mb-5"
//                       isOpen={visible}
//                       toggle={() => setVisible(false)}
//                     >
//                       <h4 className="alert-heading fs-2 mb-3">Success</h4>
//                       <div className="alert-body fs-4 lh-1">
//                         Password reset link sent to your email
//                         <br />
//                         If the email you submitted is correct, then check your
//                         mail and reset your password
//                       </div>
//                     </Alert>
//                   )}

//                   {responseError && (
//                     <Alert
//                       color="error mb-5"
//                       isOpen={visible}
//                       toggle={() => setVisible(false)}
//                     >
//                       <h4 className="alert-heading fs-2 mb-3">Error</h4>
//                       <div className="alert-body fs-4 lh-1">
//                         If the email you submitted is correct, then check your
//                         mail and reset your password
//                       </div>
//                     </Alert>
//                   )}

//                   <form
//                     className="login-form"
//                     onSubmit={handleSubmit}
//                   >
//                     <div className="form-group">
//                       <label htmlFor="password">New Password</label>
//                       <Controller
//                         id="password"
//                         name="password"
//                         control={control}
//                         render={({ field }) => (
//                           <InputPasswordToggle
//                             className=""
//                             invalid={errors.password && true}
//                             {...field}
//                           />
//                         )}
//                       />
//                     </div>
//                     <div className="form-group">
//                       <label htmlFor="confirmPassword">Confirm Password</label>
//                       <Controller
//                         id="confirmPassword"
//                         name="confirmPassword"
//                         control={control}
//                         render={({ field }) => (
//                           <InputPasswordToggle
//                             className=""
//                             invalid={errors.confirmPassword && true}
//                             {...field}
//                           />
//                         )}
//                       />
//                     </div>
//                     <button
//                       className="btn btn-blue-800 btn-lg w-100 mt-5 mb-5"
//                       type="submit"
//                     >
//                       Submit
//                     </button>
//                   </form>

//                   <div className="text-center mb-2">
//                     <Link to="/login">
//                       <small>Go Back To Login Page Instead?</small>
//                     </Link>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       ) : (
//         <div className="container mt-5">
//           <div className="auth-wrapper">
//             <div className="row">
//               <div className="col-xl-6 col-lg-7 col-md-8 col-12 mx-auto">
//                 <div className="mb-5 text-center nav-logo">
//                   <img src={rhemaLogo} alt="" style={{ width: "100px" }} />
//                 </div>

//                 <div className="bg-white shadow rounded-2 p-5">
//                   <div className="text-center mb-5">
//                     <h3 className="title mb-4" style={{color: "red"}}>Password Reset Error</h3>
//                     <p className="mx-auto" style={{ lineHeight: "1.234", maxWidth: "80%" }}>
//                       If you were redirected to this page from your email, the link you clicked is invalid or has expired.
//                       <br />
//                       <br />
//                       And you cannot directly access this page.
//                     </p>
//                   </div>

//                   <button
//                     className="btn btn-blue-800 btn-lg w-100"
//                     type="submit"
//                   >
//                     <Link to="/login">
//                       <small>Go Back To Login Page Instead?</small>
//                     </Link>
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </Fragment>
//   );
// };

// export default AuthResetPasswordPage;
