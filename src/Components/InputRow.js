import React, { useEffect, useState } from "react";
import { DiscountButton, InputWrapper } from "../Pages/Home.style";
import InputBox from "./InputBox";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { styled } from "styled-components";
import Arrow from "../Icons/Arrow.js";
import ChildrenRow from "./ChildrenRow";
import { formatChildrenFunc } from "../utils";
import { DndContext, closestCorners } from "@dnd-kit/core";

const InputRow = ({
  id,
  idx,
  setOpenmodal,
  input,
  setSelectedIdx,
  handleDeleteChiddren,
}) => {
  //   console.log("input", input);
  const [discount, setDiscount] = useState(false);
  const [childrenData, setChildrenData] = useState([]);
  const [showVariants, setShowVariants] = useState(false);
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = { transition, transform: CSS.Transform.toString(transform) };

  useEffect(() => {
    const fetchChildrenData = async () => {
      const formattedChildren = await formatChildrenFunc(input);
      setChildrenData(formattedChildren);
    };

    setTimeout(() => {
      fetchChildrenData();
    }, 2000);
  }, [input]);

  const getTaskPos = (id) => {
    // active = 2 => 1, over = 1 => 0
    return childrenData.findIndex((input) => input.id === id);
  };

  const handleDragEnd = (event) => {
    // console.log(event);
    const { active, over } = event;

    if (active.id === over.id) return;

    setChildrenData((input) => {
      const originalPos = getTaskPos(active.id);
      const newPos = getTaskPos(over.id);
      //   console.log(originalPos, newPos);
      return arrayMove(input, originalPos, newPos);
    });
  };

  //   console.log("children", childrenData);
  return (
    <>
      <InputWrapper ref={setNodeRef} style={style}>
        {/* adding attributes and listeners here beacause now we can drag with icon only and due to this my onclick for modal also doesn't affect */}
        <div {...attributes} {...listeners}>
          <DragIndicatorIcon color="disabled" style={{ cursor: "grab" }} />
        </div>
        {idx}.
        <InputBox
          setOpenmodal={setOpenmodal}
          input={input}
          idx={idx}
          setSelectedIdx={setSelectedIdx}
        />
        {discount ? (
          <DiscountsWrapper>
            <Input className="inpu"></Input>
            <select
              style={{
                width: "44%",
                border: "1px solid gainsboro",
                borderRadius: "0.5rem",
              }}
              name=""
              id="dis"
            >
              <option value="off">% off</option>
              <option value="flat">Flat off</option>
            </select>
          </DiscountsWrapper>
        ) : (
          <DiscountButton onClick={() => setDiscount(true)}>
            Add Discount
          </DiscountButton>
        )}
      </InputWrapper>

      <ShowVariantText onClick={() => setShowVariants((prev) => !prev)}>
        {showVariants ? "Hide Variants" : "Show Variants"}
        <ArrowWrapper showVariants={showVariants}>
          <Arrow />
        </ArrowWrapper>
      </ShowVariantText>

      <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
        <div>
          <SortableContext
            items={childrenData}
            strategy={verticalListSortingStrategy}
          >
            {showVariants &&
              input?.children?.map((item, i) => {
                return (
                  <ChildrenRow
                    key={item.id}
                    child={item}
                    id={i}
                    chlidId={item?.id}
                    handleDeleteChiddren={handleDeleteChiddren}
                  />
                );
              })}
          </SortableContext>
        </div>
      </DndContext>
    </>
  );
};

export default InputRow;

const DiscountsWrapper = styled.div`
  //   border: 1px solid red;
  height: 3.5rem;
  width: 35%;
  display: flex;
  justify-content: space-between;
`;

export const Input = styled.input`
  width: 52%;
  border: 1px solid gainsboro;
  border-radius: 0.5rem;
`;

export const ShowVariantText = styled.div`
  //   border: 1px solid;
  display: flex;
  width: 93%;
  font-family: sans-serif;
  justify-content: flex-end;
  align-items: center;
  font-size: 14px;
  text-decoration: underline;
  cursor: pointer;
  color: #4fa3e2;
`;
export const ArrowWrapper = styled.div`
  margin-left: 0.3rem;
  transform: ${({ showVariants }) => showVariants && "rotate(180deg)"};
`;
