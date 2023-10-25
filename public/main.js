const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1000,
        height: 1500,
        icon: 'src/Designs/Images/HydotLogo.ico',
        y:100
    });

    // Set the background color in the loaded web page
    mainWindow.loadURL('http://localhost:3000');
    mainWindow.on('closed', function () {
        mainWindow = null;
    });

    // Emitted when the window is ready to show
    mainWindow.on('ready-to-show', () => {
        mainWindow.webContents.insertCSS(`body { background-color: #26293C; }`);
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', function () {
    if (mainWindow === null) {
        createWindow();
    }
});
