const { Schema } = require("mongoose");
const plm = require("passport-local-mongoose");
const passportLocalMongoose = plm.default || plm;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.plugin(passportLocalMongoose, {
  usernameField: "email",
});

module.exports = { UserSchema };
