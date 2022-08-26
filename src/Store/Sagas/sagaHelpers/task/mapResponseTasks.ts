export const mapResponseTasks = (arr) => {
    let taskObj = {};
        for (let i = 0; i < arr.length; ++i) {
            if (arr[i] !== undefined) {
                taskObj[arr[i].id] = arr[i]; // '2' = {id: 2, content: 'do something ', priority: 3, status_id: 6}
                // delete taskObj[arr[i].id]["status_id"] // '2' = {id: 2, content: 'do something', priority: 3}
                taskObj[arr[i].id].id = String(taskObj[arr[i].id].id) // '2' = {id: 2, content: 'do something', priority: 3}
                taskObj[arr[i].id]["isOpen"] = false // '2' = {id: 2, content: 'do something', priority: 3, isOpen: false}
            }
        }
    return taskObj
}