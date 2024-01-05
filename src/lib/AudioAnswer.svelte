<script context="module" lang="ts">
    let current: HTMLAudioElement

</script>
<script lang="ts">
    import {onDestroy, onMount} from "svelte";
    import {browser} from "$app/environment";
    import {writable} from "svelte/store";

    export let audioURL


    let minuteValue: string | number;
    let secondValue: string | number;
    let progress = `${minuteValue}:${secondValue}`;

    let isPlaying = false

    let audioElement: HTMLAudioElement

    let visible = true

    let counter = 0;

    // Server does not know the audio element, so this has to be done client side
    if (browser) {
        audioElement = new Audio(audioURL)
        audioElement.onloadedmetadata = () => {
            let secondsTotalAudio = audioElement.duration
            calculateTime(secondsTotalAudio)
            updateAriaLabel()
        }
        audioElement.addEventListener("timeupdate", () => {
            updateProgress()
        })
        audioElement.onpause = () => {
            isPlaying = false
        }

        onDestroy(() => {
            audioElement.pause()
        });
    }

    function calculateTime(currentTime) {
        const minutes = Math.floor(currentTime / 60);
        const seconds = Math.floor(currentTime - minutes * 60);
        minuteValue = minutes < 10 ? `0${minutes}` : minutes;
        secondValue = seconds < 10 ? `0${seconds}` : seconds;

        let mediaTime = `${minuteValue}:${secondValue}`;
        progress = mediaTime
        if (audioElement.ended) {
            isPlaying = false
            if (counter <= 2) {
                counter++;
            } else {
                visible = false;
            }
        }
    }

    function stopOthers() {
        if (current && current != audioElement) current.pause()
        current = audioElement

    }
    let current: HTMLAudioElement;
    let isFocused = false;


    function updateAriaLabel() {
        if (!isFocused) {
            audioElement.ariaLabel = `Audio abspielen: ${progress.replace(':', ' Minuten und ')} Sekunden`;
        }
    }

    function handleFocus() {
        isFocused = true;
        updateAriaLabel();
    }

    function handleBlur() {
        isFocused = false;
        updateAriaLabel();
    }

    function playPause() {
        if (audioElement.paused) {
            stopOthers()
            audioElement.play();
            isPlaying = true
        } else {
            console.log("pause")
            audioElement.pause();
            isPlaying = false;
        }
    }

    function updateProgress() {
        calculateTime(audioElement.currentTime)
    }

    onDestroy(() => {
        visible = true;
        audioElement.pause();
    });

    console.log("visibleInAudio", visible)

</script>

<div class="flex items-center my-4 gap-4 invisible" class:!visible={visible}>
    <div class="relative">
        <div class="h-full w-full absolute grid place-content-center z-10">
            <button type="button" on:click={playPause} class="grid place-content-center" id="audio-play-button" aria-label={audioElement.ariaLabel} on:focus={handleFocus} on:blur={handleBlur} aria-live="off" tabindex="0">
                {#if isPlaying}
                    <iconify-icon height="2em" icon="material-symbols:pause-rounded" aria-label="Pause Button"></iconify-icon>
                {:else}
                    <iconify-icon height="2em" icon="material-symbols:play-arrow-rounded" aria-label="Play Button"></iconify-icon>
                {/if}
            </button>
        </div>
    </div>
    <div class="time" aria-label="" aria-hidden="true">{progress}</div>
</div>