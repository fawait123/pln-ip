export const Menus = [
  {
    id: 1,
    name: "Home",
    url: "/",
    icon: "home",
  },
  {
    id: 2,
    name: "Squences",
    url: "/squences",
    icon: "forward-message",
  },
  {
    id: 3,
    name: "Scope",
    url: "/scope",
    icon: "document",
    children: [
      {
        id: 301,
        name: "Mekanik",
        url: "/scope-mekanik",
      },
      {
        id: 302,
        name: "Listrik",
        url: "/scope-listrik",
      },
      {
        id: 303,
        name: "Instrument",
        url: "/scope-instrument",
      },
    ],
  },
  {
    id: 4,
    name: "Instruksi Kerja",
    url: "/work-instruction",
    icon: "checklist",
    children: [
      {
        id: 301,
        name: "Mekanik",
        url: "/work-instruction-mekanik",
      },
      {
        id: 302,
        name: "Listrik",
        url: "/work-instruction-listrik",
      },
      {
        id: 303,
        name: "Instrument",
        url: "/work-instruction-instrument",
      },
    ],
  },
  {
    id: 5,
    name: "Consumable Material",
    url: "/consumable-material",
    icon: "box",
  },
  {
    id: 6,
    name: "Manpower",
    url: "/manpower",
    icon: "male",
  },
  {
    id: 7,
    name: "Part",
    url: "/part",
    icon: "trolley-items",
  },
  {
    id: 8,
    name: "HSE",
    url: "/hse",
    icon: "construction-worker",
  },
  {
    id: 9,
    name: "QC Plan",
    url: "/qc-plan",
    icon: "mind-gear",
  },
  {
    id: 10,
    name: "Add Scope",
    url: "/add-scope",
    icon: "login",
    // children: [
    //   {
    //     id: 101,
    //     name: "Table",
    //     url: "/add-scope-table",
    //   },
    //   {
    //     id: 102,
    //     name: "Squences",
    //     url: "/add-scope-squences",
    //   },
    // ],
  },
  // {
  //   id: 11,
  //   name: "Preview",
  //   url: "/preview",
  //   icon: "magnifying-glass",
  // },
  {
    id: 12,
    name: "Results",
    url: "/results",
    icon: "document-clean",
  },
];

export const MenusAddScope = [
  {
    id: 1,
    name: "Additional Scope",
    url: "/",
    icon: "out",
  },
  {
    id: 2,
    name: "Scope",
    url: "/scope",
    icon: "document",
    children: [
      {
        id: 201,
        name: "Mekanik",
        url: "/scope-mekanik",
      },
      {
        id: 202,
        name: "Listrik",
        url: "/scope-listrik",
      },
      {
        id: 203,
        name: "Instrument",
        url: "/scope-instrument",
      },
    ],
  },
  {
    id: 3,
    name: "Instruksi Kerja",
    url: "/work-instruction",
    icon: "checklist",
    children: [
      {
        id: 301,
        name: "Mekanik",
        url: "/work-instruction-mekanik",
      },
      {
        id: 302,
        name: "Listrik",
        url: "/work-instruction-listrik",
      },
      {
        id: 303,
        name: "Instrument",
        url: "/work-instruction-instrument",
      },
    ],
  },
  {
    id: 4,
    name: "Consumable Material",
    url: "/consumable-material",
    icon: "box",
  },
  {
    id: 5,
    name: "Manpower",
    url: "/manpower",
    icon: "male",
  },
  {
    id: 6,
    name: "Part",
    url: "/part",
    icon: "trolley-items",
  },
  {
    id: 7,
    name: "QC Plan",
    url: "/qc-plan",
    icon: "mind-gear",
  },
];
