import mongoose from "mongoose";

const shopSchema = mongoose.Schema(
  {
    shopName: {
      type: String,
      required: true,
    },
    shopOwner: {
      type: String,
      required: true,
    },
    contact: {
      type: Number,
      required: true,
      min: 11,
    },
    cnic: {
      type: Number,
      required: true,
      min: 13,
    },
    address: {
      type: String,
      required: true,
    },
    coordinates: {
      type: String,
      required: true,
    },
    route: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Shop = mongoose.model("Shop", shopSchema);

export default Shop;
