import axios from "axios";
import { useEffect, useState } from "react";
import { env } from "../../env";

export interface FileT {
  id: number;
  filename: string;
  mime_type: string;
  custom_name: string;
}

function ListView() {
  const [files, setFiles] = useState<Array<FileT>>([]);

  useEffect(() => {
    axios
      .get<FileT[]>(`${env.serverHost}/get-files`)
      .then(({ data }) => setFiles(data));
  }, []);

  if (files === undefined) {
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

export default ListView;
