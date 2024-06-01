import React, { useEffect, useState } from "react";
import { Button, Paper, Table, TableBody, TableCell, Container, TableHead, TableRow, TableContainer, Typography, Collapse, Box, Pagination } from "@mui/material";
import useUsers from "../hooks/useUsers";
import DeleteIcon from '@mui/icons-material/Delete';
import Spinner from "../../components/Spinner";
import UserDeleteAndStatusDialog from "./UserDeleteAndStatusDialog";
import PageHeader from "../../components/PageHeader";
import SearchBar from "../../layout/header/topNavBar/right-navigation/SearchBar";
import { useTheme } from "../../providers/CustomThemeProvider";
import EditIcon from '@mui/icons-material/Edit';
import { useSnack } from "../../providers/SnackbarProvider";

const CrmPanel = () => {
  const { isLoading, filterUsers, handleDeleteUser, handleChangeStatus, handleRefresh, query, setQuery} = useUsers();
  const [expandedRows, setExpandedRows] = useState({});
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [userIdToEdit, setUserIdToEdit] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 6; 
  const {isDark} = useTheme()
  const setSnack = useSnack()

  useEffect(() => {
   handleRefresh()
  }, [handleRefresh]);

  const toggleRow = (userId) => {
    setExpandedRows((prev) => ({
      ...prev,
      [userId]: !prev[userId],
    }));
  };

  const handleConfirmDelete = () => {
    handleDeleteUser(userIdToDelete);
    setOpenDeleteDialog(false);
  };

  const handleConfirmEdit = async () => {
    try {
      await handleChangeStatus(userIdToEdit);
      setSnack("success", "User status changed successfully!");
    } catch (error) {
      setSnack("error", error.message || "Failed to update user status.");
    } finally {
      setOpenEditDialog(false);
    }
  };
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filterUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filterUsers.length / usersPerPage);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  if (isLoading) return <Spinner />;


  return (
    <Container>
        <PageHeader
        title="Welcome to CRM Panel"
        subtitle="Here just a admin can manage the users - delete user or edit user (for change user's status)"
      />
      <Container sx={{width:"100%" ,pb:3}}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            width: "100%",           
            alignItems: "center",
          }}
        >
          <Button
            variant="contained"
            onClick={handleRefresh}
           sx={{ marginBottom: {xs: 2, md: 4}, marginRight: {md: 2}, marginTop: 4,  }}>
       
            Refresh
          </Button >
          <SearchBar      
                                
            query={query}
            setQuery={setQuery}
            
          />
        </Box>
      <Paper sx={{ padding: 2 }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 300 }} aria-label="CRM Panel">
          <TableHead sx={{ fontWeight: "bold"}}>
              <TableRow sx={{ backgroundColor: isDark ? "gray" : 'lightgreen'}}>
                <TableCell> 
                  <Typography variant="body1">Full Name</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body1">Email</Typography>
                </TableCell>
                <TableCell> 
                  <Typography variant="body1">Phone</Typography>
                </TableCell>
                  <TableCell > 
                  <Typography variant="body1">Status</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentUsers.map((user) => (
                <React.Fragment key={user._id}>
                  <TableRow 
                    onClick={() => toggleRow(user._id)} 
                    sx={{ cursor: 'pointer', transition: 'background-color 0.3s', ':hover': { backgroundColor: isDark ? "gray" : '#f0f0f0' } }}>
                    <TableCell >
                      <Typography variant="body2">{user.name.first}{" "}{user.name.last}</Typography>
                    </TableCell>
                    <TableCell 
                      sx={{ maxWidth: 150, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: '0.875rem' }}>
                      <Typography variant="body2">{user.email}</Typography>
                    </TableCell>
                    <TableCell >
                        <Typography variant="body2">{user.phone}</Typography>
                    </TableCell>
                    <TableCell >
                      <Typography variant="body2">{user.isBusiness ? "Biz" : "Personal"}</Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={4} sx={{ paddingBottom: 0, paddingTop: 0 }}>
                      <Collapse in={expandedRows[user._id]} timeout="auto" unmountOnExit>
                        <Box sx={{display:"flex",justifyContent:"center"}} >
                        <Paper sx={{ width:"40%",m:4,p:3}} elevation={3}>
                        <Typography variant="body1" mb={2} gutterBottom>
                          <strong>name:</strong> {user.name.first}{" "}{user.name.last}
                        </Typography>
                        <Typography variant="body1" mb={2} gutterBottom>
                          <strong>Email:</strong> {user.email}
                        </Typography>
                        <Typography variant="body1" mb={2} gutterBottom>
                          <strong>Phone:</strong> {user.phone}
                        </Typography>
                        <Typography variant="body1" mb={2} gutterBottom>
                          <strong>autoLevel:</strong> {user.isBusiness ? "Biz" : "Personal"}
                        </Typography>
                         <Box textAlign="center" >
                            <Button sx={{mr:1,mt:2}} variant="contained"
                                  onClick={() => {
                                    setUserIdToEdit(user._id);
                                    setOpenEditDialog(true);
                                  }}
                                  startIcon={<EditIcon />}
                                >
                                  Edit  
                                </Button>
                            <Button sx={{mt:2}} variant="contained" color="error"
                                  onClick={() => {
                                    setUserIdToDelete(user._id);
                                    setOpenDeleteDialog(true);
                                  }}
                                  startIcon={<DeleteIcon />}
                                >
                                  Delete
                                </Button>
                         </Box>
                        </Paper>
                        </Box>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
       <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
  <Pagination count={totalPages} page={currentPage} onChange={handlePageChange} color="primary"/>
</Box>
<Box sx={{ textAlign: "center", mt: 2 }}>
  <Typography variant="body1">
    Total number of updated users: {currentUsers.length - filterUsers.length}
  </Typography>
</Box>
      </Paper>
      <UserDeleteAndStatusDialog
        openDeleteDialog={openDeleteDialog}
        setOpenDeleteDialog={setOpenDeleteDialog}
        handleConfirmDelete={handleConfirmDelete}
        openEditDialog={openEditDialog}
        setOpenEditDialog={setOpenEditDialog}
        handleConfirmEdit={handleConfirmEdit}
      />

      </Container>
    </Container>
  );
};

export default CrmPanel;
