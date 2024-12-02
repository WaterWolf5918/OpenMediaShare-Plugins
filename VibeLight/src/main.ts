import { defaultModules, pluginConfigHelper as PluginConfigHelper, VideoMetadata } from './index';
import Vibrant = require('node-vibrant')

export const info = {
    name: 'VibeLight',
    auther: 'WaterWolf5918',
    configBuilder: {
        pages: {
            'Main': [
                {id:'ha_url',displayName: 'Home Assistent URL', type: 'text', required: true, default: 'http://homeassistant.local:8123'},
                {id:'ha_token',displayName: 'Home Assistent API Token', type: 'text', required: true},
                {id:'palette',displayName: 'Palette:', type: 'dropdown', choices: ['Vibrant', 'DarkVibrant', 'LightVibrant', 'Muted','DarkMuted','LightMuted'], required: true, default: 'Muted'},
                {id:'preferConfig',displayName: 'Use Config Colors', type: 'checkbox', required: false},
                {id:'preferEmbed',displayName: 'Use Embedded Colors', type: 'checkbox', required: false}
            ]
        }
    }
}
let currentSong;
export const start = function(modules: defaultModules, configHelper: PluginConfigHelper){

}

export const infoUpdate = function(modules: defaultModules, metadata: VideoMetadata, configHelper: PluginConfigHelper){
    if (configHelper.get('_internal_currentSong') == metadata.video.title) return;
    configHelper.set('_internal_currentSong',metadata.video.title);
    console.log('[VibeLight] New Song Detected Getting Color...')
    console.log(`[VibeLight] Palette: ${configHelper.get('palette')}`);

    if(configHelper.get('perferConfig') == false){
        console.log(`[VibeLight] Using Color From Image Extracter`)
        const v = new Vibrant(metadata.video.thumbnail, {'quality': 4});
        v.getPalette((err,palette) => {
            console.log(`[VibeLight] Got Color: ${palette[configHelper.get('palette')].rgb}`)
            setHALightsByRGB(palette[configHelper.get('palette')].rgb, configHelper)
        })
    } else {
        const internalJSON = configHelper.get('_internal_SongColors');
        if (internalJSON[`${metadata.video.title}-${metadata.video.creator}`] == undefined){
            console.log(`[VibeLight] Using Color From Image Extracter Because Config Value Null`)
            internalJSON[`${metadata.video.title}-${metadata.video.creator}`] = {rgb:[]}
            configHelper.set('_internal_SongColors',internalJSON)
            const v = new Vibrant(metadata.video.thumbnail, {'quality': 4});
            v.getPalette((err,palette) => {
                console.log(`[VibeLight] Got Color: ${palette[configHelper.get('palette')].rgb}`)
                setHALightsByRGB(palette[configHelper.get('palette')].rgb, configHelper)
            });
        } else if (internalJSON[`${metadata.video.title}-${metadata.video.creator}`].rgb.length == 3){
            console.log(`[VibeLight] Using Color From Config`)
            setHALightsByRGB(internalJSON[`${metadata.video.title}-${metadata.video.creator}`].rgb,configHelper)
        } else if (internalJSON[`${metadata.video.title}-${metadata.video.creator}`].rgb.length == 0) {
            console.log(`[VibeLight] Using Color From Image Extracter Because Config Value Null`)
            internalJSON[`${metadata.video.title}-${metadata.video.creator}`] = {rgb:[]}
            configHelper.set('_internal_SongColors',internalJSON)
            const v = new Vibrant(metadata.video.thumbnail, {'quality': 4});
            v.getPalette((err,palette) => {
                console.log(`[VibeLight] Got Color: ${palette[configHelper.get('palette')].rgb}`)
                setHALightsByRGB(palette[configHelper.get('palette')].rgb, configHelper)
            });
            // console.log(`[VibeLight] Config ERROR`)
            // console.log(`[VibeLight] Config ${internalJSON[`${metadata.video.title}-${metadata.video.creator}`].rgb.length}`)
        }
    }

}



async function setHALightsByRGB(rgb: [number, number, number],configHelper: PluginConfigHelper){
    const body = {
        "entity_id": "light.all_room_lights",
        "rgb_color": rgb
    }

    await fetch(`${configHelper.get('ha_url')}/api/services/light/turn_on`,
        {method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": configHelper.get('ha_token')
        },
        "body": JSON.stringify(body)
    })
}


export const stop = function(){
    console.log('Goodbye World!')
}