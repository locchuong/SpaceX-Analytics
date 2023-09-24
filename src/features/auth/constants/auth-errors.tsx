/**
 * Maps Firebase Auth Error codes to User friendly messages
 * @param errorCode - Error Code from Firebase AuthError's code
 * @returns string
 */
export function convertErrorCodeToUserMessage(errorCode?: string): string {
  if (!errorCode) {
    return "";
  }

  switch (errorCode) {
    case "auth/email-already-in-use":
      return "The provided email is already in use by an existing user.";

    case "auth/weak-password":
      return "The provided value for password is too weak.";

    case "auth/invalid-login-credentials":
      return "The provided email or password is invalid.";

    // TODO: Map more properties

    default:
      return errorCode;
  }
}
