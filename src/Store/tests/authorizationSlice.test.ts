import authorizationSlice from "../reducers/authorization/slice";

const initialState = {
    user: {
        id: null,
        email: "",
        emailConfirmed: false,
        name: "",
        taskTTL: null
    },
    isAuth: false,
    isLoading: true,
    rememberMe: false,
}

describe("authorizationSlice", () => {
  it("should return state when passed an empty action", () => {
    const result = authorizationSlice(undefined, { type: ""})

    expect(result).toEqual(initialState)
  });

})