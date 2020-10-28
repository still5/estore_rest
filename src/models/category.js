//const mongooseSchema = require('../db/database');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    quantity: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Category', categorySchema);