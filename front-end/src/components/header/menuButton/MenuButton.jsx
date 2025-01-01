//node
import React from 'react'
//icons
import { FaAlignJustify } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

export default function MenuButton({openButton, handleClick}) {
  return !openButton ? (
    <div onClick={handleClick} className='menu-toggle'>
      <FaAlignJustify size={30}/>
    </div>
  ):(
    <div className='menu-toggle'onClick={handleClick}>
        <IoMdClose size={30} />
    </div>
  )
}
