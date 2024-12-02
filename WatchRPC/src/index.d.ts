import type electron from 'electron'
import type { Express } from 'express-serve-static-core'
import 'oms-sharedtypes'
import { TypedEventEmitter } from './types';
interface defaultModules {
    electron: typeof electron
    store: TypedEventEmitter<LocalEventTypes>
    express: Express
}




type LocalEventTypes = {
    videoUpdated: [
        video: VideoMetadata['data']
    ],
    timeUpdated: [
        time: VideoMetadata['time']
    ]
    extraUpdated: [
        extra: VideoMetadata['auth']
    ],
    infoUpdated: [
        info: VideoMetadata
    ],
}