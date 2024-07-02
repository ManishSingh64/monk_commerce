import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import React, { useState } from "react";
import InputRow from "./InputRow";
// import { Task } from "./Task";

const Column = ({
  inputs,
  setOpenmodal,
  setSelectedIdx,
  arr,
  handleDeleteChiddren,
  handleDeleteParent,
}) => {
  return (
    <div>
      <SortableContext items={inputs} strategy={verticalListSortingStrategy}>
        {inputs?.map((input, i) => {
          return (
            <InputRow
              //   key={input?.id}
              id={i + 1}
              idx={i + 1}
              parentId={input?.id}
              setOpenmodal={setOpenmodal}
              input={input}
              setSelectedIdx={setSelectedIdx}
              handleDeleteChiddren={handleDeleteChiddren}
              handleDeleteParent={handleDeleteParent}
            />
          );
        })}
      </SortableContext>
    </div>
  );
};

export default Column;
