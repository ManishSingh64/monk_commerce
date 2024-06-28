import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Checkbox, FormControlLabel } from "@mui/material";
import { formatData } from "../utils";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  height: 500,
  bgcolor: "white",
  outline: "none",
  border: "none",
  boxShadow: 24,
  p: 4,
  overflow: "auto",
  "::-webkit-scrollbar": {
    width: "5px",
  },
  "::-webkit-scrollbar-thumb": {
    backgroundColor: "#979393",
    borderRadius: "10px",
  },
};

const ModalMenu = ({ openmodal, setOpenmodal, apiData }) => {
  const [data, setData] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const scrollableBoxRef = React.useRef(null);
  const handleClose = () => setOpenmodal(false);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://stageapi.monkcommerce.app/task/products/search?limit=9&page=${page}`,
          {
            headers: {
              "x-api-key": `72njgfa948d9aS7gs5`,
            },
          }
        );
        const formattedData = formatData(response.data);
        setData((prev) => [...prev, ...formattedData]);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [page]);

  const handleParentChange = (parentId) => (event) => {
    const updatedData = data.map((parent) => {
      if (parent.id === parentId) {
        const checked = event.target.checked;
        return {
          ...parent,
          children: parent.children.map((child) => ({
            ...child,
            checked,
          })),
        };
      }
      return parent;
    });
    setData(updatedData);
  };

  const handleChildChange = (parentId, childId) => (event) => {
    const updatedData = data.map((parent) => {
      if (parent.id === parentId) {
        const updatedChildren = parent.children.map((child) => {
          if (child.id === childId) {
            return {
              ...child,
              checked: event.target.checked,
            };
          }
          return child;
        });
        return {
          ...parent,
          children: updatedChildren,
        };
      }
      return parent;
    });
    setData(updatedData);
  };
  const handleInfiniteScroll = async (event) => {
    const element = event.target;

    // console.log("scrollHeight" + element.scrollHeight); //1030
    // console.log("innerHeight" + element.clientHeight); // 564
    // console.log("scrollTop" + element.scrollTop); //466.3..
    try {
      if (
        element.scrollTop + element.clientHeight + 1 >=
        element.scrollHeight
      ) {
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };
  React.useEffect(() => {
    if (openmodal) {
      setTimeout(() => {
        const element = scrollableBoxRef.current;

        if (element) {
          element.addEventListener("scroll", handleInfiniteScroll);
        }
        return () => {
          if (element) {
            element.removeEventListener("scroll", handleInfiniteScroll);
          }
        };
      }, 1000);
    }
  }, [openmodal]);
  console.log(data, "data");
  return (
    <div>
      <Modal open={openmodal} onClose={handleClose}>
        <Box sx={style} ref={scrollableBoxRef}>
          {data?.map((parent) => {
            const allChecked = parent?.children?.every(
              (child) => child?.checked
            );
            const someChecked = parent?.children?.some(
              (child) => child?.checked
            );

            return (
              <div key={parent.id}>
                <FormControlLabel
                  label={parent.label}
                  control={
                    <Checkbox
                      checked={allChecked}
                      indeterminate={!allChecked && someChecked}
                      onChange={handleParentChange(parent.id)}
                    />
                  }
                />
                <Box sx={{ display: "flex", flexDirection: "column", ml: 3 }}>
                  {parent?.children?.map((child) => (
                    <FormControlLabel
                      key={child.id}
                      label={child.label}
                      control={
                        <Checkbox
                          checked={child.checked}
                          onChange={handleChildChange(parent.id, child.id)}
                        />
                      }
                    />
                  ))}
                </Box>
              </div>
            );
          })}
        </Box>
      </Modal>
    </div>
  );
};

export default ModalMenu;
