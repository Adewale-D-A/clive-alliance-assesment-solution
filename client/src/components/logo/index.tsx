import { Link } from "react-router-dom";

export const Logo = ({ url = "/" }: { url?: string }) => (
  <Link to={url} className=" w-fit flex items-center justify-center gap-2">
    <img
      src={"/vite.svg"}
      alt="Logo"
      height={200}
      width={200}
      className="h-12 w-auto"
    />
  </Link>
);
