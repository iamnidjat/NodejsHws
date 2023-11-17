const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();

app.use(cookieParser());

let products = [
    { id: 1, name: 'Product1', clicks: 0 },
    { id: 2, name: 'Product2', clicks: 0 }
  ];
  
app.get('/click/:productId', (req, res) => {
    const productId = parseInt(req.params.productId);
    const product = products.find(p => p.id === productId);

    if (product) {
        product.clicks++;
        res.cookie(`click_${productId}`, product.clicks);
        res.send(`Click count for ${product.name}: ${product.clicks}`);
    } 
    else {
        res.status(404).send('Product not found');
    }
});

app.get('/products', (req, res) => {
    const sortedProducts = products.sort((a, b) => b.clicks - a.clicks);
    res.json(sortedProducts);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
