const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: true,
    },
  });

  // Load the React app's build index.html file
  if (process.env.NODE_ENV === 'development') {
    win.loadURL('http://localhost:3000');  // React's dev server URL
  } else {
    // In production, load the React app from the build folder
    win.loadFile(path.join(__dirname, '../build/index.html'));
  }
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});