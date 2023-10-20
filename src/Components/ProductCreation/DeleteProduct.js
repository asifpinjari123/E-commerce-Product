import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CustomSnackbar from '../Snackbar/Snackbar';

const DeleteProductDialog = ({ open, onClose, product, onDelete, deleteSnackbar }) => {
  const handleDelete = () => {
    // Perform the delete operation
    // Then, show a success snackbar message
    deleteSnackbar("Product deleted successfully!", "success");

    // Close the dialog
    onClose();

    // Refresh the product list by calling onDelete
    onDelete();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Delete Product</DialogTitle>
      <DialogContent>
        <Typography>Are you sure you want to delete the product:</Typography>
        <Typography variant="h6">{product.title}</Typography>
      </DialogContent>
      <Button onClick={handleDelete} color="secondary">
        Delete
      </Button>
      <Button onClick={onClose} color="primary">
        Cancel
      </Button>
    </Dialog>
  );
};

export default DeleteProductDialog;
