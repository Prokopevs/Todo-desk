const initialData = {
    tasks: {
      "0": { id: "0", content: "You can Drag-and-drop it", priority: 1, isOpen: false },
      "1": { id: "1", content: "Try to drag Try to drag Try to drag Try to drag", priority: 3, isOpen: false },
      "2": { id: "2", content: "You can also click on the status name to add a status or long press on it to change its name", priority: 2, isOpen: false },
      "3": { id: "3", content: "Hover over and try to change the priority and task text", priority: 4, isOpen: false },
      "4": { id: "4", content: "Simplicity is the ultimate sophistication (Leonardo da Vinci)", priority: 5, isOpen: false },
      "5": { id: "5", content: "Сlick on the plus to add a task", priority: 2, isOpen: false },
    },
    columns: {
      "1": {
        id: "1",
        name: "To do",
        taskIds: ["0", "1"],
      },
      "2": {
        id: "2",
        name: "In progress",
        taskIds: ["3", "4", "5"],
      },
      "3": {
        id: "3",
        name: "Done",
        taskIds: ["2"],
      },
    },
    columnOrder: ["1", "2", "3"]
};
  
export default initialData;