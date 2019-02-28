import React from "react"
import { shallow } from "enzyme"
import App from "./App"

describe("Currency Exchange App Test", () => {
  let wrapper 
  beforeEach(() => {
    wrapper = shallow(<App/>)
  })
  it("should render without crashing", () => {
    shallow(<App/>)
  })
  it("should have active currency `select` element and active currency value element", () => {
    expect(wrapper.find("select#active-currency").length).toBe(1)
    expect(wrapper.find("input#active-currency-input").length).toBe(1)
  })
  it("should have list of currency with class `list-grouop` element", () => {
    expect(wrapper.find(".list-group").length).toBe(1)
  })
  it("should have add more currencies button", () => {
    expect(wrapper.containsMatchingElement(<button>(+) Add More Currencies</button>)).toBe(true)
  })
})
