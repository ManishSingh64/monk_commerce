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
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          " http://stageapi.monkcommerce.app/task/products/search?search=Hat&page=2&limit=1",
          {
            headers: {
              Authorization: `Bearer 72njgfa948d9aS7gs5`,
            },
          }
        );
        setData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAddProduct = () => {
    setInputs([...inputs, "1"]);
  };
  return (
    <Wrapper>
      <Header>Add Products</Header>
      <InputHeader>
        Product
        <DiscountHeader>Discount</DiscountHeader>
      </InputHeader>

      {/* map */}
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

      {/* map */}

      <AddProductButton onClick={handleAddProduct}>
        Add Product
      </AddProductButton>

      {openmodal && (
        <ModalMenu
          openmodal={openmodal}
          setOpenmodal={setOpenmodal}
        ></ModalMenu>
      )}
    </Wrapper>
  );
};

export default Home;
