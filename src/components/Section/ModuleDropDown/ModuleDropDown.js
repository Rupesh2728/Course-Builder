import React, { useState } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import ModuleItem from "../ModuleItem/ModuleItem";
import Module from "../Module/Module";

const ModuleDropDown = ({ index, item, itemClickHandler }) => {
  const [openFlag, setOpenFlag] = useState(false);
  
  return (
    <>
      <Module
        index={index}
        isOpen={openFlag}
        setIsOpen={setOpenFlag}
        module={item}
        itemclickHandler={itemClickHandler}
      />
      <Droppable droppableId={`inner-${index}`}>
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={`flex-col ${openFlag ? "" : "hidden"}`}
          >
            {item.submodules && item.submodules.map((submodule, subIndex) => (
              <Draggable
                key={submodule.id || `sub-${index}-${subIndex}`}
                draggableId={submodule.id || `sub-${index}-${subIndex}`}
                index={subIndex}
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    {submodule.filename ? (
                      <ModuleItem
                        type={(submodule.format || "").toUpperCase()}
                        data={submodule}
                        parentindex={index}
                        subIndex={subIndex}
                        itemclickHandler={itemClickHandler}
                      />
                    ) : (
                      <ModuleItem
                        type="Link"
                        data={submodule}
                        parentindex={index}
                        subIndex={subIndex}
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
    </>
  );
};
  
export default ModuleDropDown;