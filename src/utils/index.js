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
    };

    tempObj["children"] = data?.variants.map((el) => {
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
