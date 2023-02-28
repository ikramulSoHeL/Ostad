const folders = [
  {
    id: 1,
    name: "Folder 1",
  },
  {
    id: 2,
    name: "Folder 2",
    children: [
      {
        id: 1,
        name: "Folder 1",
      },
      {
        id: 2,
        name: "Folder 2",
        parent: 1,
      },
    ],
  },
  {
    id: 3,
    name: "Folder 3",
    parent: 1,
  },
  {
    id: 4,
    name: "Folder 4",
    parent: 3,
  },
  {
    id: 5,
    name: "Folder 5",
  },
];

export default folders;
