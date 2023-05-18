import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import EventTable from "../src/app/EventTable";

describe("EventTable", () => {
  it("renders EventTable", () => {
    render(<EventTable />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });
});
