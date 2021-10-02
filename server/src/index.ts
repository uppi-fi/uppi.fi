import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { downloadRoute } from "./routes/download";
import { getFileRoute } from "./routes/getFile";
import { getFilesRoute } from "./routes/getFiles";
import { uploadRoute } from "./routes/upload";
import { visitRoute } from "./routes/visit";

dotenv.config();

const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.static("uploads"));

getFileRoute(app);
getFilesRoute(app);
uploadRoute(app);
downloadRoute(app);
visitRoute(app);

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
