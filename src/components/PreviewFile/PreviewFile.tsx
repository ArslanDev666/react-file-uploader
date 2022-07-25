import React, { useCallback, useEffect, useState } from "react";

import { FcFile } from "react-icons/fc";
import { animated, useSpring } from "react-spring";

import "./PreviewFile.css";

interface IPreviewFileProps {
  uploadFile: File | null;
}

const PreviewFile = ({ uploadFile }: IPreviewFileProps) => {
  const [preview, setPreview] = useState<string | null>();
  const [name, setName] = useState<string | null>();

  const props = useSpring({ width: name ? 500 : 0, config: { duration: 4000 } });

  const snapImage = function (video: HTMLVideoElement, url: string) {
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d")?.drawImage(video, 0, 0, canvas.width, canvas.height);

    const image = canvas.toDataURL();
    const success = image.length > 100000;

    if (success) {
      setPreview(image);
      URL.revokeObjectURL(url);
    }
    return success;
  };

  const onLoadFile = useCallback((fileReader: FileReader, uploadFile: File) => {
    const blob = new Blob([fileReader.result as string], { type: uploadFile.type });
    const url = URL.createObjectURL(blob);
    const video = document.createElement("video");

    const timeupdate = function () {
      if (snapImage(video, url)) {
        video.removeEventListener("timeupdate", timeupdate);
        video.pause();
      }
    };

    video.addEventListener("loadeddata", function () {
      if (snapImage(video, url)) {
        video.removeEventListener("timeupdate", timeupdate);
      }
    });
    video.addEventListener("timeupdate", timeupdate);

    video.preload = "metadata";
    video.src = url;
    video.muted = true;
    video.playsInline = true;
    video.play();
    video.remove();
  }, []);

  useEffect(() => {
    if (!uploadFile) return;
    setName(uploadFile.name);

    if (!uploadFile.type.includes("image")) {
      const fileReader = new FileReader();
      fileReader.onload = () => onLoadFile(fileReader, uploadFile);
      fileReader.readAsArrayBuffer(uploadFile);
      return;
    }

    const preview = URL.createObjectURL(uploadFile);
    setPreview(preview);
  }, [onLoadFile, uploadFile]);

  return (
    <div className="preview-file">
      <div className="preview-file__image">{preview ? <img src={preview} alt="..." /> : <FcFile />}</div>
      <div className="preview-file__container">
        <animated.div className="preview-file__progress" style={props} />
        <div className="preview-file__info">
          <h3 title={name || ""}>{name}</h3>
          <div className="preview-file__info-progress">
            <animated.span>{props.width.to((x) => ((x / 500) * 100).toFixed(0))}</animated.span>
            <span>%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewFile;
