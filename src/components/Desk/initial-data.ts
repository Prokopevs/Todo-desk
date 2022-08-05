const initialData = {
    tasks: {
      "0": { id: "0", content: "Take out the garbage and to some shit shit shit shit shitffsdafsda fsadfsadfsadfsad fdsafdsafsda fsdafdsafsdaf fasdfsda", priority: 0, isOpen: false },
      "1": { id: "1", content: "Watch my favorite", priority: 1, isOpen: false },
      "2": { id: "2", content: "Charge my phone Charge fuck you up ohoho", priority: 2, isOpen: false },
      "3": { id: "3", content: "fuck you up ohohofuck you up ohoho", priority: 4, isOpen: false },
    },
    columns: {
      "column-1": {
        id: "column-1",
        title: "To do",
        taskIds: ["0", "1"],
      },
      "column-2": {
        id: "column-2",
        title: "In progress",
        taskIds: [],
      },
      "column-3": {
        id: "column-3",
        title: "Done",
        taskIds: ["2", "3"],
      },
    },
    
    columnOrder: ["column-1", "column-2", "column-3"],
};
  
export default initialData;