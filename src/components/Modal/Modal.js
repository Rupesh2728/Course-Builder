import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Sliceactions } from "../../store/Slice";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import toast from 'react-hot-toast';
import Content from "./Content/Content";
import { IconChangeactions } from "../../store/ClickSlice";


const ModalUI = ({ isOpen, onOpen, onClose, title }) => {
  const dispatch = useDispatch();
  const click = useSelector((state)=>state.click.click);
 
  const [data, setdata] = useState({
    modulename: "",
    url: "",
    displayname: "",
  });

  const ChangeHandler = (e) => {
    const { name, value } = e.target;
    setdata((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const HandleSubmit = async (str) => {
    
    if (str === "create") 
    {
      if(data.modulename === "")
        { 
            toast.error("Module name cannot be Empty!!!");
        }
        else{
          toast.success("Created New Module!!!");
          dispatch(Sliceactions.createnewmodule(data.modulename));

          setdata({
            modulename: "",
            url: "",
            displayname: "",
          });
        }
    } 
    
    else if (str === "addlink") 
    {  if(data.url === "")
      { 
        toast.error("URL cannot be Empty!!!");
      }

      else if( data.displayname === "")
        { 
          toast.error("Display name cannot be Empty!!!");
        }

      else{
        toast.success("Generated New Link...");
          dispatch(
            Sliceactions.createnewlink({
              url: data.url,
              displayname: data.displayname,
            })
          );

          setdata({
            modulename: "",
            url: "",
            displayname: "",
          });

        }
    }


   if(click)
   {
    dispatch(IconChangeactions.setclick(!click));
   }
    onClose();
  };

  return (
    <>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {title === "create" && (
              <p className="font-[700] text-[1.2rem] py-[0.5rem] p-2">
                Create new module
              </p>
            )}
            {title === "addlink" && (
              <p className="font-[700] text-[1.2rem] py-[0.5rem] p-2">
                Add new link
              </p>
            )}

            {title === "editlink" && (
              <p className="font-[700] text-[1.2rem] py-[0.5rem] p-2">
                Edit link
              </p>
            )}
            {title === "editmodule" && (
              <p className="font-[700] text-[1.2rem] py-[0.5rem] p-2">
                Edit module
              </p>
            )}
          </ModalHeader>
          <ModalCloseButton className="mt-[0.8rem]" />

          <ModalBody>
            <Content
              title={title}
              data={data}
              setdata={setdata}
              ChangeHandler={ChangeHandler}
            />
          </ModalBody>

          <ModalFooter>
            <button
              onClick={onClose}
              className="hover:bg-[#008392] hover:text-white border-[0.1rem] w-[6rem] h-[3rem] rounded-lg"
            >
              Cancel
            </button>

            {title === "create" && (
              <button
                onClick={() => {
                  HandleSubmit("create");
                }}
                className="bg-[#008392] text-white border-[0.1rem] px-[0.8rem] h-[3rem] rounded-lg ml-[0.8rem]"
              >
                Create
              </button>
            )}

            {title === "addlink" && (
              <button
                onClick={() => {
                  HandleSubmit("addlink");
                }}
                className="bg-[#008392] text-white border-[0.1rem] px-[0.8rem] h-[3rem] rounded-lg ml-[0.8rem]"
              >
                Add
              </button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalUI;
