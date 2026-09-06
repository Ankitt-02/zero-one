import React from "react";

function Footer() {
  return (
    <footer className="bg-light">
      <div className="container border-top mt-5 pt-5">
        {/* TOP SECTION */}
        <div className="row">
          {/* LEFT */}
          <div className="col-lg-3">
            <img
              src="media/images/O-1Logo.png"
              alt="logo"
              className="mb-3"
              style={{ width: "60%" }}
            />

            <p className="text-muted small">
              © 2026, Zero-One Ltd.
              <br />
              All rights reserved.
            </p>

            <div className="d-flex gap-3 text-muted">
              <i className="fa fa-twitter"></i>
              <i className="fa fa-facebook"></i>
              <i className="fa fa-instagram"></i>
              <i className="fa fa-linkedin"></i>
            </div>
          </div>

          {/* COMPANY */}
          <div className="col-lg-3">
            <p className="fw-semibold">Company</p>
            <div className="d-flex flex-column gap-2">
              <a href="/about" className="text-muted text-decoration-none">
                About
              </a>
              <a href="/product" className="text-muted text-decoration-none">
                Products
              </a>
              <a href="/pricing" className="text-muted text-decoration-none">
                Pricing
              </a>

              <a href="*" className="text-muted text-decoration-none">
                Careers
              </a>
            </div>
          </div>

          {/* SUPPORT */}
          <div className="col-lg-3">
            <p className="fw-semibold">Support</p>
            <div className="d-flex flex-column gap-2">
              <a
                href="https://www.linkedin.com/in/ankit-swami-161b80301/"
                className="text-muted text-decoration-none"
              >
                Contact
              </a>
              <a href="/about" className="text-muted text-decoration-none">
                Support portal
              </a>
              <a href="*" className="text-muted text-decoration-none">
                01-Connect blog
              </a>
              <a href="/pricing" className="text-muted text-decoration-none">
                List of charges
              </a>
            </div>
          </div>

          {/* ACCOUNT */}
          <div className="col-lg-3">
            <p className="fw-semibold">Account</p>
            <div className="d-flex flex-column gap-2">
              <a href="demo" className="text-muted text-decoration-none">
                Open an account
              </a>
              <a href="demo" className="text-muted text-decoration-none">
                Fund transfer
              </a>
              <a href="demo" className="text-muted text-decoration-none">
                60 day challenge
              </a>
            </div>
          </div>
        </div>

        {/* DISCLAIMER SECTION */}
        <div className="mt-5 text-muted small">
          <p>
            Zero One is built for people who think investing platforms should
            feel smooth, fast, and actually enjoyable to use. We focus on clean
            design, powerful technology, and creating an experience that doesn’t
            feel like it was designed in 2009.
          </p>

          <p>
            We believe investing should be accessible to everyone, not hidden
            behind complicated dashboards and financial jargon that sounds like
            a secret society meeting. Simple products. Real technology. No
            unnecessary noise.
          </p>

          <p>
            Investments in the stock market are subject to market risks. Some
            days your portfolio will make you feel like a genius. Other days, it
            will build character. Please invest responsibly and do your own
            research.
          </p>

          <p>
            Keep your account secure, never share your OTPs, and remember — if
            someone on the internet promises guaranteed profits, they are
            probably selling a course, not financial wisdom.
          </p>

          <p>
            Zero One does not give stock tips, “100% accurate” signals, or
            overnight millionaire schemes. We build technology for investors.
            The decisions, wins, and learning curves are all part of your
            journey.
          </p>

          <p>
            Built with ambition, caffeine, late night debugging, and enough
            console logs to scare a production server.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
