import React from "react";

function Hero() {
  return (
    <div className="container">
      <div className="row p-5 mt-5 mb-5">
        <h1 className="fs-2 text-center">
          We simplified investing for modern traders.
          <br />
          Now, Zero-One is redefining it through technology.
        </h1>
      </div>
      <div className="row p-5 mt-5 border-top text-muted">
        <div className="col-6 p-5">
          <p>
            Zero-One was built with a vision to make investing simpler, faster,
            and more accessible for the next generation of traders and
            investors. We started with the belief that modern financial
            platforms should combine powerful technology with a seamless user
            experience.
          </p>
          <p>
            {" "}
            Today, Zero-One is focused on creating a technology-driven investing
            ecosystem designed for speed, reliability, and simplicity. From
            intuitive interfaces to scalable infrastructure, every product is
            built to help users trade and invest with confidence.
          </p>{" "}
          <p>
            {" "}
            As we continue to grow, our mission remains the same — to remove
            complexity from investing and build a platform that feels truly
            modern from the ground up.
          </p>
        </div>
        <div className="col-6 p-5">
          <p>
            Beyond building a modern investing platform, Zero-One is focused on
            creating a stronger and more informed trading community. We aim to
            make financial technology more accessible through intuitive
            products, educational content, and user-first experiences.
          </p>{" "}
          <p>
            {" "}
            We continuously experiment with new ideas, improve our
            infrastructure, and develop features that simplify investing for
            everyday users. Innovation remains at the center of everything we
            build.
          </p>{" "}
          <p>
            {" "}
            As Zero-One grows, our focus stays constant — building technology
            that makes investing smarter, faster, and more seamless for the next
            generation.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Hero;
