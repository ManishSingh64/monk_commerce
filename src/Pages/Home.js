import React, { useState } from "react";
import InputBox from "../Components/InputBox";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import {
  AddProductButton,
  DiscountButton,
  DiscountHeader,
  Header,
  InputHeader,
  InputWrapper,
  Wrapper,
} from "./Home.style";
import ModalMenu from "../Components/ModalMenu";

const Home = () => {
  const [inputs, setInputs] = useState([""]);
  const [openmodal, setOpenmodal] = useState(false);

  const handleAddProduct = () => {
    setInputs([...inputs, "1"]);
  };
  //   console.log(data);
  return (
    <Wrapper>
      <Header>Add Products</Header>
      <InputHeader>
        Product
        <DiscountHeader>Discount</DiscountHeader>
      </InputHeader>

      {inputs?.map((el, i) => {
        return (
          <InputWrapper>
            <DragIndicatorIcon color="disabled" style={{ cursor: "grab" }} />
            {i + 1}.
            <InputBox setOpenmodal={setOpenmodal} />
            <DiscountButton>Add Discount</DiscountButton>
          </InputWrapper>
        );
      })}

      <AddProductButton onClick={handleAddProduct}>
        Add Product
      </AddProductButton>

      {openmodal && (
        <ModalMenu openmodal={openmodal} setOpenmodal={setOpenmodal} />
      )}
    </Wrapper>
  );
};

export default Home;
