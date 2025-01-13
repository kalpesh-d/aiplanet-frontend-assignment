import { useState } from "react";
import { Plus, Minus, Maximize, LockOpen, Lock } from "lucide-react";

const DropArea = () => {
  return (
    <div className="fixed inset-0 -z-10 h-full w-full bg-white bg-custom-pattern bg-20px bg-offset">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-4">
        <div className="bg-green-100 rounded-full p-4">
          <img className="w-10 h-10" src="/d&d.svg" alt="Drag & Drop" />
        </div>
        <p className="text-gray-600">Drag & drop to get started</p>
      </div>
    </div>
  );
};

export default DropArea;