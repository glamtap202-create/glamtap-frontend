import React from "react";

const PrivacyPolicy = () => {
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
            fontWeight: "700",
            marginBottom: "10px",
            fontSize: "clamp(24px, 5vw, 36px)",
          }}
        >
          Privacy Policy
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
          Welcome to <strong>GlamTap</strong>. We value your privacy and are
          committed to protecting your personal information. This Privacy Policy
          explains how we collect, use, store, and protect your information
          while using our website and services.
        </p>

        <hr />

        <Section
          title="1. Information We Collect"
          items={[
            "Full Name",
            "Email Address",
            "Mobile Number",
            "Address",
            "Appointment & Booking Details",
            "Payment Information (Processed Securely)",
            "Device Information (IP Address, Browser & Cookies)",
          ]}
        />

        <Section
          title="2. How We Use Your Information"
          items={[
            "Process salon bookings.",
            "Provide customer support.",
            "Improve our website and services.",
            "Send booking confirmations.",
            "Prevent fraud and misuse.",
          ]}
        />

        <Section
          title="3. Payment Information"
          text="Payments are processed through trusted third-party payment gateways. GlamTap never stores your complete debit or credit card details."
        />

        <Section
          title="4. Cookies"
          text="We use cookies to improve your browsing experience, remember preferences, and analyze website traffic."
        />

        <Section
          title="5. Sharing of Information"
          items={[
            "Salon Partners",
            "Payment Gateway Providers",
            "Government Authorities (when legally required)",
          ]}
        />

        <Section
          title="6. Data Security"
          text="We implement industry-standard security measures to protect your personal information from unauthorized access, misuse, or disclosure."
        />

        <Section
          title="7. Your Rights"
          items={[
            "Access your personal information.",
            "Request correction of inaccurate information.",
            "Request deletion of your account (where applicable).",
          ]}
        />

        <Section
          title="8. Third-Party Links"
          text="Our website may contain links to third-party websites. We are not responsible for their privacy practices or content."
        />

        <Section
          title="9. Children's Privacy"
          text="Our services are not intended for individuals under 18 years of age."
        />

        <Section
          title="10. Changes to this Privacy Policy"
          text="We may update this Privacy Policy periodically. Any changes will be published on this page with the updated effective date."
        />

        <div
          style={{
            background: "#fff5fa",
            borderLeft: "5px solid #ec4899",
            padding: "clamp(14px, 4vw, 20px)",
            borderRadius: "10px",
            marginTop: "40px",
          }}
        >
          <h3
            style={{
              color: "#ec4899",
              marginBottom: "15px",
              fontSize: "clamp(16px, 3vw, 20px)",
            }}
          >
            Contact Us
          </h3>

          <p style={{ fontSize: "clamp(14px, 2.5vw, 16px)" }}>
            If you have any questions regarding this Privacy Policy, please
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
          color: "#555",
          lineHeight: "1.8",
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

export default PrivacyPolicy;