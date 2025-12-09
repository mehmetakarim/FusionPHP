const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');
const PHPServer = require('./FusionServer');

// Handle Squirrel events for Windows installer
if (require('electron-squirrel-startup')) return app.quit();

let mainWindow;
let server;

// PHP SERVER CONFIGURATION
server = new PHPServer({
  port: 5555,
  directory: path.join(__dirname, 'framework'),
  directives: {
    display_errors: 1,
    expose_php: 1
  }
});

function createWindow() {
  // Start PHP Server
  server.run();

  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false, // Security: Disable node integration in renderer
      contextIsolation: true, // Security: Enable context isolation

    }
  });

  // Load the PHP server URL
  mainWindow.loadURL('http://' + server.host + ':' + server.port + '/');

  // Open the DevTools (optional)
  // mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    mainWindow = null;
    server.close();
  });
}

// Electron Application Lifecycle
app.whenReady().then(() => {
  createWindow();

  // macOS: Re-create window if dock icon is clicked
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });

  // macOS Menu
  if (process.platform === 'darwin') {
    const template = [{
      label: 'Application',
      submenu: [
        { label: 'Quit', accelerator: 'CmdOrCtrl+Q', click: () => app.quit() }
      ]
    }, {
      label: 'Edit',
      submenu: [
        { label: 'Undo', accelerator: 'CmdOrCtrl+Z', selector: 'undo:' },
        { label: 'Redo', accelerator: 'Shift+CmdOrCtrl+Z', selector: 'redo:' },
        { type: 'separator' },
        { label: 'Cut', accelerator: 'CmdOrCtrl+X', selector: 'cut:' },
        { label: 'Copy', accelerator: 'CmdOrCtrl+C', selector: 'copy:' },
        { label: 'Paste', accelerator: 'CmdOrCtrl+V', selector: 'paste:' },
        { label: 'Select All', accelerator: 'CmdOrCtrl+A', selector: 'selectAll:' }
      ]
    }];
    Menu.setApplicationMenu(Menu.buildFromTemplate(template));
  }
});

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    server.close();
    app.quit();
  }
});
