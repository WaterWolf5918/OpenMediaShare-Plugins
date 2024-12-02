import { defaultModules } from './index';
// import * as DiscordRPC from 'discord-rpc';

import { Client } from "@xhayper/discord-rpc";
export const info = {
    name: 'WatchRPC',
    auther: 'WaterWolf5918',
    config: {
        useServiceName: false,
        // clientId: '1279158270182948895'
        clientId: '995095535709081670'
    }
}

// const rpc = new Client({ clientId: info.config.clientId });
let client: Client;
export const start = function(modules: defaultModules){
    console.log('[WatchRPC] Hello World!')




    // .catch(() => {
    //     // PushError("[DiscordRPC] RPC login failed. Is discord open ?",err.toString())
    //     console.log('[WatchRPC] RPC login failed, Please Forgive me :(')
    //     // console.log('[WatchRPC] Stopping Plugin')
    //     // stop();
    //     // return 1
    // })


    // rpc.on('ready',() => {
    //     console.log(`[WatchRPC] Logged in as ${rpc.user.username}`)
    // })



    // rpc.login()
}

export const infoUpdate = function(modules: defaultModules, metadata: VideoMetadata){
    const start = Math.round(Date.now() / 1000)
    const end = start + (metadata.time.totalTime * 1000)
    const service = serviceByService(metadata.auth.service);
    if (!client){
        client = new Client({ clientId: info.config.clientId })
        client.login();
    }
    if (client.clientId !== service.id){
        client.destroy();
        client = new Client({ clientId: service.id })
        client.login();
    }
    const now = Date.now();
    console.log(metadata.time);
    client.user?.setActivity({
        //@ts-ignore
        name: 'test',
        details: `${metadata.data.title}`,
        state: `By ${metadata.data.creator}`,
        largeImageKey: `${metadata.data.thumbnail}`,
        smallImageKey: 'ytlogo4',
        smallImageText: 'WatchRPC (OpenMediaShare)',
        largeImageText: `${metadata.time.formattedTime} | ${Math.round(
            metadata.time.timePercent,
        )}%`,
        buttons: [{ label: 'Watch Video', url: `${metadata.data.url}` }],
        instance: false,
        // metadata is stored in seconds so we need to convert that to millseconds before using it for timestamps
        "startTimestamp": now - metadata.time.curruntTime * 1000,
        "endTimestamp": now + metadata.time.totalTime * 1000,
        "type": service.type,

    })


}


function serviceByService(service: 'spicetify' | 'youtubeUserscript' | string){
    switch (service){
        case 'spicetify':
            return {type: 2, label: 'Spotify', id: '1313101111044870144'}
        break;
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