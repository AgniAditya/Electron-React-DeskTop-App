import { app } from "electron"
import { isDev } from "./utils.js"
import path from 'path'

export function getAppPath() : string {
    return path.join(
        app.getAppPath(),
        isDev() ? '.' : '..',
        'dist-electron/preload.cjs'
    )
}

export function getUIPath() {
    return path.join(app.getAppPath(),'/dist-react/index.html')
}