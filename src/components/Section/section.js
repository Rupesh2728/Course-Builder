import React, { useState } from "react";
import ModuleItem from "./ModuleItem/ModuleItem";
import { useDispatch, useSelector } from "react-redux";
import { useDisclosure } from "@chakra-ui/react";
import EditModal from "../EditModal/EditModal";
import { Sliceactions } from "../../store/Slice";
import Empty from "../Empty/Empty";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import ModuleDropDown from "./ModuleDropDown/ModuleDropDown";

function Section() {
  const ItemsArray = useSelector((state) => state.items);
  const [title, setTitle] = useState("");
  const [parentClickedIndex, setParentClickedIndex] = useState(-1);
  const [clickedSubIndex, setClickedSubIndex] = useState(-1);

  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const deleteFunc = (pIndex, sIndex) => {
    dispatch(Sliceactions.deleteItem({ pindex: pIndex, sindex: sIndex }));
  };

  const itemClickHandler = (string, pIndex, sIndex) => {
    if (string === "deletelink" || string === "deletemodule" || string === "deletefile") {
      deleteFunc(pIndex, sIndex);
    } else {
      onOpen();
    }
    setParentClickedIndex(pIndex);
    setClickedSubIndex(sIndex);
    setTitle(string);
  };

  const handleOnDragEnd = (result) => {
    const { source, destination, draggableId } = result;

    if (!destination) return;

    const sourceId = source.droppableId;
    const destId = destination.droppableId;

    // Outside to outside
    if (sourceId === "ROOT" && destId === "ROOT") {
      const newItems = Array.from(ItemsArray);
      const [reorderedItem] = newItems.splice(source.index, 1);
      newItems.splice(destination.index, 0, reorderedItem);
      dispatch(Sliceactions.setItems(newItems));
    }
    // Inside to inside (same module)
    else if (sourceId === destId && sourceId !== "ROOT") {
      const moduleIndex = parseInt(sourceId.split("-")[1]);
      const newItems = Array.from(ItemsArray);
      const newSubmodules = Array.from(newItems[moduleIndex].submodules);
      const [reorderedItem] = newSubmodules.splice(source.index, 1);
      newSubmodules.splice(destination.index, 0, reorderedItem);
      newItems[moduleIndex] = { ...newItems[moduleIndex], submodules: newSubmodules };
      dispatch(Sliceactions.setItems(newItems));
    }
    // Inside to inside (different modules)
    else if (sourceId !== destId && sourceId !== "ROOT" && destId !== "ROOT") {
      const sourceModuleIndex = parseInt(sourceId.split("-")[1]);
      const destModuleIndex = parseInt(destId.split("-")[1]);
      const newItems = Array.from(ItemsArray);
      const sourceSubmodules = Array.from(newItems[sourceModuleIndex].submodules);
      const destSubmodules = Array.from(newItems[destModuleIndex].submodules);
      const [movedItem] = sourceSubmodules.splice(source.index, 1);
      destSubmodules.splice(destination.index, 0, movedItem);
      newItems[sourceModuleIndex] = { ...newItems[sourceModuleIndex], submodules: sourceSubmodules };
      newItems[destModuleIndex] = { ...newItems[destModuleIndex], submodules: destSubmodules };
      dispatch(Sliceactions.setItems(newItems));
    }
    // Outside to inside
    else if (sourceId === "ROOT" && destId !== "ROOT") {
      const destModuleIndex = parseInt(destId.split("-")[1]);
      const newItems = Array.from(ItemsArray);
      const [movedItem] = newItems.splice(source.index, 1);
      if (!newItems[destModuleIndex].submodules) {
        newItems[destModuleIndex].submodules = [];
      }
      const destSubmodules = Array.from(newItems[destModuleIndex].submodules);
      destSubmodules.splice(destination.index, 0, movedItem);
      newItems[destModuleIndex] = { ...newItems[destModuleIndex], submodules: destSubmodules };
      dispatch(Sliceactions.setItems(newItems));
    }
    // Inside to outside
    else if (sourceId !== "ROOT" && destId === "ROOT") {
      const sourceModuleIndex = parseInt(sourceId.split("-")[1]);
      const newItems = Array.from(ItemsArray);
      const sourceModule = {...newItems[sourceModuleIndex]};
      const sourceSubmodules = Array.from(sourceModule.submodules);
      
      const [movedItem] = sourceSubmodules.splice(source.index, 1);
      sourceModule.submodules = sourceSubmodules;
      newItems[sourceModuleIndex] = sourceModule;
      newItems.splice(destination.index, 0, movedItem);
      dispatch(Sliceactions.setItems(newItems));
    }
  };

  return (
    <>
      <EditModal parentIndex={parentClickedIndex} subIndex={clickedSubIndex} isOpen={isOpen} onOpen={onOpen} onClose={onClose} title={title} />
      <div className="rounded-md p-5 w-[72%] mx-auto">
        {ItemsArray.length === 0 && <Empty />}
        
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="ROOT">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {ItemsArray.map((item, index) => (
                  <Draggable key={item.id || `item-${index}`} draggableId={item.id || `item-${index}`} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="flex-col mt-[1.5rem]"
                      >
                        {item.modulename ? (
                          <ModuleDropDown index={index} item={item} itemClickHandler={itemClickHandler} />
                        ) : item.filename ? (
                          <ModuleItem
                            parentindex={null}
                            subIndex={index}
                            type={(item.format || "").toUpperCase()}
                            data={item}
                            itemclickHandler={itemClickHandler}
                          />
                        ) : (
                          <ModuleItem
                            parentindex={null}
                            subIndex={index}
                            type="Link"
                            data={item}
                            itemclickHandler={itemClickHandler}
                          />
                        )}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </>
  );
}

export default Section;