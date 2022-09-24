import { render, screen, fireEvent } from "@testing-library/react"
import React from "react"
import { Provider } from "react-redux"
import { store } from "../../Store/store"
import { MemoryRouter } from "react-router-dom"
import * as reactHooks from "../../hooks/redux"
import Settings from "../Settings"

jest.mock("../../hooks/redux")

const mockedSelector = jest.spyOn(reactHooks, "useAppSelector")
const mockedDispatch = jest.spyOn(reactHooks, "useAppDispatch")

beforeEach(() => {
    mockedDispatch.mockClear()
    mockedSelector.mockClear()
})

describe("Logout", () => {
    it("should create Logout component", () => {
        mockedSelector.mockReturnValue("")
        mockedDispatch.mockReturnValue(jest.fn())

        const component = render(
            <Provider store={store}>
                <MemoryRouter>
                    <Settings />
                </MemoryRouter>
            </Provider>
        )

        expect(component).toMatchSnapshot()
    })
})