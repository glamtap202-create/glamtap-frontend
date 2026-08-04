import React from "react";

const CancellationRefundPolicy = () => {
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
            fontSize: "clamp(22px, 5vw, 36px)",
          }}
        >
          Cancellation & Refund Policy
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
          At <strong>GlamTap</strong>, customer satisfaction is important to us.
          This Cancellation & Refund Policy explains the rules regarding
          appointment cancellations, rescheduling, and refunds.
        </p>

        <Section
          title="1. Appointment Cancellation"
          items={[
            "Customers may cancel their appointment before the scheduled service time.",
            "Cancellation requests should be made through the GlamTap website or customer support.",
            "Repeated cancellations may affect future booking privileges.",
          ]}
        />

        <Section
          title="2. Rescheduling"
          items={[
            "Appointments can be rescheduled based on salon availability.",
            "Rescheduling requests should be submitted before the appointment time.",
          ]}
        />

        <Section
          title="3. Refund Eligibility"
          items={[
            "Refunds are applicable only for eligible cancelled bookings.",
            "If a service cannot be provided due to salon-related issues, customers may be eligible for a full refund.",
            "Refund requests are reviewed on a case-by-case basis.",
          ]}
        />

        <Section
          title="4. Non-Refundable Situations"
          items={[
            "No-show appointments.",
            "Cancellation after the scheduled appointment time.",
            "Services already completed.",
            "Customer dissatisfaction after successful service unless required by applicable law.",
          ]}
        />

        <Section
          title="5. Refund Processing"
          text="Approved refunds will be processed through the original payment method. Depending on your bank or payment provider, the refund may take 5–10 business days to reflect."
        />

        <Section
          title="6. Payment Gateway Charges"
          text="Any payment gateway or banking charges deducted by third-party payment providers may be non-refundable unless otherwise required by law."
        />

        <Section
          title="7. Exceptional Circumstances"
          text="In exceptional situations such as technical issues, duplicate payments, or service provider cancellation, GlamTap reserves the right to issue a full or partial refund."
        />

        <Section
          title="8. Changes to this Policy"
          text="GlamTap reserves the right to update or modify this Cancellation & Refund Policy at any time. Updated versions will be published on this page."
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
            If you have any questions regarding our Cancellation & Refund
            Policy, please contact us.
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

export default CancellationRefundPolicy;