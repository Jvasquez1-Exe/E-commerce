const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');
const port = 3000;

app.use(cors());
app.use(express.json());
app.use('/images', express.static('src/app/images'));
const products = [
    {id: 1, name: "Bouquet 1", image:'FerrariDaytona(Lego).jpg', price: 179.99, description: "A beautiful bouquet of flowers, fall special."},
    {id: 2, name: "Bouquet 2", image:'FordGt-40(Lego).jpg', price: 225.99, description: "A vibrant red bouquet perfect for any occasion."},
    {id: 3, name: "Bouquet 3", image:'LamborghiniCountach(Lego).jpg', price: 325.99, description: "A cheerful yellow bouquet to brighten your day."},
    {id: 4, name: "Bouquet 4", image:'Porsche911-GT3rs(Lego).jpg', price: 185.99, description: "A mixed bouquet with a variety of purple and white flowers."},
];
let selectedProduct = null;

app.get('/api/products', (req, res) => {
    res.json(products);
});

app.post('/api/select-product', (req, res) => {
    const productId = req.body.id;
    selectedProduct = products.find(p => p.id === productId);

    if (selectedProduct) {
        res.json({message: "Product selected", product: selectedProduct});
    }else{
        res.status(404).json({message: "Product not found"});
    }
});

app.post('/api/submit-order', (req, res) => {
    const orderDetails = req.body;
    console.log('Order Confirmed:', orderDetails);

    selectedProduct = null;

    res.json({ message: "Your item will be delivered." });
});
app.listen(port, () => {
    console.log('Backend server is running on http://localhost:' + port);
});