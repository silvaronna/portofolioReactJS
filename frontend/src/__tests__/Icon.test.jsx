import { render, screen } from "@testing-library/react"
import Icon from "../components/ui/Icon"
import "@testing-library/jest-dom"
import jest from "jest" // Import jest here to declare the variable

describe("Icon component", () => {
  test("renders the correct Lucide icon based on name prop", () => {
    render(<Icon name="Mail" data-testid="mail-icon" />)
    const mailIcon = screen.getByTestId("mail-icon")
    expect(mailIcon).toBeInTheDocument()
    // Check if the SVG element for Mail icon is present (Lucide Mail icon typically has a path or specific structure)
    expect(
      mailIcon.querySelector('path[d*="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"]'),
    ).toBeInTheDocument()
  })

  test("passes additional props to the icon component", () => {
    render(<Icon name="Check" className="text-green-500" size={32} data-testid="check-icon" />)
    const checkIcon = screen.getByTestId("check-icon")
    expect(checkIcon).toHaveClass("text-green-500")
    expect(checkIcon).toHaveAttribute("width", "32")
    expect(checkIcon).toHaveAttribute("height", "32")
  })

  test("renders null and logs warning for invalid icon name", () => {
    // Use global `jest` object directly
    const consoleWarnSpy = jest.spyOn(console, "warn").mockImplementation(() => {})
    render(<Icon name="NonExistentIcon" />)
    expect(screen.queryByTestId("non-existent-icon")).toBeNull()
    expect(consoleWarnSpy).toHaveBeenCalledWith('Icon "NonExistentIcon" not found in Lucide icons')
    consoleWarnSpy.mockRestore()
  })
})
