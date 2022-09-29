export const mapResponseStatus = (arr, tasksFromBC) => {
    let StatusObj = {};
        for (let i = 0; i < arr.length; ++i) {
            if (arr[i] !== undefined) {
                StatusObj[arr[i].id] = arr[i]; // "3" = {id: 3, name: 'Progress2'}
                // delete StatusObj[arr[i].id]["priority"] // "3" = {id: 3, name: 'Progress2'}
                StatusObj[arr[i].id].id = String(StatusObj[arr[i].id].id) // "3" = {id: '3', name: 'Progress2'}

                let taskIdsArr = localStorage.getItem(`${arr[i].id}`) // "["1, 2"]"
                if (taskIdsArr && tasksFromBC[arr[i].id]) {
                    const TasksLS: string[] = JSON.parse(taskIdsArr) // ["1", "2"]
                    const arrOfTasksFromBC = tasksFromBC[arr[i].id] // ["2", "1", "3"]
                    const newArr: string[] = []

                    for (let j = 0; j < TasksLS.length; j++) {
                        if(arrOfTasksFromBC.includes(TasksLS[j])) {
                            newArr.push(TasksLS[j])
                        }
                    }
                    if(arrOfTasksFromBC.length !== newArr.length) {
                        for (let k = 0; k < arrOfTasksFromBC.length; k++) {
                            if(!newArr.includes(arrOfTasksFromBC[k])) {
                                newArr.push(arrOfTasksFromBC[k])
                            }
                        }
                    }

                    StatusObj[arr[i].id]["taskIds"] = newArr //"3" = {id: '3', name: 'Progress2', taskIds:["1","2","3"]}
                    localStorage.setItem(arr[i].id, JSON.stringify(newArr))
                } else if (!taskIdsArr && tasksFromBC[arr[i].id]) {
                    StatusObj[arr[i].id]["taskIds"] = tasksFromBC[arr[i].id] //"3" = {id: '3', name: 'Progress2', taskIds:["2", "1"]}
                    localStorage.setItem(arr[i].id, JSON.stringify(tasksFromBC[arr[i].id]))
                } else {
                    StatusObj[arr[i].id]["taskIds"] = [] //"3" = {id: '3', name: 'Progress2', taskIds:[]}
                    if(taskIdsArr) {
                        localStorage.removeItem(arr[i].id)
                    }
                }
            }
        }

        for (let key in {...localStorage}) {
            if (!isNaN(Number(key))) {
                if (!StatusObj[key]) {
                    localStorage.removeItem(key)
                }
            }
        }

    return StatusObj
}