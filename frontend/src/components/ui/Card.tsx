import { FiEdit } from "react-icons/fi";
import type { ReactNode } from "react";

type CardProps = {
  title: string;
  children: ReactNode;
};

export default function Card({ title, children }:  CardProps) {
    
  return (
    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5">
      
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-sm text-white/80 font-medium">{title}</h2>
        <button className="text-white/40 hover:text-white">
          <FiEdit size={14} />
        </button>
      </div>

      {children}
    </div>
  );
}