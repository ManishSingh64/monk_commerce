import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { styled } from "styled-components";
import { useSortable } from "@dnd-kit/sortable";

const ChildrenRow = ({ child, id }) => {
  console.log(child);
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transition,
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
  };

  return (
    <VariantWrapper
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <div>
        <DragIndicatorIcon color="disabled" style={{ cursor: "grab" }} />
      </div>
      <div
        style={{
          width: "21rem",
          height: "2rem",
          display: "flex",
          alignItems: "center",
          paddingLeft: "1rem",
          border: "1px solid #eeeeee",
          borderRadius: "1rem",
          fontFamily: "sans-serif",
        }}
      >
        {child?.label}
      </div>
    </VariantWrapper>
  );
};

export default ChildrenRow;
const VariantWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-top: 1.5rem;
  margin-left: 2rem;
  align-items: center;
`;
