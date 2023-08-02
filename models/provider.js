const mongoose = require("mongoose");

// Provider 스키마 정의
const ProviderSchema = new mongoose.Schema({
  apiUrl: {
    type: String,
    unique: true,
    required: true,
  },
  apiKey: {
    type: String,
    required: true,
  },
});

// Provider 모델 생성
const Provider = mongoose.model("Provider", ProviderSchema);

module.exports = Provider;
