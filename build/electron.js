const { app, BrowserWindow } = require('electron');
const path = require('path');
const fs = require('fs');

const inventoryPath = path.join(app.getPath('userData'), 'inventory.json');

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

ipcMain.handle('inventory:load', () => {
  try {
    if (fs.existsSync(inventoryPath)) {
      const raw = fs.readFileSync(inventoryPath, 'utf8');
      return JSON.parse(raw);
    }
    return [];
  } catch (e) {
    console.error('Error loading inventory:', e);
    return [];
  }
});

// IPC: save inventory
ipcMain.handle('inventory:save', (event, data) => {
  try {
    fs.writeFileSync(inventoryPath, JSON.stringify(data, null, 2));
  } catch (e) {
    console.error('Error saving inventory:', e);
  }
});

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});