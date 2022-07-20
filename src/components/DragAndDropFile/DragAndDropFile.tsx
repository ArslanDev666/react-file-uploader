import React from 'react'

import { AiFillPicture } from "react-icons/ai";

import './DragAndDropFile.css'

const DragAndDropFile = () => {
  return (
    <div className='drag-and-drop-preview'>
      <div className="drag-and-drop-preview__icon">
        <AiFillPicture />
      </div>
      <span className="drag-and-drop-preview__text">
        Drag & drop a file to upload
      </span>
    </div>
  )
}

export default DragAndDropFile