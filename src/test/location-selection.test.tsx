import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { LocationSelection } from "@/components/LocationSelection";

afterEach(cleanup);

describe("Location selection", () => {
  it("proceeds when a popular city is chosen", () => {
    const onDone = vi.fn();
    render(<LocationSelection onDone={onDone} />);
    fireEvent.click(screen.getByRole("button", { name: "Mumbai" }));
    expect(onDone).toHaveBeenCalledTimes(1);
  });

  it("filters the city grid by the search query", () => {
    render(<LocationSelection onDone={vi.fn()} />);
    fireEvent.change(screen.getByRole("textbox", { name: "Search your city" }), { target: { value: "mum" } });
    expect(screen.getByRole("button", { name: "Mumbai" })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Delhi" })).not.toBeInTheDocument();
  });

  it("stores the picked city before moving on", () => {
    const setItem = vi.spyOn(Storage.prototype, "setItem");
    render(<LocationSelection onDone={() => {}} />);
    fireEvent.click(screen.getByRole("button", { name: "Pune" }));
    expect(setItem).toHaveBeenCalledWith("basera:location", "Pune");
    setItem.mockRestore();
  });
});
