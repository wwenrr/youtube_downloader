const YTDlpWrap = require("yt-dlp-wrap").default;
const ytDlpWrap = new YTDlpWrap("./yt-dlp.exe");
const { spawn } = require("child_process");
const ffmpegPath = require("ffmpeg-static");
const fs = require("fs");

const command = "yt-dlp";
const videoUrl = "https://www.youtube.com/watch?v=ISz-xqoOObc";

const args = [
  videoUrl,
  "-f",
  "bestvideo[height<=720]+bestaudio/best[height<=720]",
  "--audio-quality",
  "best",
  "--merge-output-format",
  "mp4",
  "-o",
  `D:/backend0/audio/%(title)s`,
  "--ffmpeg-location",
  ffmpegPath,
];

let ytDlpProcess = spawn(command, args);

ytDlpProcess.stdout.on("data", (data) => {
  console.log(`stdout: ${data}`);
});

ytDlpProcess.stderr.on("data", (data) => {
  console.error(`stderr: ${data}, Retrying...`);
});

ytDlpProcess.on("close", (code) => {
  console.log(`child process exited with code ${code}`);
});
