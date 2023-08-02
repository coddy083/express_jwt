const mongoose = require("mongoose");

// Product 스키마 정의
const ProductSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  service: {
    type: String,
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  popularity: {
    type: Number,
    required: true,
  },
});

// Product 모델 생성
const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
