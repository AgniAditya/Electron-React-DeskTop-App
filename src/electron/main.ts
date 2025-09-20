import {app , BrowserWindow} from 'electron';
import path from 'path'
import { isDev } from './utils.js'
import { getAppPath } from './pathResolver.js';
import { pollResources } from './resourceManager.js';

app.on('ready', () => {
    const mainWindow = new BrowserWindow({
        webPreferences: {
            preload: getAppPath()
        }
    })
    if(isDev()){
        mainWindow.loadURL('http://localhost:8000');
    }
    else{
        mainWindow.loadFile(path.join(app.getAppPath(),'/dist-react/index.html'))
    }

    pollResources()
})