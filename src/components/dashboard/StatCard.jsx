import { Card } from "@heroui/react";
import React from "react";

const StatCard = ({value, icon, label}) => {
  return (
    <Card className=" md:w-79.25 h-47.5 bg-[#1B1B1C] p-6">
      <div className="w-10 h-10 rounded-xl bg-white/6 flex items-center justify-center text-white/50 text-xl mb-6">
        {icon}
      </div>
      <div>
        <p className="text-xs text-white/40 tracking-wide mb-3">{label}</p>
        <p className="text-3xl font-semibold text-white leading-none">
          {value}
        </p>
      </div>
    </Card>
  );
};

export default StatCard;
