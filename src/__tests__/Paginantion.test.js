import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Pagination from "../components/common/Pagination";

describe("Pagination Component", () => {
  const mockOnPageChange = jest.fn();

  const defaultProps = {
    onPageChange: mockOnPageChange,
    totalCount: 20,
    siblingCount: 1,
    currentPage: 1,
    pageSize: 5,
    className: "test-pagination",
  };

  beforeEach(() => {
    mockOnPageChange.mockClear();
  });

  test("does not render pagination when currentPage is 0", () => {
    render(<Pagination {...defaultProps} currentPage={0} />);

    const pagination = screen.queryByRole("navigation");
    expect(pagination).toBeNull();
  });

  test("does not render pagination when pagination range has less than 2 items", () => {
    render(<Pagination {...defaultProps} currentPage={1} totalCount={1} />);

    const pagination = screen.queryByRole("navigation");
    expect(pagination).toBeNull();
  });

  test("renders pagination component with correct structure", () => {
    render(<Pagination {...defaultProps} />);

    const pagination = screen.getByRole("navigation", {
      name: "Pagination Navigation",
    });
    expect(pagination).toBeInTheDocument();

    const paginationItems = screen.getAllByRole("listitem");
    expect(paginationItems.length).toBeGreaterThan(0);

    const leftArrow = screen.getByText("<");
    const rightArrow = screen.getByText(">");

    expect(leftArrow).toBeInTheDocument();
    expect(rightArrow).toBeInTheDocument();
  });

  test("calls onPageChange when a page number is clicked", () => {
    render(<Pagination {...defaultProps} currentPage={1} totalCount={20} />);

    const page2 = screen.getByText("2");
    fireEvent.click(page2);
    expect(mockOnPageChange).toHaveBeenCalledWith(2);
  });

  test("calls onPageChange when next button is clicked", () => {
    render(<Pagination {...defaultProps} currentPage={2} />);

    const nextButton = screen.getByText(">");
    fireEvent.click(nextButton);

    expect(mockOnPageChange).toHaveBeenCalledWith(3);
  });

  test("calls onPageChange when previous button is clicked", () => {
    render(<Pagination {...defaultProps} currentPage={2} />);

    const previousButton = screen.getByText("<");
    fireEvent.click(previousButton);

    expect(mockOnPageChange).toHaveBeenCalledWith(1);
  });

  test("disables previous button on first page", () => {
    render(<Pagination {...defaultProps} currentPage={1} />);

    const previousButton = screen.getByText("<");
    expect(previousButton).toHaveClass("disabled");

    fireEvent.click(previousButton);
    expect(mockOnPageChange).not.toHaveBeenCalled();
  });

  test("disables next button on last page", () => {
    render(<Pagination {...defaultProps} currentPage={4} totalCount={20} />);

    const nextButton = screen.getByText(">");
    expect(nextButton).toHaveClass("disabled");

    fireEvent.click(nextButton);
    expect(mockOnPageChange).not.toHaveBeenCalled();
  });

  test("highlights current page correctly", () => {
    render(<Pagination {...defaultProps} currentPage={3} />);

    const currentPage = screen.getByText("3");
    expect(currentPage).toHaveClass("selected");
    expect(currentPage).toHaveAttribute("aria-current", "page");
  });

  test("renders dots when sibling count is used", () => {
    render(
      <Pagination
        {...defaultProps}
        totalCount={50}
        pageSize={5}
        siblingCount={1}
        currentPage={5}
      />
    );

    const dots = screen.getAllByText("…");
    expect(dots).toHaveLength(2);
  });

  test("renders right-side dots correctly", () => {
    render(
      <Pagination
        {...defaultProps}
        totalCount={50}
        pageSize={5}
        siblingCount={1}
        currentPage={1}
      />
    );
    const dots = screen.getAllByText("…");
    expect(dots).toHaveLength(1);
    expect(dots[0]).toHaveAttribute("aria-hidden", "true");
  });

  test("renders left-side dots correctly", () => {
    render(
      <Pagination
        {...defaultProps}
        totalCount={50}
        pageSize={5}
        siblingCount={1}
        currentPage={8}
      />
    );

    const dots = screen.getAllByText("…");
    expect(dots).toHaveLength(1);
    expect(dots[0]).toHaveAttribute("aria-hidden", "true");
  });

  test("does not render dots when totalCount fits in pagination range", () => {
    render(<Pagination {...defaultProps} totalCount={15} pageSize={5} />);

    const dots = screen.queryByText("…");
    expect(dots).not.toBeInTheDocument();
  });
});
