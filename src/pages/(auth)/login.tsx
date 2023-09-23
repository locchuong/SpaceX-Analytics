import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "~/router";

import { firebaseAuth, googleProvider } from "~/config/firebase";

function Login() {
  const navigate = useNavigate();
  const signInWithGoogle = () =>
    signInWithPopup(firebaseAuth, googleProvider).then(() => {
      navigate("/protected");
    });
  return (
    <div className="flex flex-col gap-2">
      login
      <button type="button" onClick={() => signInWithGoogle()}>
        Sign in with Google
      </button>
    </div>
  );
}
export default Login;
