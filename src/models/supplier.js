//const mongooseSchema = require('../db/database');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const supplierSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    details: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    products: [
        {
        type: Schema.Types.ObjectId,
        ref: 'Product'
        }
    ]
});

module.exports = mongoose.model('Supplier', supplierSchema);