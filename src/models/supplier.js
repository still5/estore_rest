//const mongooseSchema = require('../db/database');
const Schema = mongoose.Schema;
const mongoose = require('mongoose');

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
    }
});

module.exports = mongoose.model('Supplier', supplierSchema);