// dummy data for showing checkboxes
// const initialData = [
//   {
//     id: 1,
//     label: "Parent 1",
//     children: [
//       { id: 1, label: "Child 1.1", checked: false },
//       { id: 2, label: "Child 1.2", checked: false },
//     ],
//   },
//   {
//     id: 2,
//     label: "Parent 2",
//     children: [
//       { id: 3, label: "Child 2.1", checked: false },
//       { id: 4, label: "Child 2.2", checked: false },
//     ],
//   },
// ];

export const formatData = (apiData) => {
  const newData = apiData?.map((data) => {
    let tempObj = {
      id: data?.id,
      label: data?.title,
      image: data?.image, // storing as object {src: "llink"}
    };

    tempObj["children"] = data?.variants?.map((el) => {
      const childtemObj = {
        id: el?.id,
        label: el?.option1,
        price: el?.price,
        checked: false,
      };
      return childtemObj;
    });

    return tempObj;
  });

  return newData;
};

export const formatDataFunc = (data) => {
  // console.log("formatDataFunc", data);
  let newData = data?.map((el, i) => {
    el["id"] = i + 1;

    return el;
  });

  return newData;
};

export const formatChildrenFunc = (data) => {
  // console.log("formatChildrenFunc", data);
  const updatedData = data?.children?.map((el, i) => {
    el["id"] = i;
    return el;
  });
  return updatedData;
};

export const checkCountFunc = (data) => {
  let count = 0;

  data?.forEach((el, i) => {
    let filteredData = el?.children.filter((item) => item.checked).length;
    if (filteredData) {
      count++;
    }
  });

  return count;
};
