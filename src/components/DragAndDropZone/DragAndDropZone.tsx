import { AiOutlineArrowUp } from "react-icons/ai";
import { animated, config, SpringRef, useSpring } from "react-spring";

import "./DragAndDropZone.css";

interface IDragAndDropZoneProps {
  show: boolean;
  animationRef: SpringRef;
}

const DragAndDropZone = ({ show, animationRef }: IDragAndDropZoneProps) => {
  const stylesIcon = useSpring({
    to: {
      opacity: show ? 1 : 0,
      translateY: show ? "0" : "-50px",
    },
    from: { opacity: 0, translateY: "-50px" },
    config: { ...config.stiff, duration: 200 },
    delay: 100,
  });

  const stylesText = useSpring({
    // to: {
    opacity: show ? 1 : 0,
    translateY: show ? "0" : "50px",
    // },
    from: { opacity: 0, translateY: "50px" },
    config: config.stiff,
  });

  const styles = useSpring({
    to: {
      opacity: show ? 1 : 0,
    },
    from: { opacity: 0 },
    config: { ...config.stiff, duration: 200 },
    ref: animationRef,
  });

  return (
    <animated.div style={styles} className="drag-and-drop-zone">
      <div className="drag-and-drop-zone__container">
        <animated.div style={stylesIcon} className="drag-and-drop-zone__icon">
          <AiOutlineArrowUp />
        </animated.div>
        <animated.span style={stylesText} className="drag-and-drop-zone__text">
          Drop your file to upload
        </animated.span>
      </div>
    </animated.div>
  );
};

export default DragAndDropZone;
