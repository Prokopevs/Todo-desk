import React from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import Task from "../Desk/Task"
import { MemoryRouter } from "react-router-dom"
import { Provider } from "react-redux"
import { store } from "../../Store/store"
import "@testing-library/jest-dom"
import * as reactHooks from "../../hooks/redux"

const obj = {
    id: "1",
    name: "Todo",
    taskIds: ["1"],
}
const taskObj = { id: "1", content: "Watch my favorite", priority: 1, isOpen: false }

jest.mock("../../hooks/redux")

const mockedSelector = jest.spyOn(reactHooks, "useAppSelector")
const mockedDispatch = jest.spyOn(reactHooks, "useAppDispatch")

beforeEach(() => {
    mockedDispatch.mockClear()
    mockedSelector.mockClear()
})

describe("EditMode click event", () => {
    it("EditMode click event", () => {
        mockedSelector.mockReturnValue("")
        mockedDispatch.mockReturnValue(jest.fn())

        const component = render(
            <Provider store={store}>
                <MemoryRouter>
                    <Task
                        task={taskObj}
                        column={obj}
                        hover={"1"}
                    />
                </MemoryRouter>
            </Provider>
        )

        expect(component).toMatchSnapshot()
        const btn = screen.getByTestId("toggle-btn")
        const textarea = screen.queryByTestId("textarea")

        expect(textarea).toBeNull()

        fireEvent.click(btn)
        expect(screen.getByRole("textarea")).toBeInTheDocument()
    })
})
