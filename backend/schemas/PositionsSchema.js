const { Schema } = require("mongoose");

const PositionsSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "user",
    default: null,
    index: true,
  },
  product: {
    type: String,
    default: "CNC",
    trim: true,
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
  },
  avg: {
    type: Number,
    required: true,
    min: 0,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  net: {
    type: String,
    default: "0.00%",
  },
  day: {
    type: String,
    default: "0.00%",
  },
  isLoss: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

PositionsSchema.index({ userId: 1, name: 1 });

module.exports = { PositionsSchema };