const { Schema } = require("mongoose");

const OrdersSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "user",
    default: null,
    index: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
    uppercase: true,
  },
  qty: {
    type: Number,
    required: true,
    min: 1,
  },
  price: {
    type: Number,
    required: true,
    min: 0.01,
  },
  mode: {
    type: String,
    required: true,
    enum: ["BUY", "SELL"],
    uppercase: true,
  },
  status: {
    type: String,
    enum: ["OPEN", "PENDING", "COMPLETE", "REJECTED", "CANCELLED"],
    default: "OPEN",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

OrdersSchema.index({ userId: 1, createdAt: -1 });

module.exports = { OrdersSchema };