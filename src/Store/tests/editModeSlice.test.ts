import editModeSlice, { deleteTaskInEditArray, setOpacityButtons } from "../reducers/editMode/slice";

const initialState = {
    editArray: [], // для отключения dragable
    queryLoading: false,
    prevTaskObj: {
        "": { id: "", priority: null, content: ""}
    },
    successTasksAfterSagaRequest: [],  
    opacityButtons: {
        delete: [],
        apply: []
    },
    selectedStatus: "",
    tasksFromBC: {
        "": []
    },
    editStatus: []
}

describe("editModeSlice", () => {
  it("should return state when passed an empty action", () => {
    const result = editModeSlice(undefined, { type: ""})

    expect(result).toEqual(initialState)
  });

  it('should change priority with "setPriority" action', () => {
    const initialState = {
        editArray: [], 
        queryLoading: false,
        prevTaskObj: {
            "": { id: "", priority: null, content: ""}
        },
        successTasksAfterSagaRequest: [],   
        opacityButtons: {
            delete: [],
            apply: []
        },
        selectedStatus: "",
        tasksFromBC: {
            "": []
        },
        editStatus: []
    }

    const action = { type: deleteTaskInEditArray.type, payload: "2"}
    editModeSlice(initialState, action)

    expect(initialState.editArray).toEqual([])
  });

  it('should add task in array with "setOpacityButtons" action', () => {
    const State = {
        editArray: [], 
        queryLoading: false,
        prevTaskObj: {
            "": { id: "", priority: null, content: ""}
        },
        successTasksAfterSagaRequest: [],   
        opacityButtons: {
            delete: ["1"],
            apply: []
        },
        selectedStatus: "",
        tasksFromBC: {
            "": []
        },
        editStatus: []
    }

    const action = { type: setOpacityButtons.type, payload: { arrName: "delete", id: "2" }}

    const result = editModeSlice(State, action)

    expect(result.opacityButtons["delete"]).toEqual(["1", "2"])
  });

})