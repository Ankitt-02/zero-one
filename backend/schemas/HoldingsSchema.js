const { Schema } = require("mongoose");

const HoldingsSchema = new Schema({
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
    min: 0,
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
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

HoldingsSchema.index({ userId: 1, name: 1 });

module.exports = { HoldingsSchema };