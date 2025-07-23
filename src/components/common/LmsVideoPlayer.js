'use client';

import React, {useEffect, useRef, useState} from 'react';
import Plyr from 'plyr-react';

import {getSubtitleLanguages} from "@/utils/helpers/CommonHelper";
function formatMyTime(seconds) {
    if (!seconds || Number.isNaN(seconds)) return '00:00';
    const sec = Math.floor(seconds % 60).toString().padStart(2, '0');
    const min = Math.floor((seconds / 60) % 60).toString().padStart(2, '0');
    const hrs = Math.floor(seconds / 3600);
    if (hrs > 0) {
        return `${hrs.toString().padStart(2, '0')}:${min}:${sec}`;
    } else {
        return `${min}:${sec}`;
    }
}


export default function LmsVideoPlayer({video}) {
    const languages =  getSubtitleLanguages()
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(video?.file?.playbackTime);



    const getLanguageLabel = (language) => {
        return languages.find(lang => lang.id === language)?.name ;
    }

    const playerRef = useRef(null);
    useEffect(() => {
        if (video && playerRef.current?.plyr) {
            setTimeout(() => {
                const plyrInstance = playerRef.current.plyr;
                const handleReady = () => {
                    plyrInstance.autoplay = false;
                    playerMounted(plyrInstance);
                };

                if (plyrInstance.ready) {
                    handleReady();
                    // Listen for time updates


                } else {
                    plyrInstance.on('ready', handleReady);
                }
            }, 100)
        }
    }, [video]);

    const playerMounted = (player) => {
        player.on('timeupdate', ()=>{
            setCurrentTime(player.currentTime)
        });
    }


    const videoSource = {
        type: "video",
        sources: [
            {
                src: video?.url,
                type: "video/mp4",
            }
        ],
        tracks: video?.subtitles
            ? video.subtitles.map(sub => ({
                kind: "subtitles",
                label: getLanguageLabel(sub.language) || sub.language,
                srcLang: sub.language,
                src: sub.url,
                default: sub.default || false,
            }))
            : [],
    };


    return (
        <div className="relative player-wrapper">
        <Plyr
        ref={playerRef}
        source={videoSource}
        options={{
            controls: [
                'play-large', 'play', 'progress', 'mute', 'volume', 'settings', 'fullscreen',
            ],
        }}

        />
            {/*<div className="custom-plyr-time">*/}
            {/*    {formatMyTime(currentTime)} / {duration}*/}
            {/*</div>*/}

        </div>
    )
}


