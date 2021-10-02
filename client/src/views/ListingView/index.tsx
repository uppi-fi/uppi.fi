import { useEffect } from "react";
import { FileT } from "../../schema";
import { useApiService } from "../../services/useApiService";

function ListingView() {
  const { data: files, get: fetch } = useApiService<FileT[]>("get-files");

  useEffect(() => {
    fetch();
  }, []);

  if (!files) {
    return <>Loading files...</>;
  }

  return (
    <div>
      {files.map(({ filename }, i) => (
        <div key={i}>{filename}</div>
      ))}
    </div>
  );
}

export default ListingView;
