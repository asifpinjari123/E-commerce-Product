import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  DialogActions,
  TextField,
  Snackbar,
  Alert,
  MenuItem
} from '@mui/material';
import React, { useState, useEffect } from 'react';

const ProductListing = () => {
  const [products, setProducts] = useState([]);
  const [viewProduct, setViewProduct] = useState(null);
  const [updateProduct, setUpdateProduct] = useState(null);
  const [deleteProduct, setDeleteProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [addProductDialogOpen, setAddProductDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const handleValidationErrorClose = () => {
    setValidationError(false);
  };

  const [newProduct, setNewProduct] = useState({
    title: '',
    price: '',
    description: '',
    category: '',
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const [validationError, setValidationError] = useState(false);

  const handleCloseSnackbar = () => {
    setSnackbar({ open: false, message: '', severity: 'success' });
  };

  const closeDialogs = () => {
    setViewProduct(null);
    setUpdateProduct(null);
    setDeleteProduct(null);
  };

  const openAddProductDialog = () => {
    setAddProductDialogOpen(true);
  };

  const closeAddProductDialog = () => {
    setAddProductDialogOpen(false);
    setValidationError(false);
  };

  const handleAddProduct = () => {
    if (
      newProduct.title.trim() === '' ||
      newProduct.price.trim() === '' ||
      newProduct.description.trim() === '' ||
      newProduct.category.trim() === ''
    ) {
      setValidationError(true);
    } else {
      setValidationError(false);
      fetch('https://fakestoreapi.com/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      })
        .then((response) => response.json())
        .then((data) => {
          setNewProduct({
            title: '',
            price: '',
            description: '',
            category: '',
          });
          setAddProductDialogOpen(false);
          setSnackbar({
            open: true,
            message: 'Product added successfully!',
            severity: 'success',
          });
          fetch('https://fakestoreapi.com/products')
            .then((response) => response.json())
            .then((data) => setProducts(data));
        })
        .catch((error) => console.error('Error adding product:', error));
    }
  };

  const handleUpdateProduct = (product) => {
    setUpdateProduct(product);
  };

  const handleDeleteProduct = (product) => {
    setDeleteProduct(product);
  };

  const handleUpdate = () => {
    if (updateProduct) {
      fetch(`https://fakestoreapi.com/products/${updateProduct.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateProduct),
      })
        .then((response) => response.json())
        .then((data) => {
          setSnackbar({
            open: true,
            message: 'Product updated successfully!',
            severity: 'success',
          });
          closeDialogs();
          fetch('https://fakestoreapi.com/products')
            .then((response) => response.json())
            .then((data) => setProducts(data));
          setSnackbar({
            open: true,
            message: 'Product updated successfully!',
            severity: 'success',
          });
        })
        .catch((error) => console.error('Error updating product:', error));
    }
  };

  const handleDelete = () => {
    if (deleteProduct) {
      fetch(`https://fakestoreapi.com/products/${deleteProduct.id}`, {
        method: 'DELETE',
      })
        .then((response) => response.json())
        .then((data) => {
          setSnackbar({
            open: true,
            message: 'Product deleted successfully!',
            severity: 'success',
          });
          closeDialogs();
          fetch('https://fakestoreapi.com/products')
            .then((response) => response.json())
            .then((data) => setProducts(data));
          setSnackbar({
            open: true,
            message: 'Product deleted successfully!',
            severity: 'success',
          });
        })
        .catch((error) => console.error('Error deleting product:', error));
    }
  };

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  const filteredProducts = products.filter((product) => {
    if (selectedCategory === 'All') {
      return (
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.price.toString().includes(searchQuery) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    } else {
      return (
        product.category === selectedCategory &&
        (product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.price.toString().includes(searchQuery) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
  });


  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', marginTop: "20px" }}>
        <TextField
          label="Search Product"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          fullWidth
          style={{ width: '70%' }}
        />
        <TextField
          select
          label="Select Category"
          variant="outlined"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={{ width: '200px' }}
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Electronics">Electronics</MenuItem>
          <MenuItem value="men's clothing">Men's clothing</MenuItem>
          <MenuItem value="electronics">Electronics</MenuItem>
          <MenuItem value="women's clothing">Women's clothing</MenuItem>

          {/* Add more categories as needed */}
        </TextField>
        <Button
          color="primary"
          onClick={openAddProductDialog}
          style={{ width: '150px', height: '40px', marginLeft: '20px' }}
        >
          Add Product
        </Button>
      </div>

      <TableContainer component={Paper} style={{ marginBottom: '20px' }}>
        <Table size="small">
          <TableHead style={{ backgroundColor: '#f2f2f2' }}>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Product Title</TableCell>
              <TableCell>Product Price</TableCell>
              <TableCell>Product Description</TableCell>
              <TableCell>Product Category</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredProducts.map((product, index) => (
              <TableRow key={product.id} style={{ backgroundColor: index % 2 === 0 ? 'white' : '#f2f2f2' }}>
                <TableCell>{product.id}</TableCell>
                <TableCell>{product.title}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    style={{ color: 'yellow', width: '100px', height: '30px', marginRight: '5px' }}
                    onClick={() => handleUpdateProduct(product)}
                  >
                    Update
                  </Button>
                  <Button
                    variant="outlined"
                    style={{ color: 'red', width: '100px', height: '30px', marginRight: '5px' }}
                    onClick={() => handleDeleteProduct(product)}
                  >
                    Delete
                  </Button>
                  <Button
                    variant="outlined"
                    style={{ color: 'blue', width: '100px', height: '30px', marginRight: '5px' }}
                    onClick={() => setViewProduct(product)}
                  >
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={addProductDialogOpen} onClose={closeAddProductDialog}>
        <DialogTitle>Add Product</DialogTitle>
        <DialogContent>
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            value={newProduct.title}
            onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
            style={{ marginBottom: '10px' }}
          />
          <TextField
            label="Price"
            variant="outlined"
            fullWidth
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            style={{ marginBottom: '10px' }}
          />
          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            value={newProduct.description}
            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
            style={{ marginBottom: '10px' }}
          />
          <TextField
            label="Category"
            variant="outlined"
            fullWidth
            value={newProduct.category}
            onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
            style={{ marginBottom: '10px' }}
          />
          {validationError && (
            <Alert severity="error" onClose={handleValidationErrorClose}>
              Please fill in all fields.
            </Alert>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={closeAddProductDialog} color="primary">
            Cancel
          </Button>
          <Button color="primary" onClick={handleAddProduct}>
            Add
          </Button>
        </DialogActions>
      </Dialog>


      <Dialog open={viewProduct !== null} onClose={closeDialogs}>
        <DialogTitle>Product Details</DialogTitle>
        <DialogContent>
          {viewProduct && (
            <>
              <Typography variant="h6">Title: {viewProduct.title}</Typography>
              <Typography>Price: {viewProduct.price}</Typography>
              <Typography>Description: {viewProduct.description}</Typography>
              <Typography>Category: {viewProduct.category}</Typography>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialogs} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={updateProduct !== null} onClose={closeDialogs}>
        <DialogTitle>Update Product</DialogTitle>
        <DialogContent>
          {updateProduct && (
            <>
              <TextField
                label="Title"
                variant="outlined"
                fullWidth
                value={updateProduct.title}
                onChange={(e) =>
                  setUpdateProduct({ ...updateProduct, title: e.target.value })
                }
                style={{ marginBottom: '10px' }}
              />
              <TextField
                label="Price"
                variant="outlined"
                fullWidth
                value={updateProduct.price}
                onChange={(e) =>
                  setUpdateProduct({ ...updateProduct, price: e.target.value })
                }
                style={{ marginBottom: '10px' }}
              />
              <TextField
                label="Description"
                variant="outlined"
                fullWidth
                value={updateProduct.description}
                onChange={(e) =>
                  setUpdateProduct({
                    ...updateProduct,
                    description: e.target.value,
                  })
                }
                style={{ marginBottom: '10px' }}
              />
              <TextField
                label="Category"
                variant="outlined"
                fullWidth
                value={updateProduct.category}
                onChange={(e) =>
                  setUpdateProduct({ ...updateProduct, category: e.target.value })
                }
                style={{ marginBottom: '10px' }}
              />
              <Button
                onClick={handleUpdate}
                color="primary"
              >
                Update
              </Button>
              <Button
                onClick={closeDialogs}
                color="primary"
              >
                Cancel
              </Button>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={deleteProduct !== null} onClose={closeDialogs}>
        <DialogTitle>Delete Product</DialogTitle>
        <DialogContent>
          {deleteProduct && (
            <>
              <Typography>Are you sure you want to delete the product:</Typography>
              <Typography variant="h6">{deleteProduct.title}</Typography>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDelete} color="secondary">
            Delete
          </Button>
          <Button onClick={closeDialogs} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>


      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>

  );
};

export default ProductListing;
