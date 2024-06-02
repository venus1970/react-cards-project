import React from "react";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

const UserDeleteAndStatusDialog = ({ 
  openDeleteDialog, 
  setOpenDeleteDialog, 
  handleConfirmDelete, 
  openEditDialog, 
  setOpenEditDialog, 
  handleConfirmEdit 
}) => {
  return (
    <>
      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
      >
        <DialogTitle>Delete User</DialogTitle>
        <IconButton
          aria-label="close"
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
          }}
          onClick={() => setOpenDeleteDialog(false)}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this user? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>Cancel</Button>
          <Button onClick={handleConfirmDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openEditDialog}
        onClose={() => setOpenEditDialog(false)}
      >
        <DialogTitle>Edit User Status</DialogTitle>
        <IconButton
          aria-label="close"
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
          }}
          onClick={() => setOpenEditDialog(false)}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to change the status of this user?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)}>Cancel</Button>
          <Button onClick={handleConfirmEdit} color="error">
            Change Status
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UserDeleteAndStatusDialog;

