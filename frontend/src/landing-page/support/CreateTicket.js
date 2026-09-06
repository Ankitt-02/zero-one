import React from "react";

function CreateTicket() {
  return (
    <div className="container">
      <div className="row p-5 mt-5 mb-5">
        <h1 className="fs-2 mb-5">
          To create a ticket, select a relevant topic
        </h1>

        {/* COLUMN 1 */}
        <div className="col-4">
          <h4 className="fw-semibold mb-4">
            <i className="fa fa-plus-circle me-2"></i>
            Account Opening
          </h4>

          <div className="d-flex flex-column">
            <button className="ticket-btn">Online Account Opening</button>

            <button className="ticket-btn">Offline Account Opening</button>

            <button className="ticket-btn">
              Company, Partnership and HUF Account Opening
            </button>

            <button className="ticket-btn">NRI Account Opening</button>

            <button className="ticket-btn">Charges at Zero-One</button>
          </div>
        </div>

        {/* COLUMN 2 */}
        <div className="col-4">
          <h4 className="fw-semibold mb-4">
            <i className="fa fa-user me-2"></i>
            Your Zero-One Account
          </h4>

          <div className="d-flex flex-column">
            <button className="ticket-btn">Login Credentials</button>

            <button className="ticket-btn">
              Account Modification and Segment Addition
            </button>

            <button className="ticket-btn">Your Profile</button>

            <button className="ticket-btn">
              Transfer and Conversion of Shares
            </button>
          </div>
        </div>

        {/* COLUMN 3 */}
        <div className="col-4">
          <h4 className="fw-semibold mb-4">
            <i className="fa fa-line-chart me-2"></i>
            Trading and Markets
          </h4>

          <div className="d-flex flex-column">
            <button className="ticket-btn">Product and Order Types</button>

            <button className="ticket-btn">Core</button>

            <button className="ticket-btn">Trading FAQs</button>

            <button className="ticket-btn">Paisa</button>

            <button className="ticket-btn">Sink</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateTicket;
