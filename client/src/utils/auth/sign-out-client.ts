const authProfileKey = import.meta.env.VITE_AUTH_PROFILE_KEY || "";
const authKey = import.meta.env.VITE_AUTH_SESION_KEY || "";
const authPermissionKey = import.meta.env.VITE_AUTH_PERM_KEY || "";

export default function signOutClient(redirect?: string) {
  if (typeof window !== "undefined") {
    localStorage.removeItem(authProfileKey);
    localStorage.removeItem(authKey);
    localStorage.removeItem(authPermissionKey);
    // window.location.href = redirect ? `/?redirect=${redirect}` : "/";
  }
}
