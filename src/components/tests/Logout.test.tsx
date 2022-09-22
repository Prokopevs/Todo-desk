// import { render, screen, fireEvent } from "@testing-library/react"
// import React from "react"
// import { Provider } from "react-redux"
// import { store } from "../../Store/store"
// import Logout from "../Logout"
// import { MemoryRouter } from "react-router-dom"
// import * as reactHooks from "../../hooks/redux"

// jest.mock("../../hooks/redux")

// const mockedSelector = jest.spyOn(reactHooks, "useAppSelector")
// const mockedDispatch = jest.spyOn(reactHooks, "useAppDispatch")

// beforeEach(() => {
//     mockedDispatch.mockClear()
//     mockedSelector.mockClear()
// })

// describe("Logout", () => {
//     it("should create Logout component", () => {
//         mockedSelector.mockReturnValue("")
//         mockedDispatch.mockReturnValue(jest.fn())

//         const component = render(
//             <Provider store={store}>
//                 <MemoryRouter>
//                     <Logout />
//                 </MemoryRouter>
//             </Provider>
//         )

//         expect(component).toMatchSnapshot()
//     })

//     it("should dispatch action", () => {
//         mockedDispatch.mockReturnValue(jest.fn())
//         mockedSelector.mockReturnValue("")

//         render(
//             <Provider store={store}>
//                 <MemoryRouter>
//                     <Logout />
//                 </MemoryRouter>
//             </Provider>
//         )
        
//         const button = screen.getByRole("button")
//         fireEvent.click(button)
//         expect(mockedDispatch).toHaveBeenCalled()
//     })
// })