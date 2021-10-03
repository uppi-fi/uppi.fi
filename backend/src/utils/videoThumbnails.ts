import { path as ffmpegPath } from "@ffmpeg-installer/ffmpeg";
// @ts-ignore
import { path as ffprobePath } from "@ffprobe-installer/ffprobe";
import { FileT } from "@shared/schema";
import * as ffmpeg from "fluent-ffmpeg";
import * as path from "path";
import { getFileLocalPath } from "./file";

ffmpeg.setFfmpegPath(ffmpegPath);
ffmpeg.setFfprobePath(ffprobePath);

const THUMBNAIL_FILENAME = "thumbnail.png";

export const getVideoDuration = (inputPath: string) => {
  return new Promise<number>((resolve, reject) => {
    return ffmpeg.ffprobe(inputPath, (error, videoInfo) => {
      if (error) {
        return reject(error);
      }

      return resolve(Math.floor(videoInfo.format.duration || 0));
    });
  });
};

export async function generateVideoThumbnail(file: FileT) {
  const videoPath = getFileLocalPath(file);
  const videoDir = path.dirname(videoPath);
  const duration = await getVideoDuration(videoPath);
  ffmpeg(videoPath)
    .takeScreenshots(
      {
        count: 1,
        timemarks: [duration], // number of seconds
        filename: THUMBNAIL_FILENAME,
      },
      path.dirname(videoPath),
    )
    .on("end", function () {
      console.log(
        `Generated video thumbnail: ${path.join(videoDir, THUMBNAIL_FILENAME)}`,
      );
    });
}
