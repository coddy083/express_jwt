const mongoose = require("mongoose");

// Service 스키마 정의
const ServiceSchema = new mongoose.Schema({
  provider: {
    type: String,
    required: true,
  },
  serviceIcon: {
    type: String,
    required: true,
  },
  serviceId: {
    type: String,
    unique: true,
    required: true,
  },
  serviceName: {
    type: String,
    required: true,
  },
});

// Service 모델 생성
const Service = mongoose.model("Service", ServiceSchema);

module.exports = Service;
