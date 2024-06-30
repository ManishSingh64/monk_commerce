import * as React from "react";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";

import EditIcon from "@mui/icons-material/Edit";

const InputBox = ({ setOpenmodal, input, idx, setSelectedIdx }) => {
  const [isHovered, setIsHovered] = React.useState(false);

  const handleEdit = (event) => {
    event.stopPropagation();
    setOpenmodal(true);
    setSelectedIdx(idx - 1);
  };

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap" }}>
      <div>
        <FormControl sx={{ m: 1, width: "30ch" }} variant="outlined">
          <OutlinedInput
            placeholder="Select Product"
            value={input.label}
            endAdornment={
              <InputAdornment position="end">
                <EditIcon
                  style={{
                    cursor: "pointer",
                    width: "20px",
                    padding: "14px",
                    aspectRatio: "1",
                    transition: "all 0.2s ease",
                    backgroundColor: isHovered ? "#eeeeee" : "transparent",
                  }}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  onClick={handleEdit}
                />
              </InputAdornment>
            }
          />
        </FormControl>
      </div>
    </Box>
  );
};

export default InputBox;
