import Criptic from "../../utils/criptic";

const encrypt = new Criptic();
const authKey = import.meta.env.VITE_AUTH_SESION_KEY || "";
export default function storeTokenClient({
  token,
  refresh,
}: {
  token: string;
  refresh: string;
}) {
  const strigifiedToken = JSON.stringify({
    token,
    refresh,
  });
  // encrypt token
  const encryptedToken = encrypt.encrypt(authKey, strigifiedToken);
  if (typeof window !== "undefined") {
    localStorage.setItem(authKey, encryptedToken);
  }
}
