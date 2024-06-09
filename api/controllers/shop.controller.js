import Shop from "../models/shop.model.js";
import asyncHandler from "../middlewares/asyncHandler.js";

export const create = asyncHandler(async (req, res, next) => {
  const requiredFields = [
    { field: "shopName", message: "Shop name is required. " },
    { field: "shopOwner", message: "Shop owner is required." },
    {
      field: "contact",
      message: "Contact number must be exactly 11 digits.",
      length: 11,
    },
    { field: "cnic", message: "CNIC must be exactly 13 digits.", length: 13 },
    { field: "address", message: "Address is required." },
    { field: "coordinates", message: "Coordinates are required." },
    { field: "route", message: "Route is required." },
    { field: "category", message: "Category is required." },
  ];

  for (const { field, message, length } of requiredFields) {
    const value = req.body[field];
    if (!value) {
      res.status(400);
      throw new Error(message);
    }
    if (length && value.toString().length !== length) {
      res.status(400);
      throw new Error(message);
    }
  }

  const shop = await Shop.create(req.body);

  if (shop) {
    res.status(201).json(shop);
  } else {
    res.status(500);
    throw new Error("Shop creation failed");
  }
});

// Remove a shop by ID
export const remove = asyncHandler(async (req, res, next) => {
  const shop = await Shop.findByIdAndDelete(req.params.shopId);

  res.status(200).json(shop._id);
});

// Get all shops
export const getall = asyncHandler(async (req, res, next) => {
  const shops = await Shop.find();
  res.status(200).json(shops);
});

// Get a shop by ID
export const getById = asyncHandler(async (req, res, next) => {
  const shop = await Shop.findById(req.params.shopId);

  if (!shop) {
    res.status(404);
    throw new Error("Shop not found");
  }

  res.status(200).json(shop);
});

// Update a shop by ID
export const update = asyncHandler(async (req, res, next) => {
  const { shopId } = req.params;

  // Check if shopId is provided
  if (!shopId) {
    res.status(400);
    throw new Error("Shop ID is required");
  }

  const updates = req.body;

  // Check if updates object is empty
  if (Object.keys(updates).length === 0) {
    res.status(400);
    throw new Error("No updates provided");
  }

  // Find the shop by ID and update it
  const shop = await Shop.findByIdAndUpdate(shopId, updates, {
    new: true, // Return the updated shop
    runValidators: true, // Run validators to ensure data validity
  });

  // Check if shop is found
  if (!shop) {
    res.status(404);
    throw new Error("Shop not found");
  }

  res.status(200).json(shop);
});
