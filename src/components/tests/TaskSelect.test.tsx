import { render, screen, fireEvent } from "@testing-library/react"
import React from "react"
import { Provider } from "react-redux"
import { store } from "../../Store/store"
import { MemoryRouter } from "react-router-dom"
import * as reactHooks from "../../hooks/redux"
import TaskSelect from "../Desk/Task/TaskContent/TaskContentEditMode/TaskSelect"
jest.mock("../../hooks/redux")

const mockedSelector = jest.spyOn(reactHooks, "useAppSelector")
const mockedDispatch = jest.spyOn(reactHooks, "useAppDispatch")

beforeEach(() => {
    mockedDispatch.mockClear()
    mockedSelector.mockClear()
})

const columnObj = {
    id: "1",
    name: "Todo",
    taskIds: ["1"],
}

const TaskObj = {
    id: "1",
    content: "Watch my favorite",
    priority: 1,
    isOpen: false,
}

describe("TaskSelect", () => {
    it("should create TaskSelect component", () => {
        mockedSelector.mockReturnValue("")
        mockedDispatch.mockReturnValue(jest.fn())

        const component = render(
            <Provider store={store}>
                <MemoryRouter>
                    <TaskSelect task={TaskObj} isValid={true} column={columnObj} />
                </MemoryRouter>
            </Provider>
        )

        expect(component).toMatchSnapshot()
    })
})
