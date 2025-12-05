import { LoaderIcon } from "lucide-react";
import React from "react";

const Loader = () => {
  return (
    <div className="h-screen flex justify-center items-center ">
      <LoaderIcon className="animate-spin size-10" />
    </div>
  );
};

export default Loader;
