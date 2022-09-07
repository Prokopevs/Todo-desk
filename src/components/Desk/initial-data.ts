const initialData = {
    tasks: {
      "0": { id: "0", content: "Takeoutthegarbageandtosomeshitshitshitshitshitffsdafsdafsadfsadfsadfsad fdsafdsafsda fsdafdsafsdaf fasdfsda", priority: 1, isOpen: false },
      "1": { id: "1", content: "Watch my favorite", priority: 1, isOpen: false },
      "2": { id: "2", content: "Charge my phone", priority: 2, isOpen: false },
      "3": { id: "3", content: "fuck you up ohohofuck you up ohoho", priority: 4, isOpen: false },
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
        taskIds: [],
      },
      "3": {
        id: "3",
        name: "Done",
        taskIds: ["2", "3"],
      },
      "4": {
        id: "4",
        name: "Done",
        taskIds: [],
      },
    },
    
    columnOrder: ["1", "2", "3", "4"],
};
  
export default initialData;