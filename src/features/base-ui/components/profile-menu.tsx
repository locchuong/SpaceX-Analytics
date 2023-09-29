import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

import CaretDownIcon from "~/assets/icons/caret-down.svg?react";
import FakeUserImage from "~/assets/images/fake-user.jpg";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/dropdown-menu";

import { firebaseAuth } from "~/config/firebase";

import { useNavigate } from "~/router";

function ProfileMenu() {
  const navigate = useNavigate();
  const [currentUser] = useAuthState(firebaseAuth);

  const handleLogout = () => signOut(firebaseAuth);

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center space-x-4" type="button">
          <img className="h-10 w-10 rounded-full border-2 border-zinc-500" src={FakeUserImage} alt="User Profile" />
          <p className="text-base font-medium text-white ">{currentUser?.displayName ?? "Unknown"}</p>
          <CaretDownIcon className="h-4 w-4 text-white" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" side="bottom" align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => navigate("/")}>Profile</DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate("/")}>Settings</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
export { ProfileMenu };
