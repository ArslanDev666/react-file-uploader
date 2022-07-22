import cn from "classnames";
import React, { useState } from "react";
import { useChain, useSpringRef } from "react-spring";
import DragAndDropFile from "./components/DragAndDropFile";
import DragAndDropZone from "./components/DragAndDropZone";
import "./styles/App.css";

function App() {
  const [isDragFile, setIsDragFile] = useState(false);
  const [uploadFile, setUploadFile] = useState<File | DataTransferItem | null>(null);

  const DropFileApi = useSpringRef();
  const DropZoneApi = useSpringRef();

  useChain(isDragFile ? [DropFileApi, DropZoneApi] : [DropZoneApi, DropFileApi]);

  const dropHandler = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.items ? event.dataTransfer.items[0] : event.dataTransfer.files[0];
    setUploadFile(file);

    setIsDragFile(false);
  };

  const dragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <section className="file-uploader">
      <div
        className={cn("file-uploader__container", isDragFile && "file-uploader__container--drag")}
        onDrop={dropHandler}
        onDragOver={dragOver}
        onDragEnter={() => {
          setIsDragFile(true);
        }}
        onDragLeave={() => {
          setIsDragFile(false);
        }}
      >
        {!uploadFile ? (
          <>
            <DragAndDropFile show={!isDragFile} animationRef={DropFileApi} />
            <DragAndDropZone show={isDragFile} animationRef={DropZoneApi} />
          </>
        ) : null}
      </div>
      {/* <button onClick={() => setIsDrag(!isDrag)}>click</button> */}
    </section>
  );
}

export default App;
