const mongoose = require('mongoose');

const bagSchema =new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true},
    productId: {type: mongoose.Schema.Types.ObjectId, ref: 'product', required: true},
    name: {type: String, required: true},
    price: {type: Number, required: true},
    quantity: {type: Number, required: true, default: 1},
    addedAt: {type: Date, default: Date.now},
}, {
    versionKey: false,
    timestamp: true,
});

const Bag = mongoose.model("bag", bagSchema);

module.exports = Bag;