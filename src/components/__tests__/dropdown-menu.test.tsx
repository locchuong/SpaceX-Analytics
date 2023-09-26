import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "~/components/dropdown-menu";

const TriggerButtonText = "Click me";
const MenuTitleText = "Title";
const MenuItemText = "Item";

function TestDropdownMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <button type="button">{TriggerButtonText}</button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{MenuTitleText}</DropdownMenuLabel>
        <DropdownMenuItem>{MenuItemText}</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

describe("Dropdown Menu Component", () => {
  it("Should handle basic dropdown menu flow", async () => {
    render(<TestDropdownMenu />);

    // Expect menu to be closed
    expect(screen.queryByText(MenuItemText)).not.toBeInTheDocument();
    expect(screen.queryByText(MenuTitleText)).not.toBeInTheDocument();

    // Open Menu
    // ? Using getAllByRole due to radix cloning element
    userEvent.click(screen.getAllByRole("button", { name: TriggerButtonText })[0]);

    // Expect menu to be open
    await waitFor(() => expect(screen.queryByText(MenuItemText)).toBeInTheDocument());
    await waitFor(() => expect(screen.queryByText(MenuTitleText)).toBeInTheDocument());

    // Close Menu
    userEvent.click(screen.getByRole("menuitem", { name: MenuItemText }));

    // Expect menu to be closed
    await waitFor(() => expect(screen.queryByText(MenuItemText)).toBeInTheDocument());
    await waitFor(() => expect(screen.queryByText(MenuTitleText)).toBeInTheDocument());
  });
});
