import { useEffect } from "react";
import FileCard from "../../components/FileCard";
import { FileT } from "../../schema";
import { useApiService } from "../../services/useApiService";
import styles from "./ListingView.module.scss";

function ListingView() {
  const { data: files, get: fetch } = useApiService<FileT[]>("get-files");

  useEffect(() => {
    fetch();
  }, []);

  if (!files) {
    return <>Loading files...</>;
  }

  return (
    <div className={styles.root}>
      {files.map((file, i) => (
        <FileCard key={i} file={file} />
      ))}
    </div>
  );
}

export default ListingView;
