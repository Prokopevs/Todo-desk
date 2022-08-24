import initialData from "../../components/Desk/initial-data";
import dndSlice, { setStatuses } from "../reducers/dndSlice"

const initialState = {
    data: initialData,
    result: {
        destination: {
            droppableId: "",
            index: null
        },
        source: {
            index: null, 
            droppableId: ""
        },
        draggableId: "",
    },
    start: {
        id: "",
        name: "",
        taskIds: [],
    },
    finish: {
        id: "",
        name: "",
        taskIds: [],
    },
    activePen: false,
    lineArrays: {
        firstArray: [],
        secondArray: [],
    },
    queryFlag: false,
}

describe("dndSlice", () => {
  it("should return state when passed an empty action", () => {
    const result = dndSlice(undefined, { type: ""})

    expect(result).toEqual(initialState)
  });

  it('should add status in array with "setStatuses" action', () => {

    const action = { type: setStatuses.type, payload: { "7": {id: "7", name: "hello", taskIds: [] }}}

    const result = dndSlice(initialState, action)

    expect(result.data.columns["7"]).toEqual({id: "7", name: "hello", taskIds: [] })
  });

})