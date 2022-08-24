import authorizationSlice, { } from "../reducers/authorizationSlice"

const initialState = {
    user: {
      id: null,
      email: "",
      emailConfirmed: false,
      name: "",
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