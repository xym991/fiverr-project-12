const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    price:{type: Number},
    status :{type: String, default :"active"},
    propertyType:String,
    street:String,
    unit:String,
    streetName:String,
    streetSuffix:String,
    city:String,
    state:String,
    zipCode:String,
    bedrooms:String,
    bathrooms:String,
    finishedSqFt:Number,
    acres:Number,
    remarks:String,
    image:{type:String},
    date:{type:Date, default:Date.now},




});

const Product = mongoose.model('Product',productSchema);
module.exports = Product;