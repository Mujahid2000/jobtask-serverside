const { Schema, model } = require('mongoose');

const cartDataSchema = new Schema({
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

const addCartSchema = new Schema({
    data:cartDataSchema,
    email: {
        type: String,
        required: true,
    },
},{ 
    timestamps: true,
    versionKey: false // Disable the __v field
});

const AddCart = model('AddCart', addCartSchema);

module.exports = AddCart;
