import React, { useState } from "react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  useDisclosure,
} from "@chakra-ui/react";

import { FaPlus } from "react-icons/fa6";
import { BiSolidUpArrow, BiSolidDownArrow } from "react-icons/bi";
import ModalUI from "../../Modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import { Sliceactions } from "../../../store/Slice";
import { IconChangeactions } from "../../../store/ClickSlice";



const DropDown = () => {
  const [title, settitle] = useState("");
  const dispatch = useDispatch();
  const click = useSelector(state=>state.click.click);

  const arrowchangeHandler = () => {
    dispatch(IconChangeactions.setclick(!click));
  };

  const itemclickHandler = (string) => {
    settitle(string);
    onOpen();
  };

  const HandleUploadfile= async (e) => {
    const file = e.target.files[0];
    console.log(file);

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const fileName = file.name;
        const format = file.type.startsWith('image/') ? 'image' : 'pdf';
        const blob = new Blob([reader.result], { type: file.type });
        const filePath = window.URL.createObjectURL(blob);
        console.log("url:",filePath);
        
        dispatch(Sliceactions.addFile({ fileName, filePath, format }));
        
      };
      reader.readAsArrayBuffer(file);
    }
  };
  
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <ModalUI
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        title={title}
      />
      <Menu>
        <MenuButton as={Button} colorScheme="red" onClick={arrowchangeHandler}>
          <div className="flex items-center">
            <FaPlus className="text-white text-[1rem]" />
            <p className="ml-[0.5rem]">Add</p>
            {!click && (
              <BiSolidDownArrow className="text-[0.6rem] ml-[0.6rem]" />
            )}
            {click && <BiSolidUpArrow className="text-[0.6rem] ml-[0.6rem]" />}
          </div>
        </MenuButton>
        <MenuList className="mr-[0.99rem] shadow-lg">
          <MenuItem>
            <div
              className="flex items-center pr-[10.5rem]"
              onClick={() => {
                itemclickHandler("create");
              }}
            >
              <svg
                width="20"
                height="21"
                viewBox="0 0 20 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M1.875 4.29492C1.875 3.25939 2.71447 2.41992 3.75 2.41992H16.25C17.2855 2.41992 18.125 3.25939 18.125 4.29492V16.7949C18.125 17.8305 17.2855 18.6699 16.25 18.6699H3.75C2.71447 18.6699 1.875 17.8305 1.875 16.7949V4.29492ZM3.125 12.4199H16.875V8.66992H3.125V12.4199ZM3.125 13.6699V16.7949C3.125 17.1401 3.40482 17.4199 3.75 17.4199H16.25C16.5952 17.4199 16.875 17.1401 16.875 16.7949V13.6699H3.125ZM16.875 4.29492V7.41992H3.125V4.29492C3.125 3.94974 3.40482 3.66992 3.75 3.66992H16.25C16.5952 3.66992 16.875 3.94974 16.875 4.29492Z"
                  fill="#717171"
                />
              </svg>
              <p className="font-[400] ml-[0.5rem] text-[0.95rem]">
                Create module
              </p>
            </div>
          </MenuItem>

          <MenuItem>
            <div
              className="flex items-center pr-[10.5rem]"
              onClick={() => {
                itemclickHandler("addlink");
              }}
            >
              <svg
                width="20"
                height="21"
                viewBox="0 0 20 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.6923 4.73724C12.829 3.60061 14.6718 3.60061 15.8084 4.73724C16.9451 5.87388 16.9451 7.71672 15.8084 8.85336L13.4601 11.2017C12.2397 12.4221 10.2611 12.4221 9.04067 11.2017L8.56732 10.7284C8.32324 10.4843 7.92751 10.4843 7.68344 10.7284C7.43936 10.9724 7.43936 11.3682 7.68344 11.6122L8.15679 12.0856C9.86533 13.7941 12.6354 13.7941 14.344 12.0856L16.6923 9.73724C18.3171 8.11245 18.3171 5.47815 16.6923 3.85336C15.0675 2.22857 12.4332 2.22857 10.8084 3.85336L8.93344 5.72836C8.68936 5.97243 8.68936 6.36816 8.93344 6.61224C9.17751 6.85632 9.57324 6.85632 9.81732 6.61224L11.6923 4.73724Z"
                  fill="#717171"
                />
                <path
                  d="M6.54067 9.88888C7.76106 8.66849 9.7397 8.66849 10.9601 9.88888L11.4334 10.3622C11.6775 10.6063 12.0732 10.6063 12.3173 10.3622C12.5614 10.1181 12.5614 9.72242 12.3173 9.47834L11.844 9.00499C10.1354 7.29645 7.36533 7.29645 5.65679 9.00499L3.30843 11.3533C1.68364 12.9781 1.68365 15.6124 3.30844 17.2372C4.93323 18.862 7.56753 18.862 9.19232 17.2372L11.0673 15.3622C11.3114 15.1182 11.3114 14.7224 11.0673 14.4783C10.8232 14.2343 10.4275 14.2343 10.1834 14.4783L8.30844 16.3533C7.1718 17.49 5.32896 17.49 4.19232 16.3533C3.05569 15.2167 3.05568 13.3739 4.19232 12.2372L6.54067 9.88888Z"
                  fill="#717171"
                />
              </svg>
              <p className="font-[400] ml-[0.5rem] text-[0.95rem]">
                Add a link
              </p>
            </div>
          </MenuItem>

          <MenuItem>
            <div className="flex items-center pr-[10.5rem]">
              <svg
                width="20"
                height="21"
                viewBox="0 0 20 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.55806 6.97798C4.31398 7.22206 4.31398 7.61779 4.55806 7.86186C4.80214 8.10594 5.19786 8.10594 5.44194 7.86186L9.375 3.92881L9.375 14.9199C9.375 15.2651 9.65482 15.5449 10 15.5449C10.3452 15.5449 10.625 15.2651 10.625 14.9199L10.625 3.92881L14.5581 7.86187C14.8021 8.10594 15.1979 8.10594 15.4419 7.86187C15.686 7.61779 15.686 7.22206 15.4419 6.97798L10.4419 1.97798C10.4381 1.97416 10.4343 1.97039 10.4303 1.96668C10.316 1.85813 10.1648 1.7967 10.0069 1.79496C10.0046 1.79493 10.0023 1.79492 10 1.79492C9.99769 1.79492 9.99539 1.79493 9.99309 1.79496C9.83141 1.79675 9.67667 1.86113 9.56143 1.97463C9.5603 1.97574 9.55918 1.97686 9.55806 1.97798L4.55806 6.97798Z"
                  fill="#222222"
                />
                <path
                  d="M1.875 18.6699C1.875 18.3247 2.15482 18.0449 2.5 18.0449H17.5C17.8452 18.0449 18.125 18.3247 18.125 18.6699C18.125 19.0151 17.8452 19.2949 17.5 19.2949H2.5C2.15482 19.2949 1.875 19.0151 1.875 18.6699Z"
                  fill="#222222"
                />
              </svg>

              <label
                htmlFor="profile_pic"
                className="font-[400] ml-[0.5rem] text-[0.95rem]"
              >
                Upload
              </label>
            </div>

            <input
              type="file"
              id="profile_pic"
              name="profile_pic"
              onChange={HandleUploadfile}
              className=" bg-slate-100 px-2 py-1 focus:outline-primary_light hidden"
            />
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  );
};

export default DropDown;
