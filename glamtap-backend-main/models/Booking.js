const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },

    customer: {
      firstName: {
        type: String,
        required: true,
      },

      lastName: {
        type: String,
        default: "",
      },

      email: {
        type: String,
        default: "",
      },

      phone: {
        type: String,
        required: true,
      },

      address: {
        type: String,
        required: true,
      },

      city: {
        type: String,
        default: "",
      },

      state: {
        type: String,
        default: "",
      },

      pin: {
        type: String,
        default: "",
      },
    },

    services: [
      {
        serviceId: {
          type: mongoose.Schema.Types.Mixed, // ✅ fixed — number ya ObjectId dono chal jayenge
        },

        name: {
          type: String,
          required: true,
        },

        image: {
          type: String,
        },

        price: {
          type: Number,
          required: true,
        },

        quantity: {
          type: Number,
          default: 1,
        },

        waxType: {
          type: String,
          default: null,
        },
      },
    ],

    salonId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Salon",
      required: false,
    },

    beauticianId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Beautician",
      required: false,
    },

    couponCode: {
      type: String,
      default: null,
    },

    discount: {
      type: Number,
      default: 0,
    },

    transactionId: {
      type: String,
      default: null,
    },

    settlementStatus: {
      type: String,
      enum: ["Unsettled", "Settled"],
      default: "Unsettled",
    },

    bookingDate: {
      type: Date,
    },

    bookingTime: {
      type: String,
    },

    subtotal: {
      type: Number,
      required: true,
    },

    tax: {
      type: Number,
      required: true,
    },

    totalAmount: {
      type: Number,
      required: true,
    },

    paymentMethod: {
      type: String,
      enum: ["Pay After Service", "Razorpay"],
      default: "Pay After Service",
    },

    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed"],
      default: "Pending",
    },

    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Completed", "Cancelled"],
      default: "Pending",
    },

    notes: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Booking", bookingSchema);