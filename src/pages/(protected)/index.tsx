import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

import { firebaseAuth } from "~/config/firebase";

function Protected() {
  const [user] = useAuthState(firebaseAuth);

  return (
    <div className="flex flex-col gap-4">
      <p>protected resource!</p>
      <div className="flex w-fit border border-black p-2">
        <p>Hello {user?.displayName}</p>
      </div>
      <button className="w-fit border border-black p-2" onClick={() => signOut(firebaseAuth)} type="button">
        Sign Out
      </button>
    </div>
  );
}
export default Protected;
