import { render, screen } from "@testing-library/react";
import App from "../App.js";

jest.mock("../components/Fund", () => () => (
  <div data-testid="fund">Fund Component</div>
));

describe("App Component", () => {
  test("renders the App component", () => {
    render(<App />);
    const fundComponent = screen.getByTestId("fund");
    expect(fundComponent).toBeInTheDocument();
  });

  test("renders the Fund component within App", () => {
    render(<App />);
    const fundComponent = screen.getByTestId("fund");
    expect(fundComponent).toBeInTheDocument();
  });
});
