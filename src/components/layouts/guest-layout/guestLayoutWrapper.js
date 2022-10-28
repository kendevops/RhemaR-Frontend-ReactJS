// ** React Imports
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";


// ** Third Party Components
import classnames from "classnames";
import { ArrowUp } from "react-feather";

// ** Reactstrap Imports
import { Navbar, Button } from "reactstrap";
import { Icon } from '@iconify/react';

const AppLayoutWrapper = (props) => {
  
  // ** Props
  const { menuData, children } = props;

  const rhemaLogo = require(`@src/assets/img/logo/logo.svg`).default;

  return (
    <>
      <div className="nav-wrapper">
        <nav className="guest-layout navbar navbar-expand-lg navbar-dark first-section">
          <div className="container d-flex justify-content-between align-items-center w-100">
            <div className="d-flex align-items-center">
              <div className="navlink">Welcome!</div>

              <div className="navlink">
                <a
                  href="tel:+2349034841366"
                  className="d-flex align-items-center"
                >
                  <span className="me-3"> </span>
                  +234 903 484 1366
                </a>
              </div>
              <div className="navlink">
                <span className="mx-2"> |</span>
                <span routerLink="/login">Student Login</span>
                <span className="mx-2"> |</span>
                <span routerLink="/register">Apply Now </span>
                <span className="mx-2"> |</span>
              </div>
            </div>
            <div className="d-flex align-items-center social-links">
              <a
                href="https://facebook.com/rhema"
                target="_blank"
                className="me-4"
              >
                <Icon icon="bxl:facebook-circle" />
              </a>

              <a
                href="https://twitter.com/rhema"
                target="_blank"
                className="me-4"
              >
                <Icon icon="ant-design:twitter-circle-filled" />
              </a>
              <a
                href="https://youtube.com/rhema"
                target="_blank"
                className="me-4"
              >
                <Icon icon="cib:youtube" />
              </a>
            </div>
          </div>
        </nav>
        <nav className="guest-layout navbar navbar-expand-lg navbar-dark second-section">
          <div className="container d-flex justify-content-between align-items-center w-100">
            <div className="nav-logo">
              <img src={rhemaLogo} alt="" />
            </div>
            <div className="d-flex align-items-center">
              <div className="navlink" routerLinkActive="router-link-active">
                Home
                <Icon icon="bxs:down-arrow" />
                <span className="ms-2 text-lg">
                  <span
                    className="iconify"
                    dataIcon="fontisto:angle-dobule-down"
                  ></span>
                </span>
              </div>

              <div className="navlink" routerLinkActive="router-link-active">
                Apply
              </div>
              <div className="navlink" routerLinkActive="router-link-active">
                Admissions
                <Icon icon="bxs:down-arrow" />
                <span className="ms-2 text-lg">
                  <span
                    className="iconify"
                    dataIcon="fontisto:angle-dobule-down"
                  ></span>
                </span>
              </div>
              <div className="navlink" routerLinkActive="router-link-active">
                Academics
                <Icon icon="bxs:down-arrow" />
                <span className="ms-2 text-lg">
                  <span
                    className="iconify"
                    dataIcon="fontisto:angle-dobule-down"
                  ></span>
                </span>
              </div>

              <div className="navlink" routerLinkActive="router-link-active">
                Students
                <Icon icon="bxs:down-arrow" />
                <span className="ms-2 text-lg">
                  <span
                    className="iconify"
                    dataIcon="fontisto:angle-dobule-down"
                  ></span>
                </span>
              </div>
            </div>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="guest-content-wrapper">{children}</div>

      <footer className="guest-layout">
        <div className="bottom-footer text-center">
          <div className="container">
            <div className="d-flex align-items-center justify-content-center social-links mb-4">
              <a
                href="https://facebook.com/rhema"
                target="_blank"
                className="me-4"
              >
                <Icon icon="bxl:facebook-circle" width="40" height="40" />
              </a>

              <a
                href="https://twitter.com/rhema"
                target="_blank"
                className="me-4"
              >
                <Icon icon="ant-design:twitter-circle-filled" width="40" height="40" />
              </a>
              <a
                href="https://youtube.com/rhema"
                target="_blank"
                className="me-4"
              >
                 <Icon icon="cib:youtube" width="40" height="40" />
              </a>
              <a
                href="https://instagram.com/rhema"
                target="_blank"
                className="me-4"
              >
                <Icon icon="akar-icons:instagram-fill" width="40" height="40" />
              </a>
            </div>
            <div className="d-flex justify-content-center font10 flex-wrap mb-4">
              <a href="/">Home</a>
              <span className="text-grey-200 text-opacity-25 mx-3">/</span>
              <a href="/">Apply</a>
              <span className="text-grey-200 text-opacity-25 mx-3">/</span>
              <a href="/">Admissions</a>
              <span className="text-grey-200 text-opacity-25 mx-3">/</span>
              <a href="/">Academics</a>
              <span className="text-grey-200 text-opacity-25 mx-3">/</span>
              <a href="/">Students</a>
              <span className="text-grey-200 text-opacity-25 mx-3">/</span>
              <a href="/">News & Events</a>
              <span className="text-grey-200 text-opacity-25 mx-3">/</span>
              <a href="/">Give</a>
            </div>
            <p className="font10 text-grey-100 text-opacity-75 mb-4">
              Copyright © 2021 Rhema Bible Training College <br />
              Plot 570, Ndola Crescent, Opp. Samfa Plaza, off Michael Okpara
              Street. Wuse Zone 5, Abuja, Nigeria
            </p>
            <p className="mb-5">Privacy Policy</p>
            <i>
              Rhema Bible Training Center Nigeria exists as a vital extension of
              the mandate given to Kenneth E. Hagin in 1950 to ‘go and teach my
              people faith’ and so help usher in the last great move of God’s
              Spirit and the return of Jesus. The Bible School helps people to
              know God’s Word. When someone knows God’s Word they will grow in
              their faith and apply it to their life.
            </i>
          </div>
        </div>
      </footer>
    </>
  );
};

export default AppLayoutWrapper;
