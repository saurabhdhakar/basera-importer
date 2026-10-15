import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { LocationSelection } from "@/components/LocationSelection";

afterEach(cleanup);
const search = () => screen.getByRole("searchbox", { name: "Search city, area or neighbourhood" });

describe("Location selection", () => {
  it("shows only states by default", () => {
    render(<LocationSelection onDone={vi.fn()} />);
    expect(screen.getByRole("button", { name: "Assam" })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Guwahati" })).not.toBeInTheDocument();
  });

  it("drills into a state's towns in order", () => {
    render(<LocationSelection onDone={vi.fn()} />);
    fireEvent.click(screen.getByRole("button", { name: "Assam" }));
    expect(screen.getByText("CHOOSE CITY")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "All in Assam" })).toBeInTheDocument();
    const rows = screen.getAllByRole("listitem");
    expect(rows[0]).toHaveTextContent("Abhayapuri");
    expect(rows[rows.length - 1]).toHaveTextContent("Umrangso");
  });

  it("finds Kailaras with district and state", () => {
    const onDone = vi.fn();
    const setItem = vi.spyOn(Storage.prototype, "setItem");
    render(<LocationSelection onDone={onDone} />);
    fireEvent.change(search(), { target: { value: "Kail" } });
    fireEvent.click(screen.getByRole("button", { name: "Kailaras, Morena, Madhya Pradesh" }));
    expect(setItem).toHaveBeenCalledWith("basera:location", "Kailaras, Morena, Madhya Pradesh");
    expect(onDone).toHaveBeenCalledTimes(1);
    setItem.mockRestore();
  });
});
