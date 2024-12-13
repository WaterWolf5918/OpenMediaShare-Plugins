import { defaultModules, PluginConfigHelper } from './index';
// import * as DiscordRPC from 'discord-rpc';

import { Client } from "@xhayper/discord-rpc";
export const info = {
    name: 'WatchRPC',
    auther: 'WaterWolf5918',
    version: 0.1,
    configBuilder: {
        pages: {
            Main: [
                {id:'useServiceName',displayName: 'Use Service Name', type: 'checkbox', required: true, default: true},
                {id:'clientId',displayName: 'Discord Client ID', type: 'text', required: true, default: '995095535709081670'},
                {id:'overrideSpotify',displayName: 'Override Spotify', type: 'checkbox', required: true, default: false}
            ]
        }
    },
    // config: {
    //     useServiceName: true,
    //     // clientId: '1279158270182948895'
    //     clientId: '995095535709081670',
    //     overrideSpotify: true
    // }
}

// const rpc = new Client({ clientId: info.config.clientId });
let lastUpdate
let client: Client;

export const start = function(modules: defaultModules){
    console.log('[WatchRPC] Hello World!')
    lastUpdate = Date.now();

}

export const infoUpdate = function(modules: defaultModules, metadata: VideoMetadata, configHelper: PluginConfigHelper){
    const start = Math.round(Date.now() / 1000)
    const end = start + (metadata.time.totalTime * 1000)
    const service = serviceByService(metadata.auth.service,configHelper.get('overrideSpotify'));
    const now = Date.now();
    if (((now - lastUpdate) / 1000) <= 5) {return}

    if (!client){
        client = new Client({ clientId: configHelper.get('clientId') })
        client.login();
    }
    if (configHelper.get('useServiceName') && client.clientId !== service.id ){
        client.destroy();
        client = new Client({ clientId: service.id })
        client.login();
    }
    
    client.user?.setActivity({
        details: `${metadata.data.title}`,
        state: `${metadata.data.creator} [⏵]`,
        largeImageKey: `${metadata.data.thumbnail}`,
        smallImageKey: metadata.data.thumbnail2 ?? 'ytlogo4',
        smallImageText: 'WatchRPC (OpenMediaShare)',
        largeImageText: `${metadata.time.formattedTime} | ${Math.round(
            metadata.time.timePercent,
        )}%`,
        buttons: [{ label: 'Watch Video', url: `${metadata.data.url}` }],
        instance: false,
        // metadata is stored in seconds so we need to convert that to millseconds before using it for timestamps
        "startTimestamp": now - (metadata.time.curruntTime * 1000),
        // idk why but this fixes discord timestamps difting 
        "endTimestamp": now + ((metadata.time.totalTime * 1000) - (metadata.time.curruntTime * 1000)),
        "type": service.type,
    })
    lastUpdate = Date.now();
}


export const stateUpdate = function (modules: defaultModules, playerState: PlayerState, configHelper: PluginConfigHelper) {
    // console.log(playerState);
    const metadata = modules.infoStore.info;
    const now = Date.now();
    const service = serviceByService(metadata.auth.service,configHelper.get('overrideSpotify'));
    let icon;
    switch (playerState){
        case 'playing':
        icon = '⏵';
        break;
        case 'paused':
        icon = '⏸';
        break;
        case 'unknown':
        icon = '?';
        break;
    }
    client.user?.setActivity({
        details: `${metadata.data.title}`,
        state: `${metadata.data.creator} [${icon}]`,
        largeImageKey: `${metadata.data.thumbnail}`,
        smallImageKey: metadata.data.thumbnail2 ?? 'ytlogo4',
        smallImageText: 'WatchRPC (OpenMediaShare)',
        largeImageText: `${metadata.time.formattedTime} | ${Math.round(
            metadata.time.timePercent,
        )}%`,
        buttons: [{ label: 'Watch Video', url: `${metadata.data.url}` }],
        instance: false,
        // metadata is stored in seconds so we need to convert that to millseconds before using it for timestamps

        "type": service.type,
    })
}

function serviceByService(service: 'spicetify' | 'youtubeUserscript' | string, overrideSpotify){
    switch (service){
        case 'spicetify':
            if (overrideSpotify){
                return {type: 2, label: 'Spotify', id: '1313101111044870144'}
            }
            return {type: 2, label: 'WatchRPC',id: '995095535709081670'}
        break;
        case 'youtubeEmbedUserscript':
            return {type: 3, label: 'Youtube',id: '1313100797969694732'}
        case 'youtubeUserscript':
            return {type: 3, label: 'Youtube',id: '1313100797969694732'}
        break;
        default: 
            return {type: 0, label: 'WatchRPC',id: '995095535709081670'}
    }
}


export const stop = function(){
    // rpc.clearActivity()
    console.log('[WatchRPC] Goodbye World!')
}