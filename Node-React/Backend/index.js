const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// In-memory "database"
// In backend/server.js, replace your products array with:
let products = [
    // Your original 5 products
    {
      id: 1,
      name: 'Wireless Bluetooth Headphones',
      description: 'Premium noise-cancelling wireless headphones with 30hr battery life',
      price: 199.99,
      imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      category: 'Electronics'
    },
    {
      id: 2,
      name: 'Organic Cotton T-Shirt',
      description: 'Soft, breathable organic cotton t-shirt available in multiple colors',
      price: 29.99,
      imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      category: 'Clothing'
    },
    {
      id: 3,
      name: 'Stainless Steel Water Bottle',
      description: 'Double-walled insulated bottle that keeps drinks cold for 24hrs',
      price: 24.99,
      imageUrl: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      category: 'Accessories'
    },
    {
      id: 4,
      name: 'Leather Wallet',
      description: 'Genuine leather wallet with multiple card slots and cash pocket',
      price: 49.99,
      imageUrl: 'https://images.unsplash.com/photo-1591561954555-607968c989ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      category: 'Accessories'
    },
    {
      id: 5,
      name: 'Smart Watch',
      description: 'Fitness tracker with heart rate monitor and smartphone notifications',
      price: 159.99,
      imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      category: 'Electronics'
    },
    // 20 new products
    {
      id: 6,
      name: 'Wireless Earbuds',
      description: 'True wireless earbuds with crystal clear sound',
      price: 89.99,
      imageUrl: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      category: 'Electronics'
    },
    {
      id: 7,
      name: 'Denim Jeans',
      description: 'Classic fit denim jeans with stretch technology',
      price: 59.99,
      imageUrl: 'https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      category: 'Clothing'
    },
    {
      id: 8,
      name: 'Leather Belt',
      description: 'Genuine leather belt with stainless steel buckle',
      price: 39.99,
      imageUrl: 'https://images.unsplash.com/photo-1604176354204-92660f94e6eb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      category: 'Accessories'
    },
    {
      id: 9,
      name: 'Sunglasses',
      description: 'UV protection polarized sunglasses',
      price: 79.99,
      imageUrl: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      category: 'Accessories'
    },
    {
      id: 10,
      name: 'Backpack',
      description: 'Durable water-resistant backpack with laptop compartment',
      price: 69.99,
      imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      category: 'Accessories'
    },
    {
      id: 11,
      name: 'Running Shoes',
      description: 'Lightweight running shoes with cushioned soles',
      price: 89.99,
      imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      category: 'Footwear'
    },
    {
      id: 12,
      name: 'Yoga Mat',
      description: 'Non-slip eco-friendly yoga mat',
      price: 34.99,
      imageUrl: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      category: 'Fitness'
    },
    {
      id: 13,
      name: 'Coffee Maker',
      description: 'Programmable coffee maker with thermal carafe',
      price: 129.99,
      imageUrl: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      category: 'Home'
    },
    {
      id: 14,
      name: 'Blender',
      description: 'High-powered blender for smoothies and food prep',
      price: 99.99,
      imageUrl: 'https://images.unsplash.com/photo-1560343090-f0409e92791a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      category: 'Home'
    },
    {
      id: 15,
      name: 'Desk Lamp',
      description: 'Adjustable LED desk lamp with multiple brightness levels',
      price: 49.99,
      imageUrl: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      category: 'Home'
    },
    {
      id: 16,
      name: 'Throw Pillow',
      description: 'Decorative throw pillow with removable cover',
      price: 24.99,
      imageUrl: 'https://images.unsplash.com/photo-1579656592043-a20e25a4aa4b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      category: 'Home'
    },
    {
      id: 17,
      name: 'Wall Clock',
      description: 'Modern minimalist wall clock with silent movement',
      price: 39.99,
      imageUrl: 'https://images.unsplash.com/photo-1516880711640-ef7db81be3e1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      category: 'Home'
    },
    {
      id: 18,
      name: 'Plant Pot',
      description: 'Ceramic plant pot with drainage hole',
      price: 19.99,
      imageUrl: 'https://images.unsplash.com/photo-1520412099551-62b6bafeb5bb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      category: 'Home'
    },
    {
      id: 19,
      name: 'Cookware Set',
      description: 'Non-stick 10-piece cookware set',
      price: 149.99,
      imageUrl: 'https://images.unsplash.com/photo-1583778176476-4a8b02b64d1b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      category: 'Kitchen'
    },
    {
      id: 20,
      name: 'Cutting Board',
      description: 'Bamboo cutting board with juice groove',
      price: 29.99,
      imageUrl: 'https://images.unsplash.com/photo-1603105037880-880cd4edfb0d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      category: 'Kitchen'
    },
    {
      id: 21,
      name: 'Knife Set',
      description: '6-piece stainless steel knife set with block',
      price: 79.99,
      imageUrl: 'https://images.unsplash.com/photo-1583947581924-a23d4f02b4e1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      category: 'Kitchen'
    },
    {
      id: 22,
      name: 'Mixing Bowls',
      description: 'Set of 3 nesting stainless steel mixing bowls',
      price: 34.99,
      imageUrl: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      category: 'Kitchen'
    },
    {
      id: 23,
      name: 'Bar Stool',
      description: 'Modern adjustable height bar stool',
      price: 89.99,
      imageUrl: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      category: 'Furniture'
    },
    {
      id: 24,
      name: 'Throw Blanket',
      description: 'Soft chunky knit throw blanket',
      price: 44.99,
      imageUrl: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      category: 'Home'
    },
    {
      id: 25,
      name: 'Candles Set',
      description: 'Set of 3 scented soy wax candles',
      price: 29.99,
      imageUrl: 'https://images.unsplash.com/photo-1580327344181-c1163234e5a0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      category: 'Home'
    }
  ];

// Get all products
app.get('/api/products', (req, res) => {
  res.json(products);
});

// Get single product
app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json(product);
});

// Create new product
app.post('/api/products', (req, res) => {
  const product = {
    id: products.length + 1,
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    imageUrl: req.body.imageUrl,
    category: req.body.category
  };
  products.push(product);
  res.status(201).json(product);
});

// Update product
app.put('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ message: 'Product not found' });

  product.name = req.body.name || product.name;
  product.description = req.body.description || product.description;
  product.price = req.body.price || product.price;
  product.imageUrl = req.body.imageUrl || product.imageUrl;
  product.category = req.body.category || product.category;

  res.json(product);
});

// Delete product
app.delete('/api/products/:id', (req, res) => {
  const productIndex = products.findIndex(p => p.id === parseInt(req.params.id));
  if (productIndex === -1) return res.status(404).json({ message: 'Product not found' });

  const deletedProduct = products.splice(productIndex, 1);
  res.json(deletedProduct[0]);
});

// Search Products
// Add this to your existing backend routes
app.get('/api/products/search', (req, res) => {
    try {
      const searchTerm = req.query.q ? req.query.q.toLowerCase() : '';
      
      if (!searchTerm.trim()) {
        return res.status(400).json({ message: 'Search term is required' });
      }
  
      const results = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        (product.category && product.category.toLowerCase().includes(searchTerm))
      );
  
      res.json(results);
    } catch (error) {
      console.error('Search error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});