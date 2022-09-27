import React from "react";

const ChipInfo = ({ className, title, content }) => {
  return (
    <div className={`${className} items-center`}>
      <h3 className="text-[12px] text-slate-700 uppercase font-medium">{title}</h3>
      <span className={`${className} text-[18px] font-semibold`}>{content}</span>
    </div>
  );
};

export default ChipInfo;
