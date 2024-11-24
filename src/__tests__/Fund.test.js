import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Fund from "../components/Fund";
jest.mock("../data/frontend-assignment.json", () => [
  { "s.no": 1, "percentage.funded": "50", "amt.pledged": "5000" },
  { "s.no": 2, "percentage.funded": "30", "amt.pledged": "3000" },
  { "s.no": 3, "percentage.funded": "20", "amt.pledged": "2000" },
  { "s.no": 4, "percentage.funded": "60", "amt.pledged": "6000" },
  { "s.no": 5, "percentage.funded": "70", "amt.pledged": "7000" },
  { "s.no": 6, "percentage.funded": "80", "amt.pledged": "8000" },
  { "s.no": 7, "percentage.funded": "90", "amt.pledged": "9000" },
  { "s.no": 8, "percentage.funded": "100", "amt.pledged": "10000" },
]);

describe("Fund Component", () => {
  test("renders table and pagination correctly", () => {
    render(<Fund />);

    // Check if the Fund heading is rendered
    expect(screen.getByText(/Percentage funded/i)).toBeInTheDocument();

    // Check if table is rendered with the correct number of rows (5 rows)
    const tableRows = screen.getAllByRole("row");
    expect(tableRows.length).toBe(6); // Including header row (5 data rows)

    // Check if the pagination component is rendered
    const pagination = screen.getByRole("navigation", {
      name: /Pagination Navigation/i,
    });
    expect(pagination).toBeInTheDocument();
  });

  test("clicking next button changes page and updates table data", () => {
    render(<Fund />);
    const initialTableRows = screen.getAllByRole("row");
    expect(initialTableRows.length).toBe(6);
    const nextButton = screen.getByText(/>/);
    fireEvent.click(nextButton);
    const newTableRows = screen.getAllByRole("row");
    expect(newTableRows.length).toBe(4);
    expect(screen.getByText("6")).toBeInTheDocument();
    expect(screen.getByText("7")).toBeInTheDocument();
    expect(screen.getByText("8")).toBeInTheDocument();
  });

  test("clicking previous button changes page and updates table data", () => {
    render(<Fund />);
    const initialTableRows = screen.getAllByRole("row");
    expect(initialTableRows.length).toBe(6);
    const nextButton = screen.getByText(/>/); // Find next button
    fireEvent.click(nextButton);

    const newTableRows = screen.getAllByRole("row");
    expect(newTableRows.length).toBe(4);

    expect(screen.getByText("6")).toBeInTheDocument();
    expect(screen.getByText("7")).toBeInTheDocument();
    expect(screen.getByText("8")).toBeInTheDocument();

    const previousButton = screen.getByText(/</);
    fireEvent.click(previousButton);
    const tableRowsAfterPrevious = screen.getAllByRole("row");
    expect(tableRowsAfterPrevious.length).toBe(6);
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  test("previous button has 'disabled' class on first page", () => {
    render(<Fund />);
    const previousButton = screen.getByText(/</);
    expect(previousButton).toHaveClass("disabled");

    fireEvent.click(previousButton);
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  test("next button has 'disabled' class on the last page", () => {
    render(<Fund />);
    const nextButton = screen.getByText(/>/);
    fireEvent.click(nextButton);
    const nextButtonDisabled = screen.getByText(/>/);
    expect(nextButtonDisabled).toHaveClass("disabled");

    fireEvent.click(nextButtonDisabled);
    expect(screen.getByText("7")).toBeInTheDocument();
  });
});
