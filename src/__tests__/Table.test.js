import React from "react";
import { render, screen } from "@testing-library/react";
import Table from "../components/common/Table";

const mockData = [
  { "s.no": 1, "percentage.funded": "50", "amt.pledged": "1500" },
  { "s.no": 2, "percentage.funded": "80", "amt.pledged": "1800" },
  { "s.no": 3, "percentage.funded": "90", "amt.pledged": "900" },
];

describe("Table Component", () => {
  test("renders table headers correctly", () => {
    render(<Table data={mockData} />);

    expect(screen.getByText(/S.No./i)).toBeInTheDocument();
    expect(screen.getByText(/Percentage funded/i)).toBeInTheDocument();
    expect(screen.getByText(/Amount pledged/i)).toBeInTheDocument();
  });

  test("renders table rows based on data", () => {
    render(<Table data={mockData} />);
    const rows = screen.getAllByRole("row");
    expect(rows).toHaveLength(mockData.length + 1);
  });

  test("renders correct data in table cells", () => {
    render(<Table data={mockData} />);
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("50")).toBeInTheDocument();
    expect(screen.getByText("1500")).toBeInTheDocument();

    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("80")).toBeInTheDocument();
    expect(screen.getByText("1800")).toBeInTheDocument();

    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("90")).toBeInTheDocument();
    expect(screen.getByText("900")).toBeInTheDocument();
  });

  test("renders empty state when data is empty", () => {
    render(<Table data={[]} />);
    const rows = screen.getAllByRole("row");
    expect(rows).toHaveLength(1);
  });
});
