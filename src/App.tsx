import cn from "classnames";
import React, { useState } from "react";
import { useChain, useSpringRef } from "react-spring";
import DragAndDropFile from "./components/DragAndDropFile";
import DragAndDropZone from "./components/DragAndDropZone";
import PreviewFile from "./components/PreviewFile";
import "./styles/App.css";

function App() {
  const [isDragFile, setIsDragFile] = useState(false);
  const [uploadFile, setUploadFile] = useState<File | null>(null);

  const DropFileApi = useSpringRef();
  const DropZoneApi = useSpringRef();

  useChain(isDragFile ? [DropFileApi, DropZoneApi] : [DropZoneApi, DropFileApi]);

  const dropHandler = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    const file = event.dataTransfer.items
      ? event.dataTransfer.items[0].getAsFile()
      : event.dataTransfer.files[0];

    setUploadFile(file);
    setIsDragFile(false);
  };

  const dragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDragFile = (isDrag: boolean) => {
    if (uploadFile) return;

    setIsDragFile(isDrag);
  };

  return (
    <section className="file-uploader">
      <div
        className={cn("file-uploader__container", {
          "file-uploader__container--drag": isDragFile,
          "file-uploader__container--upload": uploadFile,
        })}
        onDrop={dropHandler}
        onDragOver={dragOver}
        onDragEnter={() => {
          handleDragFile(true);
        }}
        onDragLeave={() => {
          handleDragFile(false);
        }}
      >
        {!uploadFile ? (
          <>
            <DragAndDropFile show={!isDragFile} animationRef={DropFileApi} />
            <DragAndDropZone show={isDragFile} animationRef={DropZoneApi} />
          </>
        ) : (
          <PreviewFile uploadFile={uploadFile} />
        )}
      </div>
    </section>
  );
}

export default App;
