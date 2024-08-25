import React from "react";
import ModuleDownArrow from "../../../Assets/Icons/ModuleDownArrow.svg";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import ThreeDots from "../../../Assets/Icons/ThreeDots.svg";
import Editlogo from "../../../Assets/Icons/Editlogo.svg";
import Deletelogo from "../../../Assets/Icons/Deletelogo.svg";
import toast from "react-hot-toast";


const Module = ({ index, setIsOpen, isOpen, module,itemclickHandler }) => {
  const helperfunc=(str)=>{
      if(str==="edit")
      {
        itemclickHandler("editmodule",null,index);
      }

      else if(str==="delete"){
        itemclickHandler("deletemodule",null,index);
        toast.success("Deleted module successfully...");
      }
   }
   
  return (
    <div className="flex justify-between border-[1px] border-gray-200 p-3">
      <div className="flex items-center">
        <button onClick={() => setIsOpen(!isOpen)}>
          <img src={ModuleDownArrow} alt="downarrow" />
        </button>

        <div className="flex-col">
          <p className="font-bold ml-[1rem] text-[0.9rem]">
            {module.modulename}
          </p>
          <p className="text-slate-500 text-[0.8rem] ml-[1rem]">
            {module.submodules.length !== 0
              ? `${module.submodules.length} Items`
              : "Add Items to this module"}
          </p>
        </div>
      </div>

      <div>
        <Menu>
          <MenuButton>
            <img src={ThreeDots} alt="ThreeDots"/>
          </MenuButton>
          <MenuList>
            <MenuItem>
            <div className="text-[0.9rem] flex" onClick={()=>{helperfunc("edit")}}>
                <img src={Editlogo} alt="ThreeDots"/>
                <p className="text-[#717171] ml-[0.5rem]">Edit module name</p>
             </div>
            </MenuItem>

             <MenuItem>
               <div className="text-[0.9rem] flex" onClick={()=>{helperfunc("delete")}}>
               <img src={Deletelogo} alt="ThreeDots"/>
               <p className="text-[#D33852] ml-[0.5rem]">Delete</p>
             </div>
            </MenuItem>
          </MenuList>
        </Menu>
      </div>
    </div>
  );
};

export default Module;
