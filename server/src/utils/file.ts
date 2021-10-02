import * as path from "path";
import { FileT } from "../schema";

export function getFileLocalPath(file: FileT) {
  return path.join("uploads", file.id, file.filename);
}
