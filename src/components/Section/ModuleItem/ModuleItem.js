import React from "react";
import { Menu, MenuButton, MenuList, MenuItem, MenuDivider } from "@chakra-ui/react";
import ThreeDots from "../../../Assets/Icons/ThreeDots.svg";
import Pdficon from "../../../Assets/Icons/Pdficon.svg";
import Editlogo from "../../../Assets/Icons/Editlogo.svg";
import Deletelogo from "../../../Assets/Icons/Deletelogo.svg";
import LinkIcon from '../../../Assets/Icons/ModuleLinkIcon.svg';
import DownloadFile from "../DownloadFile/DownloadFile";
import toast from "react-hot-toast";

const ModuleItem = ({parentindex,subIndex,type,data,itemclickHandler}) => {
  
   const helperfunc=(str)=>{
    if(type === "Link")
    {
      if(str==="edit")
      {
        itemclickHandler("editlink",parentindex,subIndex);
      }

      else if(str==="delete"){
        itemclickHandler("deletelink",parentindex,subIndex);
        toast.success("Link Deletion Successful!!!");
      }
    }

    else if(type === "PDF")
      {
        if(str==="edit")
        {
          itemclickHandler("editfile",parentindex,subIndex);
        }

        else if(str==="delete"){
          itemclickHandler("deletefile",parentindex,subIndex);
          toast.success("PDF Deletion successful...");
        }
      }

      else
        {
          if(str==="edit")
          {
            itemclickHandler("editfile",parentindex,subIndex);
          }
  
          else if(str==="delete"){
            itemclickHandler("deletefile",parentindex,subIndex);
            toast.success("Image modified...");
          }
        }
   }
  
  
  return (
    <div className="flex justify-between border-[1px] border-gray-200 p-[0.75rem] rounded-md ">
      {parentindex === null ? ( <div className="flex items-center">  
        {type === "PDF" && <img src={Pdficon} className="w-[2.5rem] h-[2.5rem]" alt="Pdficon"/>}
        {type === "Link" && <img src={LinkIcon} className="w-[2.5rem] h-[2.5rem]"  alt="LinkIcon"/>}
        <div className="flex-col ml-[0.8rem]">
          <p className="font-[500] text-[0.9rem]">{data.displayname || data.filename}</p>
          <p className="font-[400] text-[0.8rem] text-[#717171]">{type}</p>
        </div>
      </div>):( <div className="flex items-center pl-[2.5rem]">  
        {type === "PDF" && <img src={Pdficon} className="w-[2.5rem] h-[2.5rem]" alt="Pdficon"/>}
        {type === "Link" && <img src={LinkIcon} className="w-[2.5rem] h-[2.5rem]"  alt="LinkIcon"/>}
        <div className="flex-col ml-[0.8rem]">
          <p className="font-[500] text-[0.9rem]">{data.displayname || data.filename}</p>
          <p className="font-[400] text-[0.8rem] text-[#717171]">{type}</p>
        </div>
      </div>)}

      <div>
        <Menu>
          <MenuButton>
            <img src={ThreeDots} alt="ThreeDots"/>
          </MenuButton>
          <MenuList className='mr-[3rem]'>
            <MenuItem>
             <div className="text-[0.9rem] flex" onClick={()=>{helperfunc("edit")}}>
                <img src={Editlogo} alt="EditLogo"/>
                <p className="text-[#717171] ml-[0.5rem]">{type==="Link" ? "Edit":"Rename"}</p>
             </div>
            </MenuItem>

            {type!=="Link" &&  
            <MenuItem>
               <DownloadFile fileName={data.filename} fileUrl={data.path}/>
            </MenuItem>}

            {type!=="Link" && <MenuDivider/>}
            <MenuItem>
               <div className="text-[0.9rem] flex" onClick={()=>{helperfunc("delete")}}>
               <img src={Deletelogo} alt="DeleteLogo"/>
               <p className="text-[#D33852] ml-[0.5rem]">Delete</p>
             </div>
            </MenuItem>
          </MenuList>
        </Menu>
      </div>
    </div>
  );
};

export default ModuleItem;
