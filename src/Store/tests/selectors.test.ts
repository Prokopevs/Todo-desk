import { selectAuthorization, selectError, selectDnd, selectEditMode } from "../selectors"

describe("redux selectors", () => {
    it("should select authorizationSlice from state object", () => {
        const authorizationSlice = { id: 123, email: "123@mail.ru", emailConfirmed: false, name: "Tommy" } 

        const result = selectAuthorization({ authorizationSlice })

        expect(result).toEqual(authorizationSlice)
    });

    it("should select selectError from state object", () => {
        const errorMessageSlice = "error"
        const result = selectError({ errorMessageSlice })

        expect(result).toEqual(errorMessageSlice)
    });

    it("should select selectError from state object", () => {
        const dndSlice = {
            firstArray: [1, 2],
            secondArray: [3, 4]
        }
        const result = selectDnd({ dndSlice })

        expect(result).toEqual(dndSlice)
    });

    it("should select selectEditMode from state object", () => {
        const editModeSlice = ["1", "2"]
        const result = selectEditMode({ editModeSlice })

        expect(result).toEqual(editModeSlice)
    });
})
