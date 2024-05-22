import React, { useEffect } from 'react'
import useForm from '../../forms/hooks/useForm'
import { Navigate} from 'react-router-dom'
import { useUser } from '../providers/UserProvider'
import mapToModelUser from '../helpers/normalization/mapToModelUser'
import ROUTES from '../../routes/routesModel'
import { Container } from '@mui/material'
import useUsers from '../hooks/useUsers'
import initialEditForm from '../helpers/initialForms/initialEditForm'
import EditUserForm from '../components/EditUserForm'
import editUserSchema from '../models/editUserSchema'

export default function EditUserPage() {
    const { handleGetUser, handleUpdateUser } = useUsers()
    const {user} = useUser()

    const {
        data,
        errors,
        setData,
        handleChange,
        handleReset,
        validateForm,
        onSubmit,
    }= useForm(initialEditForm, editUserSchema, (newUser) =>
    handleUpdateUser(user._id, newUser))

    useEffect((_id)=>{
        handleGetUser(user._id).then((data)=>{
            const modelUser = mapToModelUser(data)
            setData(modelUser)
        })
    },[handleGetUser, setData, user._id])
   

    if(!user) return <Navigate replace to={ROUTES.LOGIN}/>
  return (
    <Container
      sx={{
        paddingTop: 8,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {data && (
        <EditUserForm
          title="edit account"
          onSubmit={onSubmit}
          onReset={handleReset}
          errors={errors}
          validateForm={validateForm}
          onInputChange={handleChange}
          data={data}
        />
      )}
    </Container>
  )
}