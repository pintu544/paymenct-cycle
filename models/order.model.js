import mongoose, { Schema, model } from "mongoose";

const orderSchema = new Schema(
  {
    orderId: { type: Number, required: true },
    orderRate: { type: Number },
    CODcharges: { type: Number },
    usersId: { type: String, required: true },
    status: { type: String, enum: ["Pending", "Completed"], required: true },
    shippingDate: { type: Date, required: true },
    pickupTime: { type: Date },
    deadWeight: { type: mongoose.Types.Decimal128 },
    length: { type: mongoose.Types.Decimal128 },
    breadth: { type: mongoose.Types.Decimal128 },
    height: { type: mongoose.Types.Decimal128 },
  },
  { timestamps: true }
);

export const Order = model("Order", orderSchema);
