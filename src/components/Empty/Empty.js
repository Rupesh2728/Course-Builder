import React from "react";
import emptyicon from "../../Assets/Icons/Empty.svg";

const Empty = () => {
  return (
    <div className="flex justify-center w-[25rem] mx-auto mt-[6rem]">
      <div>
          <img src={emptyicon} alt="EmptyIcon" className="ml-[4rem]" />
          <p className="font-[700] text-[1rem] text-[#222222] ml-[5.5rem] mt-[1rem]">Nothing added here yet</p>
          <p className="font-[500] text-[0.85rem] text-[#222222] ml-[0.75rem] mt-[0.5rem]"> Click on the [+] Add button to add items to this course</p>
      </div>
    </div>
  );
};

export default Empty;
