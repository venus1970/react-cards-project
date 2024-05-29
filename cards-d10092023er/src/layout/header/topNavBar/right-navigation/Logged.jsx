import React from "react";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import { useMenu } from "../menu/MenuProvider";

const Logged = () => {
  const setOpen = useMenu();

  return (
    <Tooltip title="Open settings">
      <IconButton
        sx={{ p: 0, display: "inline-flex", marginLeft: 2 }}
        onClick={() => setOpen(true)}
      >
        <Avatar alt="avatar" src="/assets/images/Monro.jpg"
          sx={{
            width: 45,
            height: 45,
            cursor: "pointer",
            borderRadius: "50%",
            boxShadow: "0 0 0 2px white",
            border: "3px solid white",
            backgroundColor: "white",
            color: "black",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginRight: 1,
          }}
        
        />
      </IconButton>
    </Tooltip>
  );
};

export default Logged;

/*

import React, { useEffect, useState } from 'react'
import { Avatar, IconButton, Tooltip } from '@mui/material'
import { useMenu } from '../menu/MenuProvider'
import useUsers from '../../../../users/hooks/useUsers';
import { useUser } from '../../../../users/providers/UserProvider';

export default function Logged() {
  const setOpen = useMenu()
  const { handleGetUser } = useUsers();
  const { user } = useUser();
  const [userFullData, setUserFullData] = useState(null);

  useEffect(() => {
    if (user) {
      const getUser = async () => {
        setUserFullData(await handleGetUser(user._id));
      };
      getUser();
    }
  }, [user, handleGetUser]);

  if (!userFullData) return null;
  
  return (
    <Tooltip title='open settings'>
        <IconButton 
          sx={{p:0, display:'inline-flex',ml:2}} 
          onClick={()=>setOpen(true)}>
            <Avatar
              src={userFullData.image.url}
              alt={userFullData.image.alt}
              sx={{ 
                width:45,
                height:45,
                cursor:'pointer',
                borderRadius:'50%',
                boxShadow:'0 0 0 2px white',
                border:'3px solid white',
                backgroundColor:'white',
                color:'black',
                display:'flex',
                justifyContent:'center',
                alignItems:'center',
                mr:1 }}
              />
              
        </IconButton>
    </Tooltip>
  )
}*/