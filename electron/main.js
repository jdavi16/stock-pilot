const { app, BrowserWindow } = require("electron");
const path = require("path");

let mainWindow;

//Function to create the main window
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1500,
    height: 1300,
    icon: path.join(__dirname, "../public/app-icon.png"),
    webPreferences: {
      nodeIntegration: true,
    },
  });

  //Load the React app's development server
  mainWindow.loadURL("http://localhost:3000");
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
