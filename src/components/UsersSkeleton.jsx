import React from "react";

const UsersSkeleton = () => {
  return (
    <div className="space-y-2">
      {[1, 2, 3].map((item) => (
        <div
          key={item}
          className="bg-slate-800/30 animate-pulse p-3 rounded-lg"
        >
          <div className="space-x-3 flex items-center">
            <div className="bg-slate-700 w-12 h-12 rounded-full"></div>
            <div className="flex-1">
              <div className="h-4 bg-slate-700 rounded mb-2 w-3/4"></div>
              <div className="h-3 bg-slate-700/70 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UsersSkeleton;
