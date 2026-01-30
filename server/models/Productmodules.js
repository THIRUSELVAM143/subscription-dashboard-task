const mongoose = require("mongoose");

const priceSchema = new mongoose.Schema({
  make: String,
  model: String,
  minSales: Number,
  maxSales: Number,
  purchasePrice: Number,
  warrantyMonths: Number,
  productLifeTime: Number
});

const gstSchema = new mongoose.Schema({
  label: String,
  taxPreference: String,
  intraStateTax: Number,
  interStateTax: Number,
  exemptionReason: String,
  effectiveDate: Date
});

const chargeSchema = new mongoose.Schema({
  minPrice: Number,
  maxPrice: Number,
  gst: Number,
  igst: Number
});
const otherChargesSchema = new mongoose.Schema({
  amcCharges: chargeSchema,
  camcCharges: chargeSchema,
  monthlyRentalCharges: chargeSchema,
  serviceCharges: chargeSchema,
  installationCharges: chargeSchema,
  scrapValue: chargeSchema
});

const stampingSchema = new mongoose.Schema({
//   type: String,
  charges: Number,
  year: Number,
  gst: Number
});

const productSchema = new mongoose.Schema(
  {
    itemType: String,
    billingType: String,
    mainCategory: String,
    subCategory: String,
    itemName: String,
    productCode: String,
    hsnCode: String,
    hsnDescription: String,
    marketName: String,
    unit: String,
    city: String,
    typeOfProduct: String,

    componentType: String,
    capacity: String,
    description: String,

    priceDetails: [priceSchema],
    gstDetails: [gstSchema],
    otherDetails: otherChargesSchema,
    stampingDetails: stampingSchema
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
