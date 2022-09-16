import { reorderTaskInDifferentStatus, reorderTaskInOwnStatus, setFinish, setResult, setStart } from "../../Store/reducers/dnd/slice"

export const onDragEnd = (result, dispatch, data, isAuth) => {
    const { destination, source, draggableId } = result
    dispatch(setResult(result))

    if (!destination) {
        return
    }

    if (
        destination.droppableId === source.droppableId &&
        destination.index === source.index
    ) {
        return
    }

    const start = data.columns[source.droppableId] // в каком статусе была взята таска
    const finish = data.columns[destination.droppableId] // куда отправилась таска
    dispatch(setStart(start))
    dispatch(setFinish(finish))

    // Moving in one list
    if (start === finish) {
        dispatch(reorderTaskInOwnStatus(isAuth))
        return
    }

    // Moving from one list to another
    dispatch(reorderTaskInDifferentStatus())
}