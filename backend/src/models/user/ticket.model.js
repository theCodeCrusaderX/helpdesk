import mongoose, { Schema } from "mongoose";

const ticketSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["Active", "Pending", "Closed"], // Restrict status to specific values
      default: "Active", // Default status
    },
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
    },
    lastUpdatedOn: {
      type: Date,
      default: Date.now,
    },
    note: {
      type: [
        {
          sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
          }, // Stores user ID
          text: { type: String }, // Message content
          timestamp: { type: Date, default: Date.now }, // Time of message
        },
      ],
      default: [],
    },
  },
  {
    timestamps: true, // Adds `createdAt` and `updatedAt` fields automatically
  }
);

// Middleware to update `lastUpdatedOn` before saving
ticketSchema.pre("save", function (next) {
  this.lastUpdatedOn = new Date();
  next();
});

// Middleware to update `lastUpdatedOn` before updating
ticketSchema.pre("findOneAndUpdate", function (next) {
  this.set({ lastUpdatedOn: new Date() });
  next();
});

// Export the Ticket model
export const Ticket = mongoose.model("Ticket", ticketSchema);
