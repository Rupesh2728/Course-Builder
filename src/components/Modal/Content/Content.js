import React from 'react';

const Content = ({title,data,setdata,ChangeHandler}) => {

  return (
   <>
   
      {title==="create" && 
      <>
       <div className='p-2'>
          <label className='font-[600] text-[0.9rem] text-[#222222]'>Module name</label>
          <input value={data.modulename} onChange={ChangeHandler} name="modulename" className="w-full h-[2.5rem] border text-[0.9rem] font-[500] border-slate-300 rounded-md mt-[0.6rem] hover:border-[#008392] focus:outline-none pl-[0.5rem]" required/>
       </div>
       
      </>}

      {title==="addlink" && 
      <>
       <div className='p-2'>
          <label className='font-[600] text-[0.9rem] text-[#222222]'>URL</label>
          <input value={data.url} onChange={ChangeHandler}  name="url"className="w-full h-[2.5rem] border text-[0.9rem] font-[500] border-slate-300 rounded-md mt-[0.6rem] hover:border-[#008392] focus:outline-none pl-[0.5rem]" required/>
       </div>

       <div className='p-2'>
          <label className='font-[600] text-[0.9rem] text-[#222222]'>Display name</label>
          <input value={data.displayname} onChange={ChangeHandler} name="displayname" className="w-full h-[2.5rem] border text-[0.9rem] font-[500] border-slate-300 rounded-md mt-[0.6rem] hover:border-[#008392] focus:outline-none pl-[0.5rem]" required/>
       </div>
       
      </>}
   
   </>
  )
}

export default Content