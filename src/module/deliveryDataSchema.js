const { Schema, model } = require('mongoose');

// Schema for delivery information
const deliveryInfoSchema = new Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    area: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    post_code: {
        type: String,
        required: true,
    },
    dualCurrencyValue: {
        type: String,
        required: true,
    },
    paypal: {
        type: String,
        required: true,
    }
}, { _id: false }); // To avoid having _id for each sub-document

// Schema for product information
const productSchema = new Schema({
    _id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
}, { _id: false }); // To avoid having _id for each sub-document

// Schema for delivery data
const deliveryDataSchema = new Schema({
    deliveryInfo: {
        type: deliveryInfoSchema,
        required: true,
    },
    product: {
        type: [productSchema], // Array of productSchema
        required: true,
    },
    userEmail: {
        type: String,
        required: true,
    }
},{ 
    
    versionKey: false // Disable the __v field
});

// Create and export DeliveryData model
const DeliveryData = model('DeliveryData', deliveryDataSchema);

module.exports = DeliveryData;
