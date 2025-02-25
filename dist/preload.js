"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.backend = void 0;
const electron_1 = require("electron");
exports.backend = {
    nodeVersion: async (msg) => await electron_1.ipcRenderer.invoke("node-version", msg),
};
electron_1.contextBridge.exposeInMainWorld("backend", exports.backend);
