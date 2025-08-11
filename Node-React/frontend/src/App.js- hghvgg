import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams, useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
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
  Box
} from '@mui/material';
import axios from 'axios';

const StyledHero = styled('div')(({ theme }) => ({
  backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)',
  height: '500px',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: '#fff',
  fontSize: '4rem',
  marginBottom: theme.spacing(4),
}));

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 345,
  margin: theme.spacing(2),
  transition: 'transform 0.3s',
  '&:hover': {
    transform: 'scale(1.05)',
  },
}));

const StyledFormContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(4),
}));

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
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          LuxeCart
        </Typography>
        <Button color="inherit" component={Link} to="/">Home</Button>
        <Button color="inherit" component={Link} to="/products">Products</Button>
        <Button color="inherit" component={Link} to="/products/new">Add Product</Button>
      </Toolbar>
    </AppBar>
  );
}

function Home() {
  return (
    <div>
      <StyledHero>
        <Typography variant="h2" component="h1">
          Welcome to LuxeCart
        </Typography>
      </StyledHero>
      <Container>
        <Typography variant="h4" align="center" gutterBottom>
          Featured Products
        </Typography>
        <ProductGrid count={3} />
      </Container>
    </div>
  );
}

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then(response => setProducts(response.data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/api/products/${id}`)
      .then(() => {
        setProducts(products.filter(product => product.id !== id));
      })
      .catch(error => console.error('Error deleting product:', error));
  };

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        All Products
      </Typography>
      <Grid container>
        {products.map(product => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <ProductCard product={product} onDelete={handleDelete} showActions={true} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

function ProductGrid({ count }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then(response => setProducts(response.data.slice(0, count)))
      .catch(error => console.error('Error fetching products:', error));
  }, [count]);

  return (
    <Grid container justifyContent="center">
      {products.map(product => (
        <Grid item key={product.id}>
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
}

function ProductCard({ product, onDelete, showActions = false }) {
  return (
    <StyledCard>
      <CardMedia
        component="img"
        height="200"
        image={product.imageUrl}
        alt={product.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.description}
        </Typography>
        <Typography variant="h6" component="div" sx={{ mt: 1 }}>
          ${product.price}
        </Typography>
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
    </StyledCard>
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
      <StyledFormContainer>
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
      </StyledFormContainer>
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
      <StyledFormContainer>
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
      </StyledFormContainer>
    </Container>
  );
}

export default App;









// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
