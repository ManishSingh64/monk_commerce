import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import { checkCountFunc, formatData } from "../utils";
import axios from "axios";
import { styled } from "styled-components";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  height: 500,
  bgcolor: "white",
  outline: "none",
  border: "none",
  boxShadow: 24,
  padding: "0rem 2rem",
  overflow: "auto",
  "::-webkit-scrollbar": {
    width: "5px",
  },
  "::-webkit-scrollbar-thumb": {
    backgroundColor: "#979393",
    borderRadius: "16px",
  },
  borderRadius: "0.4rem",
};
const HeaderWrapperStyle = {
  position: "sticky",
  left: "0",
  top: "-0.1rem",
  width: "100%",
  height: "6rem",
  // border: "1px solid red",
  backgroundColor: "#fff",
};
const HeaderStyle = {
  width: "100%",
  // border: "1px solid blue",
  backgroundColor: "#fff",
  height: "3rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  fontSize: "1.5rem",
  fontWeight: "600",
  fontFamily: "sans-serif",
};
const footerStyle = {
  position: "sticky",
  left: "0",
  bottom: "-0.1rem",
  width: "100%",
  height: "3rem",
  // border: "1px solid red",
  backgroundColor: "rgb(241 241 241)",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const ModalMenu = ({ openmodal, setOpenmodal, handleEditProduct }) => {
  const [data, setData] = React.useState([]);
  const [nullData, setNullData] = React.useState("");
  const [checkedData, setCheckedData] = React.useState([]);
  const [checkedCount, setCheckedCount] = React.useState(0);
  const [page, setPage] = React.useState(1);
  const [searchQuery, setSearchQuery] = React.useState("");
  const scrollableBoxRef = React.useRef(null);
  const handleClose = () => setOpenmodal(false);

  const fetchData = async (page, query) => {
    try {
      const response = await axios.get(
        `https://stageapi.monkcommerce.app/task/products/search?search=${query}&limit=10&page=${page}`,
        {
          headers: {
            "x-api-key": `72njgfa948d9aS7gs5`,
          },
        }
      );
      // console.log(response.data);
      if (response.data !== null) {
        setNullData("");
        const formattedData = formatData(response?.data);

        setData((prev) => [...prev, ...formattedData]);
      } else {
        setNullData(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  //DATA FETCHING WHEN COMPONENT MOUNTS
  React.useEffect(() => {
    fetchData(page, searchQuery);
  }, [page]);

  // FETCH DATA WHEN SEARCH QUERY CHANGES

  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      setData([]);
      setPage(1); //reseting the first page
      fetchData(1, searchQuery);
    }, 500); // Debouncing the search input

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  // INFINITE SCOLLING LOGIC
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

  const handleParentChange = (parentId, parent) => (event) => {
    const checked = event.target.checked;
    const updatedData = data.map((parent) => {
      if (parent.id === parentId) {
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
    if (checked) {
      // Only add to checkedData if checked is true
      setCheckedData((prev) => [...prev, { ...parent }]);
    } else {
      // Remove from checkedData if checked is false
      setCheckedData((prev) => prev.filter((item) => item.id !== parent.id));
    }
  };

  const handleChildChange = (parentId, childId, parent, child) => (event) => {
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

  const handleSearchQuery = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleAddFunc = () => {
    setOpenmodal(false);
    handleEditProduct(checkedData);
  };

  React.useEffect(() => {
    setCheckedCount(checkCountFunc(data));
  }, [data]);

  return (
    <Modal open={openmodal} onClose={handleClose}>
      <Box sx={style} ref={scrollableBoxRef}>
        <div style={HeaderWrapperStyle}>
          <div style={HeaderStyle}>
            Add Products
            <CloseIcon
              style={{ cursor: "pointer" }}
              onClick={() => setOpenmodal(false)}
            />
          </div>

          <FormControl
            sx={{ m: 1, width: "61ch", margin: "0" }}
            variant="outlined"
          >
            <OutlinedInput
              style={{ height: "2.4375em" }}
              placeholder="Select Product"
              value={searchQuery}
              onChange={handleSearchQuery}
              endAdornment={
                <InputAdornment position="end">
                  <SearchIcon
                    style={{
                      cursor: "pointer",
                      width: "20px",
                      padding: "14px",
                      aspectRatio: "1",
                      transition: "all 0.2s ease",
                      // backgroundColor: isHovered ? "#eeeeee" : "transparent",
                    }}
                    // onMouseEnter={() => setIsHovered(true)}
                    // onMouseLeave={() => setIsHovered(false)}
                    // onClick={handleEdit}
                  />
                </InputAdornment>
              }
            />
          </FormControl>
        </div>
        {data?.map((parent) => {
          const allChecked = parent?.children?.every((child) => child?.checked);
          const someChecked = parent?.children?.some((child) => child?.checked);

          return (
            <div key={parent?.id}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <FormControlLabel
                  label={parent?.label}
                  control={
                    <Checkbox
                      style={{ zIndex: "-1" }}
                      checked={allChecked}
                      indeterminate={!allChecked && someChecked}
                      onChange={handleParentChange(parent?.id, parent)}
                    />
                  }
                />
                <img
                  key={parent?.id}
                  style={{ width: "2.5rem", aspectRatio: "1" }}
                  src={parent.image.src || ""}
                />
              </div>
              <Box sx={{ display: "flex", flexDirection: "column", ml: 3 }}>
                {parent?.children?.map((child) => (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <FormControlLabel
                      key={child?.id}
                      label={child?.label}
                      control={
                        <Checkbox
                          style={{ zIndex: "-1" }}
                          checked={child.checked}
                          onChange={handleChildChange(
                            parent.id,
                            child.id,
                            parent,
                            child
                          )}
                        />
                      }
                    />
                    <div>{child?.price}</div>
                  </div>
                ))}
              </Box>
            </div>
          );
        })}
        <div style={footerStyle}>
          <div style={{ paddingLeft: "0.5rem" }}>
            {checkedCount} Products Selected
          </div>

          <div
            style={{
              display: "flex",
              width: "35%",
              justifyContent: "space-around",
            }}
          >
            <CancelButton>Cancel</CancelButton>
            <AddButton onClick={() => handleAddFunc()}>Add</AddButton>
          </div>
        </div>
        {nullData === null && (
          <div>
            <h1>No Data Found</h1>
          </div>
        )}
      </Box>
    </Modal>
  );
};

export default ModalMenu;

const CancelButton = styled.button`
  border: none;
  // margin-top: 1rem;
  width: 38%;
  height: 1.5rem;
  font-size: 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 2px solid #65a365;
  background-color: #fff;
  color: #65a365;
  float: right;
  &:hover {
    background-color: #65a365;
    color: white;
  }
`;
const AddButton = styled.button`
  border: none;
  // margin-top: 1rem;
  width: 38%;
  height: 1.5rem;
  font-size: 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 2px solid #65a365;
  background-color: #fff;
  color: #65a365;
  float: right;
  &:hover {
    background-color: #65a365;
    color: white;
  }
`;
