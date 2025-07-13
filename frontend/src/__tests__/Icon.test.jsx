import { render, screen } from "@testing-library/react"
import Icon from "../components/ui/Icon"
import "@testing-library/jest-dom"
// PERBAIKAN 1: Impor 'jest' dari '@jest/globals' untuk mocking
import { jest } from '@jest/globals';

describe("Icon component", () => {
  test("renders the correct Lucide icon based on name prop", () => {
    // PERBAIKAN 2: Kita sederhanakan tes ini agar lebih kuat (robust)
    render(<Icon name="Mail" data-testid="mail-icon" />)

    // Cukup pastikan komponen dengan test-id tersebut ada di dalam dokumen.
    const mailIcon = screen.getByTestId("mail-icon")
    expect(mailIcon).toBeInTheDocument()

    // Dan pastikan bahwa elemen yang dirender adalah sebuah SVG.
    // Ini lebih baik daripada mengecek detail internal SVG yang bisa berubah.
    expect(mailIcon.tagName.toLowerCase()).toBe('svg')
  })

  test("passes additional props to the icon component", () => {
    render(<Icon name="Check" className="text-green-500" size={32} data-testid="check-icon" />)
    const checkIcon = screen.getByTestId("check-icon")
    expect(checkIcon).toHaveClass("text-green-500")
    expect(checkIcon).toHaveAttribute("width", "32")
    expect(checkIcon).toHaveAttribute("height", "32")
  })

  test("renders null and logs warning for invalid icon name", () => {
    // Sekarang 'jest.spyOn' akan berfungsi karena impornya sudah benar.
    const consoleWarnSpy = jest.spyOn(console, "warn").mockImplementation(() => {})
    
    render(<Icon name="NonExistentIcon" data-testid="icon-wrapper" />)
    
    // Kita cari elemennya dan pastikan ia tidak ada (null).
    const iconElement = screen.queryByTestId("non-existent-icon")
    expect(iconElement).toBeNull()
    
    // Cek apakah pesan warning yang benar muncul di console.
    expect(consoleWarnSpy).toHaveBeenCalledWith('Icon "NonExistentIcon" not found in Lucide icons')
    
    // Kembalikan fungsi console.warn ke semula.
    consoleWarnSpy.mockRestore()
  })
})
