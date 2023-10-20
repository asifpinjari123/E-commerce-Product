import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CustomSnackbar from '../Snackbar/Snackbar';

const UpdateProductDialog = ({ open, onClose, product, onUpdate, updateSnackbar }) => {
  const [updateProduct, setUpdateProduct] = useState({
    title: product.title,
    price: product.price,
    description: product.description,
    category: product.category,
  });

  const handleUpdate = () => {
    // Perform the update operation
    // Then, show a success snackbar message
    updateSnackbar("Product updated successfully!", "success");

    // Close the dialog
    onClose();

    // Refresh the product list by calling onUpdate
    onUpdate();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Update Product</DialogTitle>
      <DialogContent>
        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          value={updateProduct.title}
          onChange={(e) => setUpdateProduct({ ...updateProduct, title: e.target.value })}
          style={{ marginBottom: '10px' }}
        />
        <TextField
          label="Price"
          variant="outlined"
          fullWidth
          value={updateProduct.price}
          onChange={(e) => setUpdateProduct({ ...updateProduct, price: e.target.value })}
          style={{ marginBottom: '10px' }}
        />
        <TextField
          label="Description"
          variant="outlined"
          fullWidth
          value={updateProduct.description}
          onChange={(e) => setUpdateProduct({ ...updateProduct, description: e.target.value })}
          style={{ marginBottom: '10px' }}
        />
        <TextField
          label="Category"
          variant="outlined"
          fullWidth
          value={updateProduct.category}
          onChange={(e) => setUpdateProduct({ ...updateProduct, category: e.target.value })}
          style={{ marginBottom: '10px' }}
        />
        <Button onClick={handleUpdate} color="primary">
          Update
        </Button>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProductDialog;
