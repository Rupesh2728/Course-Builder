import React, { useEffect, useState } from "react";
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
import Content from "./Content/Content";
import toast from "react-hot-toast";
import { IconChangeactions } from "../../store/ClickSlice";
import { LoadData } from "../../Helper/LoadData";


const EditModal = ({ parentIndex,subIndex, isOpen, onOpen, onClose, title }) => {
  const dispatch = useDispatch();
  const ItemsArray = useSelector((state) => state.items);
  const click = useSelector((state) => state.click.click);
  
  
  const [data, setdata] = useState({
    modulename: "",
    url: "",
    displayname: "",
    filename: "",
    path:"",
  });

  useEffect(() => {
    LoadData(setdata, parentIndex,subIndex, title,ItemsArray);
  }, [parentIndex,subIndex, title, ItemsArray]);

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
    if (str === "editmodule") {
      if(data.modulename === "")
      { 
          toast.error("Module name cannot be Empty!!!");
          LoadData(setdata, parentIndex,subIndex, title,ItemsArray);
      }
      else{
        toast.success("Updated the Module...");
        dispatch(
          Sliceactions.editmodule({ pindex: parentIndex,sindex:subIndex, modulename: data.modulename })
        );

        setdata({
          modulename: "",
          url: "",
          displayname: "",
          path:"",
          filename: "",
          format:"",
        });
      }
    
    } else if (str === "editlink") {

      if(data.url === "")
        { 
          toast.error("URL cannot be Empty!!!");
          LoadData(setdata, parentIndex,subIndex, title,ItemsArray);
        }

        else if( data.displayname === "")
          { 
            toast.error("Display name cannot be Empty!!!");
          }

     else{
      toast.success("Link got Updated!!!");
      dispatch(
        Sliceactions.editlink({
          url: data.url,
          displayname: data.displayname,
          pindex: parentIndex,
          sindex:subIndex
        })
      );

      setdata({
        modulename: "",
        url: "",
        displayname: "",
        path:"",
        filename: "",
        format:"",
      });
     }
    }

    else if (str === "editfile") {

      if( data.filename === "")
        { 
          toast.error("File name cannot be Empty!!!");
          LoadData(setdata, parentIndex,subIndex, title,ItemsArray);
        }

        else{
          toast.success("Filename Updated!!!");
          dispatch(
            Sliceactions.editfile({
              path: data.path,
              filename: (data.filename + ".pdf"),
              pindex: parentIndex,
              sindex:subIndex
            })
          );

          setdata({
            modulename: "",
            url: "",
            displayname: "",
            path:"",
            filename: "",
            format:"",
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

            {title === "editfile" && (
              <p className="font-[700] text-[1.2rem] py-[0.5rem] p-2">
                Rename file
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

            {title === "editlink" && (
              <button
                onClick={() => {
                  HandleSubmit("editlink");
                }}
                className="bg-[#008392] text-white border-[0.1rem] px-[0.8rem] h-[3rem] rounded-lg ml-[0.8rem]"
              >
                Save changes
              </button>
            )}

            {title === "editmodule" && (
              <button
                onClick={() => {
                  HandleSubmit("editmodule");
                  onClose();
                }}
                className="bg-[#008392] text-white border-[0.1rem] px-[0.8rem] h-[3rem] rounded-lg ml-[0.8rem]"
              >
                Save changes
              </button>
            )}

            {title === "editfile" && (
              <button
                onClick={() => {
                  HandleSubmit("editfile");
                  onClose();
                }}
                className="bg-[#008392] text-white border-[0.1rem] px-[0.8rem] h-[3rem] rounded-lg ml-[0.8rem]"
              >
                Save changes
              </button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditModal;
