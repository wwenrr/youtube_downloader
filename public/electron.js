const { app, BrowserWindow, protocol } = require("electron");
const url = require("url");
const path = require("path");
const { spawn } = require("child_process");

function createMainWindow() {
  const mainWindow = new BrowserWindow({
    title: "YTB",
    width: 1000,
    height: 600,
  });

  const startUrl = url.format({
    pathname: path.join(__dirname, "./app/build/index.html"),
    protocol: "file",
  });

  const devUrl = "http://localhost:3000/";

  const serverProcess = spawn("node", [path.join(__dirname, "sever.js")], {
    stdio: "inherit",
    cwd: __dirname,
  });

  mainWindow.loadURL(startUrl);
}

app.whenReady().then(createMainWindow);
