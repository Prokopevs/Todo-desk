export const mapResponseStatus = (arr, tasksFromBC) => {
    let StatusObj = {};
        for (let i = 0; i < arr.length; ++i) {
            if (arr[i] !== undefined) {
                StatusObj[arr[i].id] = arr[i]; // "3" = {id: 3, name: 'Progress2'}
                // delete StatusObj[arr[i].id]["priority"] // "3" = {id: 3, name: 'Progress2'}
                StatusObj[arr[i].id].id = String(StatusObj[arr[i].id].id) // "3" = {id: '3', name: 'Progress2'}

                let taskIdsArr = localStorage.getItem(`${arr[i].id}`) // "["1,2"]"
                if (taskIdsArr && tasksFromBC[arr[i].id]) {
                    const TasksLS = JSON.parse(taskIdsArr) // ["61", "60"]
                    const arrOfTasksFromBC = tasksFromBC[arr[i].id] // ["60", "61"]
                    const newArr = []

                    for (let j = 0; j < TasksLS.length; j++) {
                        if(arrOfTasksFromBC.includes(TasksLS[j])) {
                            newArr.push(TasksLS[j])
                        }
                    }

                    StatusObj[arr[i].id]["taskIds"] = newArr //"3" = {id: '3', name: 'Progress2', taskIds:["1","2"]}
                    localStorage.setItem(arr[i].id, JSON.stringify(newArr))
                } else {
                    StatusObj[arr[i].id]["taskIds"] = [] //"3" = {id: '3', name: 'Progress2', taskIds:[]}
                    if(taskIdsArr) {
                        localStorage.removeItem(arr[i].id)
                    }
                }
            }
        }

    return StatusObj
}