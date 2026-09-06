import React from "react";

function About() {
  return (
    <div className="container">
      <div className="row p-5 mt-5 mb-5 border-top">
        <h1 className="text-center mt-5">People</h1>
      </div>
      <div className="row p-5 mt-5 border-top text-muted">
        <div className="col-6 p-5 text-center">
          <img
            src="media/images/ankitSwami.jpg"
            style={{ borderRadius: "100%", width: "55%" }}
            alt="Founder Pic"
          ></img>
          <h4 className="mt-3">Ankit Swami</h4>
          <h6>Developer, 0-1</h6>
        </div>
        <div className="col-6 p-5">
          <p>
            Ankit Swami is a B.Tech student and the founder of Zero-One, driven
            by a strong interest in technology, product design, and modern
            financial platforms. Alongside academics, he has worked on multiple
            development projects focused on real-time systems, seamless user
            experiences, and scalable web applications — including video
            communication platforms and community-driven products.
          </p>{" "}
          <p>
            {" "}
            He is passionate about building technology that feels modern,
            intuitive, and accessible to the next generation of users and
            investors.
          </p>{" "}
          <p>Playing football is his zen.</p>{" "}
          <p>
            {" "}
            Connect on{" "}
            <a
              href="https://www.linkedin.com/in/ankit-swami-161b80301/"
              style={{ textDecoration: "none" }}
            >
              LinkedIn
            </a>{" "}
            /{" "}
            <a
              href="https://x.com/AnkitSwami66750"
              style={{ textDecoration: "none" }}
            >
              {" "}
              Twitter
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
