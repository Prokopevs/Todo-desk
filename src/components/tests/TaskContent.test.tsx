import { render, screen, fireEvent } from "@testing-library/react"
import React from "react"
import { Provider } from "react-redux"
import { store } from "../../Store/store"
import { MemoryRouter } from "react-router-dom"
import * as reactHooks from "../../hooks/redux"
import TasksContent from "../Desk/Task/TaskContent"
import priorityArray from "../../data/Desk/priorityArray"

jest.mock("../../hooks/redux")

const mockedSelector = jest.spyOn(reactHooks, "useAppSelector")
const mockedDispatch = jest.spyOn(reactHooks, "useAppDispatch")

beforeEach(() => {
    mockedDispatch.mockClear()
    mockedSelector.mockClear()
})

const columnObj = { id: "1", name: "Todo", taskIds: ["1"] }
const taskObj = { id: "1", content: "Watch my favorite", priority: 1, isOpen: false }
const setEditMod = (...args: boolean[]) => {}

describe("TaskContent", () => {
    it("should create TaskContent component", () => {
        mockedSelector.mockReturnValue("")
        mockedDispatch.mockReturnValue(jest.fn())

        const component = render(
            <Provider store={store}>
                <MemoryRouter>
                    <TasksContent
                        task={taskObj}
                        editMode={true}
                        priorityArray={priorityArray}
                        column={columnObj}
                        setEditMod={setEditMod}
                    />
                </MemoryRouter>
            </Provider>
        )

        expect(component).toMatchSnapshot()
    })
})
