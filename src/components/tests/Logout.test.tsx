import { render } from "@testing-library/react"
import { screen, fireEvent } from "@testing-library/dom"
import React from "react"
import * as reduxHooks from "../../hooks/redux"
import { Provider } from "react-redux"
import * as actions from "../../Store/reducers/authorizationSlice"
import { store } from "../../Store/store"
import Logout from "../Logout"
import { MemoryRouter } from "react-router-dom"

jest.mock("react-redux")
const mockedDispatch = jest.spyOn(reduxHooks, "useAppDispatch")

describe("Logout", () => {
    it("should create Logout component", () => {
        mockedDispatch.mockReturnValue(jest.fn())

        const component = render(
            <Provider store={store}>
                <MemoryRouter>
                    <Logout />
                </MemoryRouter>
            </Provider>
        )

        expect(component).toMatchSnapshot()
    })

    // it("should dispatch action", () => {
    //     const dispatch = jest.fn()
    //     mockedDispatch.mockReturnValue(dispatch)

    //     render(
    //         <Provider store={store}>
    //             <MemoryRouter>
    //                 <Logout />
    //             </MemoryRouter>
    //         </Provider>
    //     )

    //     fireEvent.click(screen.getByRole("button"))

    //     expect(dispatch).toHaveBeenCalled()
    // })
})
