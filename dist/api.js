"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
electron_1.ipcMain.handle("node-version", (event, msg) => {
    console.log(event);
    console.log(msg);
    return process.versions.node;
});
