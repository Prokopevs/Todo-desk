import errorMessageSlice, { setGlobalErrorMessage, setErrorInfo, deleteErrorInfo, setErrorTaskInfo, deleteErrorTaskInfo } from "../reducers/errorMessageSlice"

const initialState = {
    globalErrorMessage: "",
    errorInfo: "",
    errorTaskInfo: {
        "": {id: "", message: ""} 
    }
}

describe("errorMessageSlice", () => {
  it("should return state when passed an empty action", () => {
    const result = errorMessageSlice(undefined, { type: ""})

    expect(result).toEqual( initialState )
  });

  it('should set globalErrorMessage with "setGlobalErrorMessage" action', () => {
    const action = { type: setGlobalErrorMessage.type, payload: "error text"}
    
    const result = errorMessageSlice(initialState, action)

    expect(result.globalErrorMessage).toBe("error text")
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
        errorTaskInfo: {
            "1": {id: "1", message: "error ohh noo"} 
        }
    }

    const action = { type: deleteErrorTaskInfo.type, payload: "1"}
    
    const result = errorMessageSlice(initialState, action)

    expect(result.errorTaskInfo).toEqual({ })
  });
})