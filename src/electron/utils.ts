import { ipcMain, WebContents, WebFrameMain } from "electron"
import { getUIPath } from "./pathResolver.js"
import { pathToFileURL } from 'node:url'

export function isDev() : boolean {
    return process.env.NODE_ENV === 'development'
}

export function ipcMainHandle<Key extends keyof EventPayloadMapping>(
    key : Key,
    handler: () => EventPayloadMapping[Key]
) {
    ipcMain.handle(key, (event) => {
        if(event.senderFrame === null) return
        validateEventFrame(event.senderFrame)
        return handler()
    })
}

export function ipcWebContentsSend<Key extends keyof EventPayloadMapping>(
    key : Key,
    webcontent : WebContents,
    payload : EventPayloadMapping[Key]
){
    webcontent.send(key,payload)
}

export function validateEventFrame(frame : WebFrameMain) {
    console.log(frame.url);
    
    if(isDev() && new URL(frame.url).host === 'localhost:8000') return;

    if(frame.url !== pathToFileURL(getUIPath()).toString()){
        throw new Error('Malicious event')
    }
}