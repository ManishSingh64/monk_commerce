import React, { useState } from "react";
import {
  AddProductButton,
  DiscountHeader,
  Header,
  InputHeader,
  Wrapper,
} from "./Home.style";
import ModalMenu from "../Components/ModalMenu";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import InputRow from "../Components/InputRow";
import { DndContext, closestCorners } from "@dnd-kit/core";
import Column from "../Components/Column";
import { formatDataFunc } from "../utils";
// [{ id: 1, label: "" }]
// [
//   { id: 1, label: "Add tests to homepage" },
//   { id: 2, label: "Fix styling in about section" },
//   { id: 3, label: "Learn how to center a div" },
// ]

// [
//   {
//     id: 1,
//     label: "",
//     children: [],
//   },
// ]
const Home = () => {
  const [inputs, setInputs] = useState([
    {
      id: 1,
      label: "",
      children: [],
    },
  ]);
  const [selectedIdx, setSelectedIdx] = useState();
  const [openmodal, setOpenmodal] = useState(false);

  const handleAddProduct = () => {
    setInputs((input) => [
      ...input,
      { id: input.length + 1, label: "", children: [] },
    ]);
  };

  const handleEditProduct = (checkedData) => {
    // console.log(inputs, checkedData);
    if (inputs[0]?.label === "") {
      setInputs([...formatDataFunc(checkedData)]);
    } else {
      //logic

      setInputs((prevInputs) => {
        const updatedArray = [...prevInputs];
        updatedArray.splice(selectedIdx, 1, ...checkedData);
        const indexedArray = formatDataFunc(updatedArray);
        return indexedArray;
      });
    }
  };

  const getTaskPos = (id) => {
    // active = 2 => 1, over = 1 => 0
    return inputs.findIndex((input) => input.id === id);
  };

  const handleDragEnd = (event) => {
    // console.log(event);
    const { active, over } = event;

    if (active.id === over.id) return;

    setInputs((input) => {
      const originalPos = getTaskPos(active.id);
      const newPos = getTaskPos(over.id);

      return arrayMove(input, originalPos, newPos);
    });
  };

  return (
    <Wrapper>
      <Header>Add Products</Header>
      <InputHeader>
        Product
        <DiscountHeader>Discount</DiscountHeader>
      </InputHeader>

      <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
        <Column
          id={"inPut"}
          inputs={inputs}
          setSelectedIdx={setSelectedIdx}
          setOpenmodal={setOpenmodal}
          arr={[1, 2]}
        />
      </DndContext>

      <AddProductButton onClick={handleAddProduct}>
        Add Product
      </AddProductButton>

      {openmodal && (
        <ModalMenu
          openmodal={openmodal}
          setOpenmodal={setOpenmodal}
          handleEditProduct={handleEditProduct}
        />
      )}
    </Wrapper>
  );
};

export default Home;
