import { app, BrowserWindow } from 'electron';

import './websocket';

let mainWindow: Electron.BrowserWindow | null;

app.on('ready', () => {

    mainWindow = new BrowserWindow({
        autoHideMenuBar: true,

        minWidth: 960,
        width: 960,

        minHeight: 583,
        height: 583,
        webPreferences: {
            nodeIntegration: true,
        },
        // icon: nativeImage.createFromDataURL('icon.png'),
        frame: true,
    });


    if (process.env.NODE_ENV === 'development') {
        mainWindow.loadURL(`http://localhost:3000`);
    } else {
        mainWindow.loadURL('http://localhost:8001');
    }

    mainWindow.on('closed', () => {
        mainWindow = null;
    });

});

