"use strict";
/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-require-imports */
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const path_1 = require("path");
require("./api");
const isDev = process.env.DEV != undefined;
const isPreview = process.env.PREVIEW != undefined;
//Function to create the main window
function createWindow() {
    const mainWindow = new electron_1.BrowserWindow({
        width: 1500,
        height: 1300,
        webPreferences: {
            preload: (0, path_1.join)(__dirname, "preload.js"),
        },
    });
    if (isDev) {
        mainWindow.loadURL("http://localhost:3000");
        mainWindow.webContents.openDevTools();
    }
    else if (isPreview) {
        mainWindow.webContents.openDevTools();
        mainWindow.loadFile("dist/index.html");
    }
    else {
        mainWindow.loadFile("dist/index.html");
    }
}
//Electron app ready
electron_1.app.whenReady().then(() => {
    createWindow();
    //For Mac, keep the app running even after all windows are closed
    electron_1.app.on("activate", () => {
        if (electron_1.BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});
//Quit the app when all windows are closed (except on Mac)
electron_1.app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        electron_1.app.quit();
    }
});
