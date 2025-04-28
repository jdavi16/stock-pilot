/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-require-imports */

import { app, BrowserWindow } from "electron";
import { join } from "path";

import "./api";

const isDev = process.env.NODE_ENV != undefined;

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
    console.log("Running in development mode");
    mainWindow.loadURL("http://localhost:5173");
    mainWindow.webContents.openDevTools();
  } else {
    console.log("Running in production mode");
    mainWindow.loadFile(join(__dirname, "../index.html"));
  }

//For Debugging
  mainWindow.webContents.on('did-fail-load', (event, errorCode, errorDescription) => {
    console.log("Page failed to load: ", errorCode, errorDescription)
  })
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
  })

