const YTDlpWrap = require("yt-dlp-wrap").default;
const ytDlpWrap = new YTDlpWrap("./yt-dlp.exe");
const { spawn } = require("child_process");
const ffmpegPath = require("ffmpeg-static");
const fs = require("fs");

const command = "yt-dlp";
const videoUrl = "https://www.youtube.com/watch?v=8aQ-VJuf-mg";

function fool(url, output) {
  return new Promise((resolve, reject) => {
    const args = [
      url,
      "-f",
      "bestvideo[height<=720]+bestaudio/best[height<=720]",
      "--audio-quality",
      "best",
      "--merge-output-format",
      "mp4",
      "-o",
      output,
      "--ffmpeg-location",
      ffmpegPath,
    ];

    let ytDlpProcess = spawn(command, args);

    ytDlpProcess.stdout.on("data", (chunk) => {
      console.log(chunk.toString());
    });

    ytDlpProcess.stderr.on("data", (chunk) => {
      console.log(chunk.toString());
    });

    ytDlpProcess.on("close", (code) => {
      if (code === 0) {
        resolve("Success");
      } else {
        reject(new Error(`Process exited with code ${code}`));
      }
    });
  })
    .then((data) => {
      return "successfully";
    })
    .catch((error) => {
      return "fail";
    });
}

// fool(videoUrl, "D:/backend0/audio/%(title)s.mp4"); // Đảm bảo đường dẫn đầu ra đúng cách

module.exports = { fool };
