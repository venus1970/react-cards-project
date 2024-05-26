/*import React, { useEffect } from 'react'
import useForm from '../../forms/hooks/useForm'
import { Navigate} from 'react-router-dom'
import { useUser } from '../providers/UserProvider'
import mapToModelUser from '../helpers/normalization/mapToModelUser'
import ROUTES from '../../routes/routesModel'
import { Container, Box, Typography } from '@mui/material'
import useUsers from '../hooks/useUsers'
import initialEditForm from '../helpers/initialForms/initialEditForm'
import EditUserForm from '../components/EditUserForm'
import editUserSchema from '../models/editUserSchema'
import PageHeader from '../../components/PageHeader'

export default function EditUserPage() {
    const { handleGetUser, handleUpdateUser } = useUsers()
    const { user } = useUser()

    const {
        data,
        errors,
        setData,
        handleChange,
        handleReset,
        validateForm,
        onSubmit,
    } = useForm(initialEditForm, editUserSchema, (newUser) =>
        handleUpdateUser(user._id, newUser)
    )

    useEffect(() => {
        if (user) {
            handleGetUser(user._id).then((userData) => {
                const modelUser = mapToModelUser(userData)
                setData(modelUser)
            })
        }
    }, [handleGetUser, setData, user])

    if (!user) return <Navigate replace to={ROUTES.LOGIN} />; // Redirect to login if user is not logged in
  
    return (
        <div>
    <Box
    sx={{
        paddingTop: 4
    }}
    >
     <PageHeader
        title="Welcome to Edit Account Page"
        subtitle="Here you can edit your account"
      />
        <Container
            sx={{
                paddingTop: 8,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Box
                sx={{
                    backgroundColor: '#FFFFE0', // yellow background
                    padding: '20px',
                    borderRadius: '10px',
                    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
                    border: '1px solid #000000', // black border
                    marginBottom: "30px",
                    
                }}
            >
            <Typography variant="h4" gutterBottom sx={{ textAlign: "center", 
                    backgroundColor: '#FFFFE0', padding: '10px', borderRadius: '5px' }}>
                    Edit Account
                </Typography>
                {data && (
                    <EditUserForm
                        onSubmit={onSubmit}
                        onReset={handleReset}
                        errors={errors}
                        validateForm={validateForm}
                        onInputChange={handleChange}
                        data={data}
                    />
                )}
            </Box>
        </Container>
        </Box>
    </div>  
    );
}




*/

import React, { useEffect } from 'react'
import useForm from '../../forms/hooks/useForm'
import { Navigate } from 'react-router-dom'
import { useUser } from '../providers/UserProvider'
import mapToModelUser from '../helpers/normalization/mapToModelUser'
import ROUTES from '../../routes/routesModel'
import { Box, Container } from '@mui/material'
import useUsers from '../hooks/useUsers'
import initialEditForm from '../helpers/initialForms/initialEditForm'
import EditUserForm from '../components/EditUserForm'
import editUserSchema from '../models/editUserSchema'
import PageHeader from '../../components/PageHeader'

export default function EditUserPage() {
  const { handleGetUser, handleUpdateUser } = useUsers();
  const { user } = useUser();

  const {
    data,
    errors,
    setData,
    handleChange,
    handleReset,
    validateForm,
    onSubmit,
  } = useForm(initialEditForm, editUserSchema, (newUser) =>
    handleUpdateUser(user._id, newUser)
  );

  const userId = user && user._id;

  useEffect(() => {
    if (userId) {
      handleGetUser(userId).then((userData) => {
        const modelUser = mapToModelUser(userData);
        setData(modelUser);
      });
    }
  }, [handleGetUser, setData, userId]);

  if (!user) return <Navigate replace to={ROUTES.LOGIN} />; // Redirect to login if user is not logged in

  return (
    <div>
      <Box>
        <PageHeader
          title="Edit Account"
          subtitle="Here you can edit your account"
        />
        <Container
          sx={{
            paddingTop: 8,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              backgroundColor: "#FFFFE0", // Yellow background
              borderRadius: "8px",
              boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
              padding: "20px",
              marginBottom: "40px", // Margin bottom added to form
            }}
          >
            {data && (
              <EditUserForm
                title="Edit Account"
                onSubmit={onSubmit}
                onReset={handleReset}
                errors={errors}
                validateForm={validateForm}
                onInputChange={handleChange}
                data={data}
              />
            )}
          </Box>
        </Container>
      </Box>
    </div>
  );
}
