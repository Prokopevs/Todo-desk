export const mapResponseStatus = (arr) => {
    let StatusObj = {};
        for (let i = 0; i < arr.length; ++i) {
            if (arr[i] !== undefined) {
                StatusObj[arr[i].id] = arr[i]; // "3" = {id: 3, name: 'Progress2'}
                // delete StatusObj[arr[i].id]["priority"] // "3" = {id: 3, name: 'Progress2'}
                StatusObj[arr[i].id].id = String(StatusObj[arr[i].id].id) // "3" = {id: '3', name: 'Progress2'}

                let taskIdsArr = localStorage.getItem(`${arr[i].id}`) // "["1,2"]"
                const newTaskIdsArr = taskIdsArr ? JSON.parse(taskIdsArr) : []
                StatusObj[arr[i].id]["taskIds"] = newTaskIdsArr //"3" = {id: '3', name: 'Progress2', taskIds:["1","2"]}
            }
        }
        console.log(StatusObj)
    return StatusObj
}