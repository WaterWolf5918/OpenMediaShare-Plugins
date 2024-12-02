import type electron from 'electron'
import type { Express } from 'express-serve-static-core'
import 'oms-sharedtypes'
import { TypedEventEmitter } from './types';
interface defaultModules {
    electron: typeof electron
    infoStore: InfoStore
    express: Express
}

export class InfoStore extends TypedEventEmitter<LocalEventTypes> {
    info: VideoMetadata;
    
    
}


type LocalEventTypes = {
    videoUpdated: [
        video: VideoMetadata['data']
    ],
    timeUpdated: [
        time: VideoMetadata['time']
    ]
    authUpdated: [
        auth: VideoMetadata['auth']
    ],
    infoUpdated: [
        info: VideoMetadata
    ],
}