// ** React Imports
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

// ** Third Party Components
import classnames from "classnames";
import { ArrowUp } from "react-feather";

// ** Reactstrap Imports
import { Navbar, Button } from "reactstrap";
import { Icon } from "@iconify/react";
import useToggle from "../../../utility/hooks/useToggle";
import rhemaLogo from "@src/assets/img/logo/logo.svg";

const hamburgerIcon = (
  <svg
    width="38"
    height="22"
    viewBox="0 0 38 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1.5 1H36.5"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M1.5 11H36.5"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M1.5 21H36.5"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const closeIcon = (
  <svg
    width="27"
    height="27"
    viewBox="0 0 27 27"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1 1L25.7487 25.7487"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M1 25.748L25.7487 0.99931"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const navItems = (
  <>
    <div
      className="navlink"
      // routerLinkActive="router-link-active"
    >
      <a href="https://rhemanigeria.com/" target="_blank" rel="noreferrer">
        Home
      </a>
      {/* <Icon icon="bxs:down-arrow" /> */}
      <span className="ms-2 text-lg">
        {/* <span className="iconify" dataIcon="fontisto:angle-dobule-down"></span> */}
      </span>
    </div>

    <div
      className="navlink"
      // routerLinkActive="router-link-active"
    >
      <a
        href="https://app.rhemanigeria.com/register"
        target="_blank"
        rel="noreferrer"
      >
        Apply
      </a>
    </div>
    <div
      className="navlink"
      // routerLinkActive="router-link-active"
    >
      <a
        href="https://rhemanigeria.com/why-rbtc"
        target="_blank"
        rel="noreferrer"
      >
        Admissions
      </a>
      {/* <Icon icon="bxs:down-arrow" /> */}
      <span className="ms-2 text-lg">
        {/* <span className="iconify" dataIcon="fontisto:angle-dobule-down"></span> */}
      </span>
    </div>
    <div
      className="navlink"
      // routerLinkActive="router-link-active"
    >
      <a
        href="https://rhemanigeria.com/rbtc-programs"
        target="_blank"
        rel="noreferrer"
      >
        Academics
      </a>
      {/* <Icon icon="bxs:down-arrow" /> */}
      <span className="ms-2 text-lg">
        {/* <span className="iconify" dataIcon="fontisto:angle-dobule-down"></span> */}
      </span>
    </div>

    <div className="navlink">
      <a href="https://rhemanigeria.com/about" target="_blank" rel="noreferrer">
        Students
      </a>
      {/* <Icon icon="bxs:down-arrow" /> */}
      <span className="ms-2 text-lg">
        {/* <span className="iconify" dataIcon="fontisto:angle-dobule-down"></span> */}
      </span>
    </div>
  </>
);

const AppLayoutWrapper = (props) => {
  // ** Props
  const { menuData, children } = props;

  const [mobileNavOpen, toggleMobileNav] = useToggle();

  // const rhemaLogo = require(`@src/assets/img/logo/logo.svg`).default;

  return (
    <main>
      {/* Mobile Nav */}
      <section className="mobile-nav-wrapper">
        <article className="d-flex align-items-center justify-content-between mobile-nav-top">
          <p className="navlink">Welcome!</p>
          <div
            // routerLink="/login"
            onClick={() => {
              window.location.href = "/login";
            }}
          >
            Login
          </div>
        </article>

        <nav
          style={{
            height: mobileNavOpen ? "100vh" : "",
          }}
          className="w-100 mobile-nav-bottom"
        >
          <article className="d-flex justify-content-between align-items-center w-100">
            <div className="nav-logo">
              <img src={rhemaLogo} alt="rhemarNigeria" />
            </div>

            <div onClick={toggleMobileNav}>
              {mobileNavOpen ? closeIcon : hamburgerIcon}
            </div>
          </article>

          {/* Menu */}
          {mobileNavOpen && <ul className="mobile-nav-items">{navItems}</ul>}
        </nav>
      </section>

      {/* Web nav */}
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
                <span
                  // routerLink="/login"
                  onClick={() => {
                    window.location.href = "/login";
                  }}
                >
                  Student Login
                </span>
                <span className="mx-2"> |</span>
                <span
                  // routerLink="/register"
                  onClick={() => {
                    window.location.href = "/register";
                  }}
                >
                  Apply Now{" "}
                </span>
                <span className="mx-2"> |</span>
              </div>
            </div>
            <div className="d-flex align-items-center social-links">
              <a
                href="https://facebook.com/rhemanigeria"
                target="_blank"
                className="me-4"
                rel="noreferrer"
              >
                <Icon icon="bxl:facebook-circle" />
              </a>

              <a
                href="https://twitter.com/rhemanigeria"
                target="_blank"
                className="me-4"
                rel="noreferrer"
              >
                <Icon icon="ant-design:twitter-circle-filled" />
              </a>
              <a
                href="https://youtube.com/rhemanigeria"
                target="_blank"
                rel="noreferrer"
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
              <img src={rhemaLogo} alt="rhemarNigeria" />
            </div>
            <div className="d-flex align-items-center">{navItems}</div>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div
        style={{
          minHeight: "60vh",
        }}
        className="guest-content-wrapper"
      >
        {children}
      </div>

      <footer className="guest-layout">
        <div className="bottom-footer text-center">
          <div className="container">
            <div className="d-flex align-items-center justify-content-center social-links mb-4">
              <a
                href="https://facebook.com/rhemanigeria"
                target="_blank"
                className="me-4"
                rel="noreferrer"
              >
                <Icon icon="bxl:facebook-circle" width="40" height="40" />
              </a>

              <a
                href="https://twitter.com/rhemanigeria"
                target="_blank"
                className="me-4"
                rel="noreferrer"
              >
                <Icon
                  icon="ant-design:twitter-circle-filled"
                  width="40"
                  height="40"
                />
              </a>
              <a
                href="https://youtube.com/rhemanigeria"
                target="_blank"
                className="me-4"
                rel="noreferrer"
              >
                <Icon icon="cib:youtube" width="40" height="40" />
              </a>
              <a
                href="https://instagram.com/rhemanigeria"
                target="_blank"
                className="me-4"
                rel="noreferrer"
              >
                <Icon icon="akar-icons:instagram-fill" width="40" height="40" />
              </a>
            </div>
            <div className="d-flex justify-content-center font10 flex-wrap mb-4">
              <a href="/">Home</a>
              <span className="text-grey-200 text-opacity-25 mx-3">/</span>
              <a href="/register">Apply</a>
              <span className="text-grey-200 text-opacity-25 mx-3">/</span>
              <a
                target="_blank"
                rel="noreferrer"
                href="https://rhemanigeria.com/why-rbtc"
              >
                Admissions
              </a>
              <span className="text-grey-200 text-opacity-25 mx-3">/</span>
              <a
                target="_blank"
                rel="noreferrer"
                href="https://rhemanigeria.com/rbtc-programs"
              >
                Academics
              </a>
              <span className="text-grey-200 text-opacity-25 mx-3">/</span>
              <a
                target="_blank"
                rel="noreferrer"
                href="https://rhemanigeria.com/about"
              >
                Students
              </a>
              <span className="text-grey-200 text-opacity-25 mx-3">/</span>
              <a
                target="_blank"
                rel="noreferrer"
                href="https://rhemanigeria.com"
              >
                News & Events
              </a>
              <span className="text-grey-200 text-opacity-25 mx-3">/</span>
              <a
                target="_blank"
                rel="noreferrer"
                href="https://rhemanigeria.com/"
              >
                Give
              </a>
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
    </main>
  );
};

export default AppLayoutWrapper;
