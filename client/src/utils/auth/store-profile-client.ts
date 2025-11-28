import type { AuthUserT } from "../../types/types";
import Criptic from "../../utils/criptic";

const cryptographer = new Criptic();
const authProfileKey = import.meta.env.VITE_AUTH_PROFILE_KEY || "";

export default function storeProfileClient({
  profile,
}: {
  profile: AuthUserT;
}) {
  const strigifiedProfile = JSON.stringify(profile);

  const encryptedProfile = cryptographer.encrypt(
    authProfileKey,
    strigifiedProfile
  );
  if (typeof window !== "undefined") {
    localStorage.setItem(authProfileKey, encryptedProfile);
  }
}
