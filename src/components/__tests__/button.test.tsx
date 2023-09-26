import { fireEvent, render, screen } from "@testing-library/react";
import { vi } from "vitest";

import { Button } from "~/components/button";

const ButtonText = "Click Me";

describe("Button Component", () => {
  it("Should handle click", async () => {
    const handleClick = vi.fn();

    render(<Button onClick={handleClick}>{ButtonText}</Button>);

    const button = screen.getByRole("button", { name: ButtonText });

    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
