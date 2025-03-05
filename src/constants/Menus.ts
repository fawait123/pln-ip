export interface MenuInterface {
  id: number;
  name: string;
  url: string;
  icon: string;
  children?: {
    id: number;
    name: string;
    url: string;
  }[];
}

export const Menus: MenuInterface[] = [
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
    name: "Tools",
    url: "/tools",
    icon: "tools",
  },
  {
    id: 9,
    name: "HSE",
    url: "/hse",
    icon: "construction-worker",
  },
  {
    id: 10,
    name: "QC Plan",
    url: "/qc-plan",
    icon: "mind-gear",
  },
  {
    id: 11,
    name: "Add Scope",
    url: "/add-scope",
    icon: "login",
    children: [
      {
        id: 111,
        name: "Table",
        url: "/add-scope-table",
      },
      {
        id: 112,
        name: "Squences",
        url: "/add-scope-squences",
      },
    ],
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

export const MenusAddScope: MenuInterface[] = [
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

export const MenusMaster: MenuInterface[] = [
  {
    id: 1,
    name: "Location",
    url: "/location",
    icon: "location-pin",
  },
  {
    id: 2,
    name: "Unit",
    url: "/unit",
    icon: "unit",
  },
  {
    id: 3,
    name: "Machine",
    url: "/machine",
    icon: "machine",
  },
  {
    id: 4,
    name: "Inspection Type",
    url: "/inspection-type",
    icon: "inspection-type",
  },
];
