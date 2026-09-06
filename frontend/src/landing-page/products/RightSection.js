import React from "react";

function RightSection({
  imageURL,
  productName,
  productDescription,
  learnMore,
}) {
  return (
    <div className="container">
      <div className="row p-5">
        <div className="col-6 p-5 mt-5">
          <h1>{productName}</h1>
          <p className="mt-5">{productDescription}</p>
          <div className="mt-3"> 
            <a href={learnMore} style={{textDecoration:"none"}} >
              Learn More{" "}
              <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
            </a>
          </div>
        </div>
        <div className="col-6 p-5">
          <img src={imageURL} alt="some img" style={{width:"100%"}}></img>
        </div>
      </div>
    </div>
  );
}

export default RightSection;
