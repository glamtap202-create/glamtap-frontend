import React from "react";

const TermsConditions = () => {
  return (
    <div
      style={{
        background: "#f8f9fa",
        minHeight: "100vh",
        padding: "clamp(24px, 8vw, 60px) clamp(12px, 4vw, 20px)",
      }}
    >
      <div
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
          background: "#fff",
          borderRadius: "15px",
          padding: "clamp(20px, 6vw, 50px)",
          boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            color: "#ec4899",
            marginBottom: "10px",
            fontSize: "clamp(24px, 5vw, 36px)",
          }}
        >
          Terms & Conditions
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "#666",
            marginBottom: "40px",
            fontSize: "clamp(13px, 2.5vw, 16px)",
          }}
        >
          Effective Date: <strong>04 August 2026</strong>
        </p>

        <p
          style={{
            lineHeight: "1.8",
            color: "#555",
            fontSize: "clamp(14px, 2.5vw, 16px)",
            wordBreak: "break-word",
          }}
        >
          Welcome to <strong>GlamTap</strong>. By accessing and using our
          website and services, you agree to comply with the following Terms &
          Conditions. Please read them carefully before booking any service.
        </p>

        <Section
          title="1. Acceptance of Terms"
          text="By using GlamTap, you confirm that you have read, understood, and agreed to these Terms & Conditions."
        />

        <Section
          title="2. Booking Services"
          items={[
            "Appointments are subject to availability.",
            "Customers must provide accurate booking information.",
            "GlamTap reserves the right to cancel or reschedule appointments if necessary.",
          ]}
        />

        <Section
          title="3. User Responsibilities"
          items={[
            "Provide correct personal details.",
            "Arrive on time for appointments.",
            "Maintain respectful behavior with salon professionals.",
            "Do not misuse the website or attempt unauthorized access.",
          ]}
        />

        <Section
          title="4. Payments"
          text="All payments must be completed through the available payment methods on the website. Prices are subject to change without prior notice."
        />

        <Section
          title="5. Cancellation Policy"
          text="Appointments may be cancelled according to our Cancellation & Refund Policy. Late cancellations may not be eligible for a refund."
        />

        <Section
          title="6. Intellectual Property"
          text="All content on GlamTap, including text, images, logos, graphics, and designs, is the property of GlamTap and may not be copied or reused without written permission."
        />

        <Section
          title="7. Limitation of Liability"
          text="GlamTap acts as a platform connecting customers with salon service providers. We are not liable for any indirect, incidental, or consequential damages arising from the services provided by salon partners."
        />

        <Section
          title="8. Privacy"
          text="Your personal information is handled according to our Privacy Policy."
        />

        <Section
          title="9. Changes to Terms"
          text="We reserve the right to modify these Terms & Conditions at any time. Updated terms will be posted on this page."
        />

        <Section
          title="10. Governing Law"
          text="These Terms & Conditions shall be governed by the laws of India. Any disputes shall be subject to the jurisdiction of the competent courts."
        />

        <div
          style={{
            marginTop: "40px",
            background: "#fff5fa",
            padding: "clamp(14px, 4vw, 20px)",
            borderRadius: "10px",
            borderLeft: "5px solid #ec4899",
          }}
        >
          <h3
            style={{
              color: "#ec4899",
              fontSize: "clamp(16px, 3vw, 20px)",
            }}
          >
            Contact Us
          </h3>

          <p style={{ fontSize: "clamp(14px, 2.5vw, 16px)" }}>
            If you have any questions regarding these Terms & Conditions, please
            contact us.
          </p>

          <p
            style={{
              fontSize: "clamp(14px, 2.5vw, 16px)",
              wordBreak: "break-word",
            }}
          >
            <strong>Website:</strong> https://glamtap.in
          </p>

          <p
            style={{
              fontSize: "clamp(14px, 2.5vw, 16px)",
              wordBreak: "break-word",
            }}
          >
            <strong>Email:</strong> support@glamtap.in
          </p>
        </div>
      </div>
    </div>
  );
};

const Section = ({ title, text, items }) => (
  <div style={{ marginTop: "35px" }}>
    <h2
      style={{
        color: "#ec4899",
        fontSize: "clamp(18px, 4vw, 24px)",
        marginBottom: "15px",
      }}
    >
      {title}
    </h2>

    {text && (
      <p
        style={{
          lineHeight: "1.8",
          color: "#555",
          fontSize: "clamp(14px, 2.5vw, 16px)",
        }}
      >
        {text}
      </p>
    )}

    {items && (
      <ul
        style={{
          lineHeight: "2",
          color: "#555",
          fontSize: "clamp(14px, 2.5vw, 16px)",
          paddingLeft: "clamp(18px, 4vw, 24px)",
        }}
      >
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    )}
  </div>
);

export default TermsConditions;