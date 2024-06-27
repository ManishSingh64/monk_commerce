import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  height: 500,
  bgcolor: "white",
  //   border: "5px solid red",
  boxShadow: 24,
  p: 4,
};

const ModalMenu = ({ openmodal, setOpenmodal }) => {
  const handleClose = () => setOpenmodal(false);

  return (
    <div>
      <Modal open={openmodal} onClose={handleClose}>
        <Box sx={style}></Box>
      </Modal>
    </div>
  );
};

export default ModalMenu;
