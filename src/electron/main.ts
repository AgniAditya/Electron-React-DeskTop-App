import {app , BrowserWindow} from 'electron';
import { isDev , ipcMainHandle} from './utils.js'
import { getAppPath, getUIPath } from './pathResolver.js';
import { getStaticData, pollResources } from './resourceManager.js';

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
        mainWindow.loadFile(getUIPath())
    }

    pollResources(mainWindow)

    ipcMainHandle('getStaticData',() => {
        return getStaticData()
    })
})