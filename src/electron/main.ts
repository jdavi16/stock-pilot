/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-require-imports */

import { app, BrowserWindow } from "electron";
import { join } from "path";

import "./api";

const isDev = process.env.DEV != undefined;
const isPreview = process.env.PREVIEW != undefined;

//Function to create the main window
function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1500,
    height: 1300,
    webPreferences: {
      preload: join(__dirname, "preload.js"),
    },
  });

  if (isDev) {
    mainWindow.loadFile("../../index.html");
    mainWindow.loadURL("http://localhost:3000");
    mainWindow.webContents.openDevTools();
  } else if (isPreview) {
    mainWindow.webContents.openDevTools();
    mainWindow.loadFile("dist/index.html");
  } else {
    mainWindow.loadFile("dist/index.html");
  }
}

//Electron app ready
app.whenReady().then(() => {
  createWindow();

  //For Mac, keep the app running even after all windows are closed
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

//Quit the app when all windows are closed (except on Mac)
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
