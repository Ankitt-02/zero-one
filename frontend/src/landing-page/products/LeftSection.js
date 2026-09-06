import React from "react";

function LeftSection({
  imageURL,
  productName,
  productDescription,
  tryDemo,
  learnMore,
}) {
  return (
    <div className="container">
      <div className="row p-5">
        <div className="col-6 p-5">
          <img src={imageURL} alt="someimg" style={{width:"85%"}}></img>
        </div>
        <div className="col-6 p-5 mt-5">
          <h1>{productName}</h1>
          <p className="mt-5 mb-3">{productDescription}</p>
          <div className="mt-3">
            <a href={tryDemo} style={{textDecoration:"none"}} >
            Try Demo{" "}
            <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
          </a>
          <a href={learnMore} style={{marginLeft: "50px", textDecoration:"none"}}>
            Learn More{" "}
            <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
          </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeftSection;
