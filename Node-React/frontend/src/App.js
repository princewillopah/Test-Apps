import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams, useNavigate } from 'react-router-dom';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Container, 
  Grid, 
  Card, 
  CardMedia, 
  CardContent, 
  CardActions, 
  TextField,
  Paper,
  Box,
  InputAdornment,
  IconButton
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/new" element={<AddProduct />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/products/:id/edit" element={<EditProduct />} />
      </Routes>
    </Router>
  );
}

function NavBar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>LuxeCart</Typography>
        <Button color="inherit" component={Link} to="/">Home</Button>
        <Button color="inherit" component={Link} to="/products">Products</Button>
        <Button color="inherit" component={Link} to="/products/new">Add Product</Button>
      </Toolbar>
    </AppBar>
  );
}

function Home() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    const url = searchTerm 
      ? `http://localhost:5000/api/products/search?q=${searchTerm}`
      : 'http://localhost:5000/api/products';
      
    axios.get(url)
      .then(response => setProducts(response.data.slice(0, 6)))
      .catch(error => console.error('Error:', error));
  };

  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then(response => setProducts(response.data.slice(0, 6)))
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <Box sx={{ 
      backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      py: 10,
      textAlign: 'center',
      color: 'white'
    }}>
      <Typography variant="h2" gutterBottom>Welcome to LuxeCart</Typography>
      
      <form onSubmit={handleSearch}>
        <TextField
          variant="outlined"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ 
            width: '60%',
            backgroundColor: 'white',
            borderRadius: 1
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton type="submit">
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </form>

      <Container sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom>
          {searchTerm ? 'Search Results' : 'Featured Products'}
        </Typography>
        <Grid container spacing={4}>
          {products.map(product => (
            <Grid item key={product.id} xs={12} sm={6} md={4}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

function Products() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    const url = searchTerm 
      ? `http://localhost:5000/api/products/search?q=${searchTerm}`
      : 'http://localhost:5000/api/products';
      
    axios.get(url)
      .then(response => setProducts(response.data))
      .catch(error => console.error('Error:', error));
  };

  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then(response => setProducts(response.data))
      .catch(error => console.error('Error:', error));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/api/products/${id}`)
      .then(() => setProducts(products.filter(p => p.id !== id)))
      .catch(error => console.error('Error deleting:', error));
  };

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>All Products</Typography>
      
      <form onSubmit={handleSearch}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ mb: 4 }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton type="submit">
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </form>

      <Grid container spacing={4}>
        {products.map(product => (
          <Grid item key={product.id} xs={12} sm={6} md={4}>
            <ProductCard product={product} onDelete={handleDelete} showActions />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

function ProductCard({ product, onDelete, showActions = false }) {
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="img"
        height="200"
        image={product.imageUrl}
        alt={product.name}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5">{product.name}</Typography>
        <Typography variant="body2" color="text.secondary">
          {product.description}
        </Typography>
        <Typography variant="h6" sx={{ mt: 1 }}>${product.price}</Typography>
      </CardContent>
      {showActions && (
        <CardActions>
          <Button size="small" component={Link} to={`/products/${product.id}`}>
            View
          </Button>
          <Button size="small" component={Link} to={`/products/${product.id}/edit`}>
            Edit
          </Button>
          <Button size="small" color="error" onClick={() => onDelete(product.id)}>
            Delete
          </Button>
        </CardActions>
      )}
    </Card>
  );
}

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/products/${id}`)
      .then(response => setProduct(response.data))
      .catch(error => console.error('Error fetching product:', error));
  }, [id]);

  if (!product) return <div>Loading...</div>;

  return (
    <Container maxWidth="md">
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Box
            component="img"
            sx={{
              height: 500,
              width: '100%',
              objectFit: 'cover'
            }}
            alt={product.name}
            src={product.imageUrl}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h3" gutterBottom>
            {product.name}
          </Typography>
          <Typography variant="h5" color="text.secondary" gutterBottom>
            ${product.price}
          </Typography>
          <Typography variant="body1" paragraph>
            {product.description}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Category: {product.category}
          </Typography>
          <Button 
            variant="contained" 
            size="large"
            sx={{ mt: 2 }}
          >
            Add to Cart
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

function AddProduct() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    imageUrl: '',
    category: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/products', formData)
      .then(() => navigate('/products'))
      .catch(error => console.error('Error adding product:', error));
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, my: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Add New Product
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            margin="normal"
            required
            multiline
            rows={4}
          />
          <TextField
            fullWidth
            label="Price"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Image URL"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            margin="normal"
            required
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            sx={{ mt: 2 }}
          >
            Add Product
          </Button>
        </form>
      </Paper>
    </Container>
  );
}

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    imageUrl: '',
    category: ''
  });

  useEffect(() => {
    axios.get(`http://localhost:5000/api/products/${id}`)
      .then(response => setFormData(response.data))
      .catch(error => console.error('Error fetching product:', error));
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:5000/api/products/${id}`, formData)
      .then(() => navigate(`/products/${id}`))
      .catch(error => console.error('Error updating product:', error));
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, my: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Edit Product
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            margin="normal"
            required
            multiline
            rows={4}
          />
          <TextField
            fullWidth
            label="Price"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Image URL"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            margin="normal"
            required
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            sx={{ mt: 2 }}
          >
            Update Product
          </Button>
        </form>
      </Paper>
    </Container>
  );
}

export default App;





















