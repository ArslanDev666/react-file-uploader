import React from "react";

import { AiFillPicture } from "react-icons/ai";
import { animated, config, SpringRef, useSpring } from "react-spring";

import "./DragAndDropFile.css";

interface IDragAndDropFileProps {
  show: boolean;
  animationRef: SpringRef;
}

const DragAndDropFile = ({ show, animationRef }: IDragAndDropFileProps) => {
  const styles = useSpring({
    to: {
      opacity: show ? 1 : 0,
    },
    from: { opacity: 0 },
    config: { ...config.stiff, duration: 100 },
    ref: animationRef,
  });

  return (
    <animated.div style={styles} className="drag-and-drop-preview">
      <div className="drag-and-drop-preview__icon">
        <AiFillPicture />
      </div>
      <span className="drag-and-drop-preview__text">Drag & drop a file to upload</span>
    </animated.div>
  );
};

export default DragAndDropFile;
