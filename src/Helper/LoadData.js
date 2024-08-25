const LoadData =(setdata, parentIndex,subIndex, title,ItemsArray)=>{
    if (title === "editlink") {
      if(parentIndex === null)
      {
        setdata({
          ...ItemsArray[subIndex],
          modulename: "",
          filename: "",
          path:"",
          format:"",
        });
      }

      else{
        const obj = ItemsArray[parentIndex].submodules[subIndex];
        setdata({
          ...obj,
          modulename: "",
          filename: "",
          path:"",
          format:"",
        });
      }
    
    } else if (title === "editmodule") {

      if(parentIndex === null)
        {
          setdata({
            modulename: ItemsArray[subIndex].modulename,
            url: "",
            displayname: "",
            filename: "",
            path:"",
            format:"",
          });
        }
    }

    else if(title === "editfile")
    {
      if(parentIndex === null)
        {  
          setdata({
            filename: ItemsArray[subIndex].filename.slice(0,-4),
            url: "",
            displayname: "",
            modulename: "",
            format:ItemsArray[subIndex].format,
          });
        }
  
        else{
          const obj = ItemsArray[parentIndex].submodules[subIndex];
          setdata({
            filename: obj.filename.slice(0,-4),
            format:obj.format,
            url: "",
            displayname: "",
            modulename: "",
          });
        }
    }
  }

module.exports ={
    LoadData,
}