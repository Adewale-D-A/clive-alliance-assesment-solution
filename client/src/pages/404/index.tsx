import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Logo } from "../../components/logo";
import { ArrowLeft } from "lucide-react";

export default function PageNotFound() {
  return (
    <motion.div
      initial={{ x: -100 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.2 }}
      className="w-full h-screen flex justify-center flex-col gap-5 items-center"
    >
      <div className=" flex items-center flex-col gap-5">
        <Logo />
        <h1 className=" text-5xl font-bold">404</h1>
        <p>This page could not be found!</p>
        <Link
          to={"/"}
          className=" dark:text-primary text-black border-b border-dotted dark:border-primary border-black px-3 flex items-center gap-2"
        >
          <ArrowLeft /> Home
        </Link>
      </div>
    </motion.div>
  );
}
