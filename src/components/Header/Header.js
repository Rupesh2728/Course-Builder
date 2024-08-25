import React from 'react';
import DropDown from './DropDown/DropDown';

const Header = () => {

  return (<>
    <div className='font-bold flex justify-center mt-[2rem]'>
        <div className='flex justify-between w-[70%]'>
           <p className='text-[1.2rem]'>
             Course builder
           </p>

           <div>  
             <DropDown/>
           </div>
        </div>
    </div>
    </>
  )
}

export default Header