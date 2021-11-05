import pkg from "mongoose";
const { Schema, model } = pkg;

// Create Schema
const RefreshTokenSchema = new Schema({
  userId: { type: Object, required: true },
  token: { type: String, required: true },
  expiresAt: { type: Date, required: true },
});

const RefreshToken = model("refreshToken", RefreshTokenSchema);

export default RefreshToken;
