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

  it("selects Chandigarh localities and returns to the state list", () => {
    const onDone = vi.fn();
    render(<LocationSelection onDone={onDone} />);
    fireEvent.click(screen.getByRole("button", { name: "Chandigarh", exact: true }));
    fireEvent.click(screen.getByRole("button", { name: "Back to states" }));
    expect(screen.getByRole("button", { name: "Dadra & Nagar Haveli", exact: true })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Chandigarh", exact: true }));
    fireEvent.change(search(), { target: { value: "Sector 10B" } });
    fireEvent.click(screen.getByRole("button", { name: "Sector 10B, Chandigarh", exact: true }));
    expect(window.localStorage.getItem("basera:location")).toBe("Sector 10B, Chandigarh");
    expect(onDone).toHaveBeenCalledTimes(1);
  });

  it("keeps duplicate Bihar choices selectable after search and clearing", () => {
    const onDone = vi.fn();
    render(<LocationSelection onDone={onDone} />);
    fireEvent.click(screen.getByRole("button", { name: "Bihar", exact: true }));
    expect(screen.getAllByRole("button", { name: "Nawada", exact: true })).toHaveLength(2);
    fireEvent.change(search(), { target: { value: "Nawada" } });
    expect(screen.getAllByRole("button", { name: "Nawada, Bihar", exact: true })).toHaveLength(2);
    fireEvent.change(search(), { target: { value: "" } });
    fireEvent.click(screen.getAllByRole("button", { name: "Nawada", exact: true })[1]);
    expect(window.localStorage.getItem("basera:location")).toBe("Nawada, Bihar");
    expect(onDone).toHaveBeenCalledTimes(1);
  });
});
