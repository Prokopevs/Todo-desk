export const mapResponseTasks = (arr) => {
    let allTasks = {}
    let taskObj = {};
        for (let i = 0; i < arr.length; ++i) {
            if (arr[i] !== undefined) {
                taskObj[arr[i].id] = arr[i]; // '2' = {id: 2, content: 'do something ', priority: 3, status_id: 6}
                // delete taskObj[arr[i].id]["status_id"] // '2' = {id: 2, content: 'do something', priority: 3}
                taskObj[arr[i].id].id = String(taskObj[arr[i].id].id) // '2' = {id: 2, content: 'do something', priority: 3}
                taskObj[arr[i].id]["isOpen"] = false // '2' = {id: 2, content: 'do something', priority: 3, isOpen: false}

                if (allTasks[arr[i].status_id]) {
                    const newArr = [...allTasks[arr[i].status_id], ...[arr[i].id]]
                    allTasks[arr[i].status_id] = newArr // 86: ["56", "57"]
                } else {
                    allTasks[arr[i].status_id] = [arr[i].id] // 86: ["56"]
                }
            }
        }
    return [taskObj, allTasks]
}