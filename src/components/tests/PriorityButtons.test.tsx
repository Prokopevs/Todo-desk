import { render, screen, fireEvent } from "@testing-library/react"
import React from "react"
import { Provider } from "react-redux"
import { store } from "../../Store/store"
import { MemoryRouter } from "react-router-dom"
import * as reactHooks from "../../hooks/redux"
import PriorityButtons from "../PriorityButtons"

jest.mock("../../hooks/redux")

const mockedSelector = jest.spyOn(reactHooks, "useAppSelector")
const mockedDispatch = jest.spyOn(reactHooks, "useAppDispatch")

beforeEach(() => {
    mockedDispatch.mockClear()
    mockedSelector.mockClear()
})

const setChangePriority = (...args: boolean[]) => {}

describe("PriorityButtons", () => {
    it("should create PriorityButtons component", () => {
        mockedSelector.mockReturnValue("")
        mockedDispatch.mockReturnValue(jest.fn())

        const component = render(
            <Provider store={store}>
                <MemoryRouter>
                    <PriorityButtons setChangePriority={setChangePriority} />
                </MemoryRouter>
            </Provider>
        )

        expect(component).toMatchSnapshot()
    })

    it("should dispatch action", () => {
        mockedDispatch.mockReturnValue(jest.fn())
        mockedSelector.mockReturnValue("")

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <PriorityButtons setChangePriority={setChangePriority} />
                </MemoryRouter>
            </Provider>
        )
        
        const priority = screen.getByRole("priority")
        fireEvent.click(priority)
        expect(mockedDispatch).toHaveBeenCalledTimes(1)
    })
})