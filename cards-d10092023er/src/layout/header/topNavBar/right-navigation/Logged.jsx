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

