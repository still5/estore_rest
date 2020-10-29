//const mongooseSchema = require('../db/database');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    price: {
        type: Number,
        required: true
    },
    category_ref: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    image: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    },
    supplier_ref: {
        type: Schema.Types.ObjectId,
        ref: 'Supplier',
        required: true
    },
    expiryDate: {
        type: Date,
        required: false
    },
    measurement: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Product', productSchema);