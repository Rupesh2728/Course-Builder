import React from 'react';

const Content = ({title,data,setdata,ChangeHandler}) => {

  return (
   <>
   
      {title==="editmodule" && 
      <>
       <div className='p-2'>
          <label className='font-[600] text-[0.9rem] text-[#222222]'>Module name</label>
          <input value={data.modulename} onChange={ChangeHandler} name="modulename" className="w-full h-[2.5rem] border text-[0.9rem] font-[500] border-slate-300 rounded-md mt-[0.6rem] hover:border-[#008392] focus:outline-none pl-[0.5rem]" required/>
       </div>
       
      </>}

      {title==="editfile" && 
      <>
       <div className='p-2'>
          <label className='font-[600] text-[0.9rem] text-[#222222]'>File name</label>
          <input value={data.filename} onChange={ChangeHandler} name="filename" className="w-full h-[2.5rem] border text-[0.9rem] font-[500] border-slate-300 rounded-md mt-[0.6rem] hover:border-[#008392] focus:outline-none pl-[0.5rem]" required/>
       </div>
       
      </>}


      {title==="editlink" && 
      <>
       <div className='p-2'>
          <label className='font-[600] text-[0.9rem] text-[#222222]'>URL</label>
          <input value={data.url} onChange={ChangeHandler}  name="url"className="w-full h-[2.5rem] border text-[0.9rem] font-[500] border-slate-300 rounded-md mt-[0.6rem] hover:border-[#008392] focus:outline-none pl-[0.5rem]"/>
       </div>

       <div className='p-2'>
          <label className='font-[600] text-[0.9rem] text-[#222222]'>Display name</label>
          <input value={data.displayname} onChange={ChangeHandler} name="displayname" className="w-full h-[2.5rem] border text-[0.9rem] font-[500] border-slate-300 rounded-md mt-[0.6rem] hover:border-[#008392] focus:outline-none pl-[0.5rem]"/>
       </div>
       
      </>}
   
   </>
  )
}

export default Content