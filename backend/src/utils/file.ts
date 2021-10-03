import { FileT } from "@shared/schema";
import * as path from "path";

export function getFileLocalPath(file: FileT) {
  return path.join("uploads", file.id, file.filename);
}
