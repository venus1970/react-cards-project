import { Box, CardActions, IconButton } from '@mui/material';
import React, { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PhoneIcon from '@mui/icons-material/Phone';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useUser } from '../../../users/providers/UserProvider';
import { useNavigate } from 'react-router-dom';
import ROUTES from '../../../routes/routesModel';
import CardDeleteDialog from './CardDeleteDialog';

export default function CardActionBar({
  handleCardDelete,
  handleCardLike,
  cardId,
  userId,
  likes = [], // Provide a default value for likes
  phone
}) {

  const { user } = useUser();
  const navigate = useNavigate();
  const [isDialogOpen, setDialog] = useState(false);
  const [isLiked, setIsLiked] = useState(() => likes.includes(user?._id));

  const handleLike = async () => {
    await handleCardLike(cardId, isLiked);
    setIsLiked((prev) => !prev);
  };

  const handleDelete = () => {
    handleCardDelete(cardId);
    setDialog(false);
  };

  const handleEditCard = (id) => {
    navigate(ROUTES.EDIT_CARD + "/" + id);
  };

  const handleCall = () => {
    alert("Call to -" + phone);
  };

  return (
    <>
      <CardActions sx={{ justifyContent: "space-between" }}>
        {user && (user.isAdmin || user._id === userId) ? (
          <Box>
            <IconButton
              aria-label="DeleteIcon"
              title="Delete card"
              onClick={() => setDialog(true)}
            >
              <DeleteIcon />
            </IconButton>

            <IconButton
              aria-label="EditIcon"
              title="Edit card"
              onClick={() => handleEditCard(cardId)}
            >
              <EditIcon />
            </IconButton>
          </Box>
        ) : (
          <Box>
            <IconButton aria-label="DeleteIcon" disabled>
              <DeleteIcon />
            </IconButton>

            <IconButton aria-label="EditIcon" disabled>
              <EditIcon />
            </IconButton>
          </Box>
        )}

        <Box>
          <IconButton
            aria-label="PhoneIcon"
            title="Call"
            onClick={handleCall}
          >
            <PhoneIcon />
          </IconButton>
          {user && user._id ? (
            <IconButton
              aria-label="FavoriteIcon"
              title="Like card"
              onClick={() => handleLike(cardId)}
            >
              <FavoriteIcon color={isLiked ? "error" : "inherit"} />
            </IconButton>
          ) : (
            <IconButton aria-label="FavoriteIcon" disabled>
              <FavoriteIcon />
            </IconButton>
          )}
        </Box>
      </CardActions>
      <CardDeleteDialog
        isDialogOpen={isDialogOpen}
        onChangeDialog={() => setDialog(false)}
        onDelete={handleDelete}
      />
    </>
  );
}
