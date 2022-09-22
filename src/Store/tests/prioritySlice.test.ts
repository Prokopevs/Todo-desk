import prioritySlice, { setPriority } from "../reducers/priority/slice";

describe("prioritySlice", () => {
  it("should return state when passed an empty action", () => {
    const result = prioritySlice(undefined, { type: ""})

    expect(result).toEqual({ priority: 3 })
  });

  it('should change priority with "setPriority" action', () => {
    const action = { type: setPriority.type, payload: 2}
    
    const result = prioritySlice({ priority: 3 }, action)

    expect(result).toEqual({ priority: 2 })
  });
})
