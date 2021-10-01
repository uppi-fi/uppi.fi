import "rc-tooltip/assets/bootstrap.css";
import { useState } from "react";
import { copyToClipboard } from "../../utils/clipboard";
import IconButton from "../IconButton";

interface CopyButtonProps {
  textToCopy: string;
}

function CopyButton({ textToCopy }: CopyButtonProps) {
  const [wasCopied, setWasCopied] = useState(false);

  const onClick = async () => {
    const success = await copyToClipboard(textToCopy);

    if (success) {
      setWasCopied(true);
      setTimeout(() => {
        setWasCopied(false);
      }, 1000);
    }
  };

  return (
    <IconButton
      icon="fa-solid:link"
      tooltip={wasCopied ? "Jees ✔️" : "Kopioi linkki"}
      onClick={onClick}
    />
  );
}

export default CopyButton;
