import React from "react"
import { shallow } from "enzyme"
import App from "./App"

it("renders without crashing", () => {
  shallow(<App />)
})

it("should have element with `container` class", () => {
  const wrapper = shallow(<App/>)
  wrapper.contains
})
