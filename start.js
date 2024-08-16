const { spawn } = require("child_process");
const path = require("path");

// Khởi động máy chủ Express
const expressServer = spawn("node", [path.join(__dirname, "server.js")]);

expressServer.stdout.on("data", (data) => {
  console.log(`Express stdout: ${data}`);
});

expressServer.stderr.on("data", (data) => {
  console.error(`Express stderr: ${data}`);
});

expressServer.on("close", (code) => {
  console.log(`Express process exited with code ${code}`);
});

// Khởi động ứng dụng Electron sau khi máy chủ Express đã sẵn sàng
expressServer.on("spawn", () => {
  const electronApp = spawn("npm", ["electron", "."]);

  electronApp.stdout.on("data", (data) => {
    console.log(`Electron stdout: ${data}`);
  });

  electronApp.stderr.on("data", (data) => {
    console.error(`Electron stderr: ${data}`);
  });

  electronApp.on("close", (code) => {
    console.log(`Electron process exited with code ${code}`);
  });
});
