import { STATUS } from "./constants";

export const treeData = [
  // Root 1: Work Projects
  {
    id: "root1",
    label: "Work Projects",
    status: STATUS.INDETERMINATE,
    children: [
      {
        id: "projectX",
        label: "Project X",
        status: STATUS.INDETERMINATE,
        children: [
          {
            id: "ux",
            label: "UX Design",
            status: STATUS.INDETERMINATE,
            children: [
              {
                id: "wireframes",
                label: "Wireframes.sketch",
                status: STATUS.CHECKED,
              },
              {
                id: "prototype",
                label: "Prototype.fig",
                status: STATUS.UNCHECKED,
              },
            ],
          },
        ],
      },
    ],
  },

  // Root 2: Personal Projects
  {
    id: "root2",
    label: "Personal Projects",
    status: STATUS.UNCHECKED,
    children: [
      {
        id: "photography",
        label: "Photography",
        status: STATUS.UNCHECKED,
        children: [
          {
            id: "editing",
            label: "Photo Editing",
            status: STATUS.UNCHECKED,
          },
          {
            id: "portfolio",
            label: "Portfolio Website",
            status: STATUS.UNCHECKED,
          },
        ],
      },
    ],
  },

  // Root 3: Learning
  {
    id: "root3",
    label: "Learning",
    status: STATUS.INDETERMINATE,
    children: [
      {
        id: "coding",
        label: "Coding Courses",
        status: STATUS.INDETERMINATE,
        children: [
          {
            id: "javascript",
            label: "JavaScript",
            status: STATUS.CHECKED,
          },
          {
            id: "python",
            label: "Python",
            status: STATUS.UNCHECKED,
          },
        ],
      },
      {
        id: "books",
        label: "Books",
        status: STATUS.INDETERMINATE,
        children: [
          {
            id: "designPatterns",
            label: "Design Patterns",
            status: STATUS.CHECKED,
          },
          {
            id: "dataScience",
            label: "Data Science",
            status: STATUS.UNCHECKED,
          },
        ],
      },
    ],
  },
];
