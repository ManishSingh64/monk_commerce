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
              setOpenmodal={setOpenmodal}
              input={input}
              setSelectedIdx={setSelectedIdx}
              handleDeleteChiddren={handleDeleteChiddren}
            />
          );
        })}
      </SortableContext>
    </div>
  );
};

export default Column;
