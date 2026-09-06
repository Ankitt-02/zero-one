import React, { useState } from "react";

function Hero() {
  const [search, setSearch] = useState("");

  const [selectedTicket, setSelectedTicket] = useState(null);

  const tickets = [
    {
      title: "How do I activate F&O?",
      response:
        "Go to Profile > Segments > Activate F&O and complete the verification process.",
    },

    {
      title: "How to open a Demat account?",
      response:
        "Click on Sign Up, verify Aadhaar and PAN, upload documents, and complete IPV verification.",
    },

    {
      title: "How to reset my password?",
      response:
        "Use the Forgot Password option on the login page to reset your password securely.",
    },

    {
      title: "Charges for intraday trading",
      response:
        "Intraday trades are charged at ₹20 or 0.03% per executed order, whichever is lower.",
    },

    {
      title: "How to withdraw funds?",
      response:
        "Go to Funds > Withdraw and enter the withdrawal amount to transfer money to your bank.",
    },

    {
      title: "How to add bank account?",
      response:
        "Navigate to Profile > Bank Details and upload a cancelled cheque or bank statement.",
    },

    {
      title: "How to buy mutual funds?",
      response:
        "Search your preferred mutual fund under Paisa and place a SIP or lump sum order.",
    },

    {
      title: "Why is my order rejected?",
      response:
        "Orders may get rejected because of insufficient margin, incorrect price, or exchange restrictions.",
    },

    {
      title: "How to update KYC details?",
      response:
        "Visit Profile > KYC and upload updated documents for verification.",
    },

    {
      title: "How to close my account?",
      response:
        "Download the closure form, fill it, sign it, and upload it through the support portal.",
    },

    {
      title: "Why is my balance negative?",
      response:
        "Negative balance may occur due to charges, penalties, or unsettled trades.",
    },

    {
      title: "How to check brokerage charges?",
      response:
        "Use the brokerage calculator available under Pricing to estimate all charges.",
    },
  ];

  const filteredTickets = tickets.filter((ticket) =>
    ticket.title.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <section
      className="container-fluid py-5"
      style={{
        backgroundColor: "#f5f5f5",
        minHeight: "auto",
      }}
    >
      <div className="container">
        {/* TOP */}
        <div className="d-flex justify-content-between align-items-center mb-5">
          <h1
            style={{
              fontSize: "3.2rem",
              fontWeight: "600",
              color: "#424242",
            }}
          >
            Support Portal
          </h1>

          <button
            className="btn btn-primary px-4 py-2"
            style={{
              fontSize: "1rem",
              borderRadius: "6px",
            }}
          >
            My tickets
          </button>
        </div>

        {/* SEARCH BAR */}
        <div
          className="bg-white shadow-sm mb-5"
          style={{
            borderRadius: "6px",
            border: "1px solid #dee2e6",
            padding: "14px 20px",
          }}
        >
          <div className="d-flex align-items-center">
            <i
              className="fa fa-search me-3"
              style={{
                fontSize: "1rem",
                color: "#777",
              }}
            ></i>

            <input
              type="text"
              placeholder="Eg: How do I open my account, How do I activate F&O..."
              className="w-100 border-0"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                outline: "none",
                fontSize: "1.1rem",
                color: "#555",
                background: "transparent",
              }}
            />
          </div>
        </div>

        {/* FREQUENT TICKETS */}
        <div className="mt-4">
          <h3
            className="mb-4"
            style={{
              color: "#424242",
              fontWeight: "600",
            }}
          >
            Frequent Tickets
          </h3>

          <div className="row">
            {filteredTickets.map((ticket, index) => (
              <div className="col-lg-4 col-md-6 mb-4" key={index}>
                <div
                  onClick={() =>
                    setSelectedTicket(
                      selectedTicket?.title === ticket.title ? null : ticket,
                    )
                  }
                  className="bg-white shadow-sm h-100"
                  style={{
                    borderRadius: "8px",
                    padding: "20px",
                    border: "1px solid #e5e5e5",
                    cursor: "pointer",
                    transition: "0.2s",
                  }}
                >
                  <div className="d-flex align-items-start">
                    <i
                      className="fa fa-file-text-o me-3 mt-1"
                      style={{
                        color: "#387ed1",
                        fontSize: "1rem",
                      }}
                    ></i>

                    <p
                      className="mb-0"
                      style={{
                        fontSize: "1rem",
                        color: "#424242",
                        fontWeight: "500",
                      }}
                    >
                      {ticket.title}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RESPONSE BOX */}
        {selectedTicket && (
          <div
            className="bg-white shadow-sm mt-4"
            style={{
              borderRadius: "8px",
              padding: "25px",
              border: "1px solid #e5e5e5",
            }}
          >
            <h4
              className="mb-3"
              style={{
                color: "#424242",
                fontWeight: "600",
              }}
            >
              {selectedTicket.title}
            </h4>

            <p
              className="mb-0"
              style={{
                color: "#666",
                lineHeight: "1.8",
                fontSize: "1rem",
              }}
            >
              {selectedTicket.response}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default Hero;
