import type { UserT } from "../../types/api/service.types";
import Criptic from "../../utils/criptic";

const cryptographer = new Criptic();
const authProfileKeyClient = import.meta.env.VITE_AUTH_PROFILE_KEY || "";

export default function extractProfileClient() {
  if (typeof window !== "undefined") {
    const profileCredentials = localStorage.getItem(authProfileKeyClient) || "";
    const decryptProfileCredentials = cryptographer.decrypt(
      authProfileKeyClient,
      profileCredentials
    );
    const profileData = JSON.parse(decryptProfileCredentials);
    return profileData as UserT;
  } else {
    return {} as any;
  }
}
