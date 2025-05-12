let list = [
  {
    name: "abc",
    children: [
      {
        name: "pqr",
        children: [
          {
            name: "xyz",
            children: [],
          },
        ],
      },
      {
        name: "mno",
        children: [
          {
            name: "qrs",
            children: [],
          },
        ],
      },
    ],
  },
  {
    name: "bcd",
    children: [],
  },
];

function formatData(arr) {
  arr.forEach((i) => {
    if (i.name === "xyz") {
      i.children = [
        ...i.children,
        {
          name: "CICCIUZZO",
          children: [],
        },
        (i.name = "CICCIO"),
      ];
    } else {
      formatData(i.children);
    }
  });
  console.log(arr);
}

formatData(list);
