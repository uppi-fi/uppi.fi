import { Icon } from "@iconify/react";
import Tooltip from "rc-tooltip";
import { useState } from "react";
import { useLocation } from "wouter";
import { FileT } from "../../schema";
import { isImageFile, isVideoFile } from "../../utils/mimetype";
import { getFileUrl, getVideoPreviewUrl } from "../../utils/url";
import styles from "./FileCard.module.scss";

interface FileCardProps {
  file: FileT;
}

function FileCard({ file }: FileCardProps) {
  const [, setLocation] = useLocation();
  const [filenameValue, setFilenameValue] = useState(file.filename);
  const fileUrl = getFileUrl(file);

  const renderIcon = () => {
    if (isImageFile(file)) {
      return <img src={fileUrl} alt={file.filename} />;
    }

    if (isVideoFile(file)) {
      console.log("heh", getVideoPreviewUrl(file));
      return <img src={getVideoPreviewUrl(file)} alt={file.filename} />;
    }

    return (
      <Tooltip
        placement="top"
        overlay={`Tyyppi: ${file.mimeType}`}
        mouseLeaveDelay={0}
        arrowContent={<div className="rc-tooltip-arrow-inner"></div>}
      >
        <Icon icon="ant-design:file-twotone" />
      </Tooltip>
    );
  };
  return (
    <div className={styles.root}>
      <div className={styles.content}>
        <div className={styles.icon} onClick={() => setLocation(`/${file.id}`)}>
          {renderIcon()}
        </div>
        <div className={styles.fileDetails}>
          <input
            type="text"
            value={filenameValue}
            onChange={(evt) => {
              const { value } = evt.currentTarget;
              setFilenameValue(value);
              // TODO: Update custom_name
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default FileCard;
