import errorMessageSlice, { deleteErrorTaskInfo, setErrorInfo, setErrorTaskInfo, setGlobalErrorMessage } from "../reducers/errorMessage/slice";

const initialState = {
    globalErrorMessage: "",
    errorInfo: "",
    errorInfoStatusName: {
        "": {id: "", message: ""} 
    },
    errorTaskInfo: {
        "": {id: "", message: ""} 
    },
    errorStatusInfo: {
        "": {id: "", message: ""} 
    }
}

describe("errorMessageSlice", () => {
  it("should return state when passed an empty action", () => {
    const result = errorMessageSlice(undefined, { type: ""})

    expect(result).toEqual( initialState )
  });

  it('should set globalErrorMessage with "setGlobalErrorMessage" action', () => {
    const action = { type: setGlobalErrorMessage.type, payload: {status: "error text", statusText: 404}}
    
    const result = errorMessageSlice(initialState, action)

    expect(result.globalErrorMessage).toBe("error text404")
  });

  it('should set errorInfo with "setErrorInfo" action', () => {
    const action = { type: setErrorInfo.type, payload: "error"}
    
    const result = errorMessageSlice(initialState, action)

    expect(result.errorInfo).toBe("error")
  });

  it('should set errorTaskInfo with "setErrorTaskInfo" action', () => {
    const action = { type: setErrorTaskInfo.type, payload: { id: "123", message: "error" }}
    
    const result = errorMessageSlice(initialState, action)

    expect(result.errorTaskInfo["123"]).toEqual({ id: "123", message: "error" })
  });

  it('should delete errorTaskInfo with "deleteErrorTaskInfo" action', () => {
    const initialState = {
        globalErrorMessage: "",
        errorInfo: "",
        errorInfoStatusName: {
            "": {id: "", message: ""} 
        },
        errorTaskInfo: {
            "1": {id: "1", message: "error"} 
        },
        errorStatusInfo: {
            "": {id: "", message: ""} 
        }
    }

    const action = { type: deleteErrorTaskInfo.type, payload: "1"}
    
    const result = errorMessageSlice(initialState, action)

    expect(result.errorTaskInfo).toEqual({ })
  });
})