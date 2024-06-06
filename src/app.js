const express = require('express');
const cors = require('cors');
const Product = require('./module/productSchema');
const AddCart = require('./module/addCartSchema');
const DeliveryData = require('./module/deliveryDataSchema');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Product Routes

// Get all products
app.get('/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add a new product
app.post('/products', async (req, res) => {
    try {
        const { name } = req.body;

        // Check if the product with the same name already exists
        const existingProduct = await Product.findOne({ name });
        if (existingProduct) {
            return res.status(400).json({ message: 'Product already exists' });
        }

        // Create a new product
        const product = new Product(req.body);
        const newProduct = await product.save();
        res.status(201).json({ message: 'Product created successfully', product: newProduct });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delivery Routes

// Get all delivery info
app.get('/deliveryinfo', async (req, res) => {
    try {
        const deliveryData = await DeliveryData.find();
        res.status(200).json(deliveryData);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add delivery info
app.post('/deliveryinfo', async (req, res) => {
    try {
        const deliveryData = new DeliveryData(req.body);
        const newDeliveryData = await deliveryData.save();
        res.status(201).json({ message: 'Delivery info added successfully', deliveryData: newDeliveryData });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Cart Routes

// Get all cart items
app.get('/cartData', async (req, res) => {
    try {
        const cartItems = await AddCart.find();
        res.status(200).json(cartItems);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add a new cart item
app.post('/addCart', async (req, res) => {
    try {
        const { name, email } = req.body;

        // Check if the item with the same name and email already exists in the cart
        const existingCartItem = await AddCart.findOne({ 'data.name': name, email });
        if (existingCartItem) {
            return res.status(400).json({ message: 'Item already exists in the cart' });
        }

        // Create a new cart item
        const cartItem = new AddCart(req.body);
        const newCartItem = await cartItem.save();
        res.status(201).json({ message: 'Item added to cart successfully', cartItem: newCartItem });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


// Delete all cart items
app.delete('/cartData', async (req, res) => {
    try {
        const result = await AddCart.deleteMany({});
        res.send(result);
    } catch (error) {
        res.status(500).send({ error: 'An error occurred while deleting the data' });
    }
});

// Delete a single cart item
app.delete('/singledata', async (req, res) => {
    const data = req.body;
    console.log(data);
    try {
        const result = await AddCart.deleteOne(data);
        res.send(result);
    } catch (error) {
        res.status(500).send({ error: 'An error occurred while deleting the data' });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

module.exports = app;
