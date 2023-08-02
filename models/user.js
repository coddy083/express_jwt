const mongoose = require("mongoose");

// User 스키마 정의
const UserSchema = new mongoose.Schema({
  uid: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

// User 모델 생성
const User = mongoose.model("User", UserSchema);

module.exports = User;
