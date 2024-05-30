/*import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminCRMPanel = () => {
  const [usernames, setUsernames] = useState([]);

  useEffect(() => {
    const fetchUsernames = async () => {
      try {
        const response = await axios.get("https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users");
        const usernames = response.data.map(user => user.username);
        setUsernames(usernames);
      } catch (error) {
        console.error('Error fetching usernames:', error);
      }
    };

    fetchUsernames();
  }, []);

  return (
    <div>
      <h1>User Management: Admin CRM Panel</h1>
      <h2>List of Users</h2>
      <ul>
        {usernames.map(username => (
          <li key={username}>{username}</li>
        ))}
      </ul>
    </div>
  );
};

export default AdminCRMPanel;
*/

/*import React, { useEffect, useState } from "react";
import { Button, Paper, Table, TableBody, TableCell, Container, TableHead, TableRow, TableContainer, Typography, Collapse, Box } from "@mui/material";
import useUsers from "../hooks/useUsers";
import Spinner from "../../components/Spinner";
import UserDeleteAndStatusDialog from "./UserDeleteAndStatusDialog";
import PageHeader from "../../components/PageHeader";
import SearchBar from "../../layout/header/topNavBar/right-navigation/SearchBar";
import { useTheme } from "../../providers/CustomThemeProvider";
import EditIcon from '@mui/icons-material/Edit';
import { useSnack } from "../../providers/SnackbarProvider";

const CrmPanel = () => {
  const { 
    isLoading,  
    filterUsers, 
    handleDeleteUser,
    handleUpdateUser, 
    handleRefresh,
    query,
    setQuery} = useUsers();
  const [expandedRows, setExpandedRows] = useState({});
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [userIdToEdit, setUserIdToEdit] = useState(null);
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
      const updatedUsers = filterUsers.map(user => {
        if (user._id === userIdToEdit) {
          return { ...user, isBusiness: !user.isBusiness };
        }
        return user;
      });
  
      await handleUpdateUser(userIdToEdit, updatedUsers.find(user => user._id === userIdToEdit));
      setOpenEditDialog(false);
      setSnack("success", "User status changed successfully!" );
    } catch (error) {
      setSnack("error", "Failed to update user status");
    }
  };

  if (isLoading) return <Spinner />;


  return (
    <Container>
        <PageHeader
        title="Welcome to CRM Panel"
        subtitle="Here you can manage the users - click on a user to open delete and block user buttons."
      />
      <Container sx={{width:"100%" ,pb:3}}>
        <Box sx={{display:"flex",justifyContent:"space-between"}}>
          <Button variant="contained" onClick={handleRefresh} sx={{ marginBottom: 2 }}>
            Refresh
          </Button>
          <SearchBar query={query} setQuery={setQuery} />
        </Box>
      <Paper sx={{ padding: 2 }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 300 }} aria-label="CRM Panel">
          <TableHead sx={{ fontWeight: "bold"}}>
              <TableRow sx={{ backgroundColor: isDark ? "gray" : '#c1e5e2'}}>
                <TableCell> 
                  <Typography variant="body1">First Name</Typography>
                </TableCell>
                <TableCell> 
                  <Typography variant="body1">Last Name</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body1">Email</Typography>
                </TableCell>
                  <TableCell > 
                  <Typography variant="body1">Status</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filterUsers.map((user) => (
                <React.Fragment key={user._id}>
                  <TableRow 
                    onClick={() => toggleRow(user._id)} 
                    sx={{ cursor: 'pointer', transition: 'background-color 0.3s', ':hover': { backgroundColor: isDark ? "gray" : '#f0f0f0' } }}>
                    <TableCell >
                      <Typography variant="body2">{user.name.first}</Typography>
                    </TableCell>
                    <TableCell >
                      <Typography variant="body2">{user.name.last}</Typography>
                    </TableCell>
                    <TableCell 
                      sx={{ maxWidth: 150, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: '0.875rem' }}>
                      <Typography variant="body2">{user.email}</Typography>
                    </TableCell>
                    <TableCell >
                      <Typography variant="body2">{user.isBusiness ? "Biz" : "Personal"}</Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={3} sx={{ paddingBottom: 0, paddingTop: 0 }}>
                      <Collapse in={expandedRows[user._id]} timeout="auto" unmountOnExit>
                        <Box sx={{display:"flex",justifyContent:"center"}} >
                        <Paper sx={{ width:"50%",margin: 1,p:3}}>
                        <Typography variant="body1" gutterBottom>
                          <strong>Email:</strong> {user.email}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                          <strong>Phone:</strong> {user.phone}
                        </Typography>
                         <Box m={2} >
                            <Button
                                 sx={{mr:1}}
                                  variant="contained"
                                  onClick={() => {
                                    setUserIdToEdit(user._id);
                                    setOpenEditDialog(true);
                                  }}
                                  startIcon={<EditIcon />}
                                >
                                    Edit
                                </Button>
                            <Button
                                  variant="contained"
                                  color="error"
                                  onClick={() => {
                                    setUserIdToDelete(user._id);
                                    setOpenDeleteDialog(true);
                                  }}
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
      </Paper>
      <UserDeleteAndStatusDialog
          open={openEditDialog}
          onClose={() => setOpenEditDialog(false)}
          onConfirm={handleConfirmEdit}
          title="Change User Status"
          message="Are you sure you want to change the status of this user?"
        />

      <UserDeleteAndStatusDialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        onConfirm={handleConfirmDelete}
        title="Delete User"
        message="Are you sure you want to delete this user?"
      />
      </Container>
    </Container>
  );
};

export default CrmPanel;*/

/*
import React, { useEffect, useState } from "react";
import { Button, Paper, Table, TableBody, TableCell, Container, TableHead, TableRow, TableContainer, Typography, Collapse, Box } from "@mui/material";
import useUsers from "../hooks/useUsers";
import Spinner from "../../components/Spinner";
import UserDeleteAndStatusDialog from "./UserDeleteAndStatusDialog";
import PageHeader from "../../components/PageHeader";
import SearchBar from "../../layout/header/topNavBar/right-navigation/SearchBar";
import { useTheme } from "../../providers/CustomThemeProvider";
import EditIcon from '@mui/icons-material/Edit';
import { useSnack } from "../../providers/SnackbarProvider";

const CrmPanel = () => {
  const { 
    isLoading,  
    filterUsers, 
    handleDeleteUser,
    handleUpdateUser, 
    handleRefresh,
    query,
    setQuery} = useUsers();
  const [expandedRows, setExpandedRows] = useState({});
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [userIdToEdit, setUserIdToEdit] = useState(null);
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
      const updatedIsBusiness = !filterUsers.find(user => user._id === userIdToEdit).isBusiness;
      await handleUpdateUser(userIdToEdit, { isBusiness: updatedIsBusiness });
      setOpenEditDialog(false);
      setSnack("success", "User status changed successfully!");
    } catch (error) {
      setSnack("error", "Failed to update user status");
    }
  };

  if (isLoading) return <Spinner />;

  return (
    <Container>
      <PageHeader
        title="Welcome to CRM Panel"
        subtitle="Here you can manage the users - click on a user to open delete and block user buttons."
      />
      <Container sx={{width:"100%" ,pb:3}}>
        <Box sx={{display:"flex",justifyContent:"space-between"}}>
          <Button variant="contained" onClick={handleRefresh} sx={{ marginBottom: 2 }}>
            Refresh
          </Button>
          <SearchBar query={query} setQuery={setQuery} />
        </Box>
        <Paper sx={{ padding: 2 }}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 300 }} aria-label="CRM Panel">
              <TableHead sx={{ fontWeight: "bold"}}>
                <TableRow sx={{ backgroundColor: isDark ? "gray" : '#c1e5e2'}}>
                  <TableCell> 
                    <Typography variant="body1">First Name</Typography>
                  </TableCell>
                  <TableCell> 
                    <Typography variant="body1">Last Name</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1">Email</Typography>
                  </TableCell>
                  <TableCell > 
                    <Typography variant="body1">Status</Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filterUsers.map((user) => (
                  <React.Fragment key={user._id}>
                    <TableRow 
                      onClick={() => toggleRow(user._id)} 
                      sx={{ cursor: 'pointer', transition: 'background-color 0.3s', ':hover': { backgroundColor: isDark ? "gray" : '#f0f0f0' } }}>
                      <TableCell >
                        <Typography variant="body2">{user.name.first}</Typography>
                      </TableCell>
                      <TableCell >
                        <Typography variant="body2">{user.name.last}</Typography>
                      </TableCell>
                      <TableCell 
                        sx={{ maxWidth: 150, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: '0.875rem' }}>
                        <Typography variant="body2">{user.email}</Typography>
                      </TableCell>
                      <TableCell >
                        <Typography variant="body2">{user.isBusiness ? "Biz" : "Personal"}</Typography>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={3} sx={{ paddingBottom: 0, paddingTop: 0 }}>
                        <Collapse in={expandedRows[user._id]} timeout="auto" unmountOnExit>
                          <Box sx={{display:"flex",justifyContent:"center"}} >
                            <Paper sx={{ width:"50%",margin: 1,p:3}}>
                              <Typography variant="body1" gutterBottom>
                                <strong>Email:</strong> {user.email}
                              </Typography>
                              <Typography variant="body1" gutterBottom>
                                <strong>Phone:</strong> {user.phone}
                              </Typography>
                              <Box m={2} >
                                <Button
                                  sx={{mr:1}}
                                  variant="contained"
                                  onClick={() => {
                                    setUserIdToEdit(user._id);
                                    setOpenEditDialog(true);
                                  }}
                                  startIcon={<EditIcon />}
                                >
                                  Edit
                                </Button>
                                <Button
                                  variant="contained"
                                  color="error"
                                  onClick={() => {
                                    setUserIdToDelete(user._id);
                                    setOpenDeleteDialog(true);
                                  }}
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
        </Paper>
        <UserDeleteAndStatusDialog
          open={openEditDialog}
          onClose={() => setOpenEditDialog(false)}
          onConfirm={handleConfirmEdit}
          title="Change User Status"
          message="Are you sure you want to change the status of this user?"
        />
        <UserDeleteAndStatusDialog
          open={openDeleteDialog}
          onClose={() => setOpenDeleteDialog(false)}
          onConfirm={handleConfirmDelete}
          title="Delete User"
          message="Are you sure you want to delete this user?"
        />
      </Container>
    </Container>
  );
};

export default CrmPanel;
*/
import React, { useEffect, useState } from "react";
import { Button, Paper, Table, TableBody, TableCell, Container, TableHead, TableRow, TableContainer, Typography, Collapse, Box } from "@mui/material";
import useUsers from "../hooks/useUsers";
import Spinner from "../../components/Spinner";
import UserDeleteAndStatusDialog from "./UserDeleteAndStatusDialog";
import PageHeader from "../../components/PageHeader";
import SearchBar from "../../layout/header/topNavBar/right-navigation/SearchBar";
import { useTheme } from "../../providers/CustomThemeProvider";
import EditIcon from '@mui/icons-material/Edit';
import { useSnack } from "../../providers/SnackbarProvider";

const CrmPanel = () => {
  const { 
    isLoading,  
    filterUsers, 
    handleDeleteUser,
    handleUpdateUser, 
    handleRefresh,
    query,
    setQuery} = useUsers();
  const [expandedRows, setExpandedRows] = useState({});
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [userIdToEdit, setUserIdToEdit] = useState(null);
  const { isDark } = useTheme();
  const setSnack = useSnack();

  useEffect(() => {
    handleRefresh();
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
      const updatedIsBusiness = !filterUsers.find((user) => user._id === userIdToEdit).isBusiness;
      await handleUpdateUser(userIdToEdit, { isBusiness: updatedIsBusiness });
      setOpenEditDialog(false);
      setSnack("success", "User status changed successfully!");
    } catch (error) {
      setSnack("error", "Failed to update user status");
    }
  
  };
 

  if (isLoading) return <Spinner />;

  return (
    <Container>
      <PageHeader
        title="Welcome to CRM Panel"
        subtitle="Here you can manage the users - click on a user to open delete and block user buttons."
      />
      <Container sx={{ width: "100%", pb: 3 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button variant="contained" onClick={handleRefresh} sx={{ marginBottom: 2 }}>
            Refresh
          </Button>
          <SearchBar query={query} setQuery={setQuery} />
        </Box>
        <Paper sx={{ padding: 2 }}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 300 }} aria-label="CRM Panel">
              <TableHead sx={{ fontWeight: "bold" }}>
                <TableRow sx={{ backgroundColor: isDark ? "gray" : '#c1e5e2' }}>
                  <TableCell>
                    <Typography variant="body1">First Name</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1">Last Name</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1">Email</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1">Status</Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filterUsers.map((user) => (
                  <React.Fragment key={user._id}>
                    <TableRow
                      onClick={() => toggleRow(user._id)}
                      sx={{ cursor: 'pointer', transition: 'background-color 0.3s', ':hover': { backgroundColor: isDark ? "gray" : '#f0f0f0' } }}>
                      <TableCell>
                        <Typography variant="body2">{user.name.first}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{user.name.last}</Typography>
                      </TableCell>
                      <TableCell
                        sx={{ maxWidth: 150, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: '0.875rem' }}>
                        <Typography variant="body2">{user.email}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{user.isBusiness ? "Business" : "Personal"}</Typography>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={3} sx={{ paddingBottom: 0, paddingTop: 0 }}>
                        <Collapse in={expandedRows[user._id]} timeout="auto" unmountOnExit>
                          <Box sx={{ display: "flex", justifyContent: "center" }} >
                            <Paper sx={{ width: "50%", margin: 1, p: 3 }}>
                              <Typography variant="body1" gutterBottom>
                                <strong>Email:</strong> {user.email}
                              </Typography>
                              <Typography variant="body1" gutterBottom>
                                <strong>Phone:</strong> {user.phone}
                              </Typography>
                              <Box m={2} >
                                <Button
                                  sx={{ mr: 1 }}
                                  variant="contained"
                                  onClick={() => {
                                    setUserIdToEdit(user._id);
                                    setOpenEditDialog(true);
                                  }}
                                  startIcon={<EditIcon />}
                                >
                                  Edit
                                </Button>
                                <Button
                                  variant="contained"
                                  color="error"
                                  onClick={() => {
                                    setUserIdToDelete(user._id);
                                    setOpenDeleteDialog(true);
                                  }}
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
        </Paper>
        <UserDeleteAndStatusDialog
          open={openEditDialog}
          onClose={() => setOpenEditDialog(false)}
          onConfirm={handleConfirmEdit}
          title="Change User Status"
          message="Are you sure you want to change the status of this user?"
        />
        <UserDeleteAndStatusDialog
          open={openDeleteDialog}
          onClose={() => setOpenDeleteDialog(false)}
          onConfirm={handleConfirmDelete}
          title="Delete User"
          message="Are you sure you want to delete this user?"
        />
      </Container>
    </Container>
  );
};

export default CrmPanel;



