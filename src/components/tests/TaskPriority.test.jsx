import React from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import priorityArray from "../../data/Desk/priorityArray"
import Task from "../Desk/Task"
import { MemoryRouter } from "react-router-dom"
import { Provider } from "react-redux"
import { store } from "../../Store/store"
import "@testing-library/jest-dom"
import * as reactHooks from "../../hooks/redux"
import TaskPriority from "../Desk/Task/TaskContent/TaskContentEditMode/TaskPriority"

const TaskObj = {
    id: "1",
    content: "Watch my favorite",
    priority: 1,
    isOpen: false,
}

jest.mock("../../hooks/redux")

const mockedDispatch = jest.spyOn(reactHooks, "useAppDispatch")

beforeEach(() => {
    mockedDispatch.mockClear()
})

describe("TaskPriority", () => {
    it("should create TaskSelect component", () => {
        mockedDispatch.mockReturnValue(jest.fn())

        const component = render(
            <Provider store={store}>
                <MemoryRouter>
                    <TaskPriority task={TaskObj} priorityArray={priorityArray} />
                </MemoryRouter>
            </Provider>
        )

        expect(component).toMatchSnapshot()
    });

    it("EditMode click event", () => {
        mockedDispatch.mockReturnValue(jest.fn())

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <TaskPriority task={TaskObj} priorityArray={priorityArray} />
                </MemoryRouter>
            </Provider>
        )

        const btn = screen.getByTestId("toggle-btn")
        fireEvent.click(btn)
        expect(mockedDispatch).toHaveBeenCalledTimes(1)
    })
})
