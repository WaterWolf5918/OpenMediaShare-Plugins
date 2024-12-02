import type electron from 'electron'
import type { Express } from 'express-serve-static-core'
import { TypedEventEmitter } from './types';
interface defaultModules {
    electron: typeof electron
    store: TypedEventEmitter<LocalEventTypes>
    express: Express
}

interface pluginConfigHelper {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    get: (key: string) => any
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    set: (key: string, value: any) => void
}


interface VideoMetadata {
    video: {
        creator: string;
        title: string;
        views?: string;
        likes?: string;
        thumbnail: string;
        url: string;
    };
    time: {
        curruntTime: number;
        totalTime: number;
        timePercent: number;
        formattedTime: string;
    };
    extra: {
        platform: string;
        uuid: string;
        browser: string;
    };
}

type LocalEventTypes = {
    videoUpdated: [
        video: VideoMetadata['video']
    ],
    timeUpdated: [
        time: VideoMetadata['time']
    ]
    extraUpdated: [
        extra: VideoMetadata['extra']
    ],
    infoUpdated: [
        info: VideoMetadata
    ],
}