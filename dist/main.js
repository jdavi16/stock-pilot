"use strict";
/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-require-imports */
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const path_1 = require("path");
require("./api");
const isDev = process.env.NODE_ENV != undefined;
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
        console.log("Running in development mode");
        mainWindow.loadURL("http://localhost:5173");
        mainWindow.webContents.openDevTools();
    }
    else {
        console.log("Running in production mode");
        mainWindow.loadFile((0, path_1.join)(__dirname, "../index.html"));
    }
    //For Debugging
    mainWindow.webContents.on('did-fail-load', (event, errorCode, errorDescription) => {
        console.log("Page failed to load: ", errorCode, errorDescription);
    });
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
