<script lang="ts">
    import {afterUpdate, onDestroy, onMount} from "svelte";
    import {StorageKeys} from "$lib/data/storageKeys";
    import {sessionID} from "../store";
    import {RadioGroup} from "@skeletonlabs/skeleton";
    import AudioAnswer from "$lib/AudioAnswer.svelte";
    import BigButton from "$lib/BigButton.svelte";
    import {goto} from "$app/navigation";

    export let nextRoute = "";
    export let questionText: string;
    export let questionID: string;
    export let form: HTMLFormElement;
    export let listenForEnter = true;
    export let nextBtnText = "Weiter";
    export let questionUrl;
    export let options: { id: string; text: string; correct: boolean }[];

    let value;
    let otherValue = "";

    let followUPValue
    $: followUpDisabled = followUPValue ? "" : "true"
    let first = true

    $: disabled = !value
    let isTyping = false;
    let otherParent: HTMLOptionElement
    $: other = value == "other"

    let firstTimeCalled = true
    let firstTimeTabbed = true

    let otherOption = options.find((option) => option.id === "other");
    if (!otherOption) {
        options.push({id: "other", text: "Other", correct: false});
        otherOption = options.find((option) => option.id === "other");
    }

    const followUpOptions = [
        {id: "m3", text: "Äußerst sicher", correct: false},
        {id: "m4", text: "Sehr sicher", correct: false},
        {id: "m5", text: "Etwas sicher", correct: true},
        {id: "m6", text: "Nur bedingt sicher", correct: false},
        {id: "m7", text: "Überhaupt nicht sicher", correct: false},
    ]

    const activateNextBtn = (e) => {
        console.log(e)
        isTyping = otherValue.trim().length > 0;
        if (value === "other") {
            disabled = otherValue === "";
        } else {
            disabled = value === undefined;
        }
    };

    // Time Tracking pro Frage
    let startTime: Date
    onMount(() => {
        startTime = new Date()

        const radioGroup = document.querySelector('.radio-group');
        if (radioGroup) {
            radioGroup.addEventListener('change', (event) => {
                if (firstTimeCalled) {
                    firstTimeTabbed = false;
                }
            });
        }

        window.addEventListener("keydown", (e) => {
            //         // if (e.key == "Enter") {
            //         //     skipOrNavigate()
            //         //
            //         // } else
            const focusedElementID = document.activeElement.id
            /**
             * Case 1: Space hit, value of first question is truthy and the first flag is set
             * Case 2: Space hit, it's the followup question and followup value is truthy
             */
            if (listenForEnter
                && focusedElementID != "audio-play-button"
                && (e.key == " " || e.code === 'Space' || e.keyCode === 32)
                && ((value && first) || (!first && followUPValue))) {
                // e.preventDefault()
                skipOrNavigate()
            }
        });

    });


    function handleKeyDown(event) {
        if (event.key === "Tab") {
            event.preventDefault();
            this.blur(); // Entferne den Fokus vom Eingabefeld
        }
    }

    let timeForQuestion = 0

    async function skipOrNavigate() {
        if (first) {
            first = false
        } else {
            console.log("submitting Data")
            let endTime = new Date()
            timeForQuestion = (endTime.getTime() - startTime.getTime())
            let res
            setTimeout(() => {
                if (!res) {
                    console.log("waited too long")
                    window.location = nextRoute
                }
            }, 4000)
            res = await fetch("/api/questions/audio", {
                method: "POST",
                body: getFormData(timeForQuestion)
            })
            window.location = nextRoute
        }
    }

    function getFormData(time: number) {
        const data = new URLSearchParams()
        for (let field of new FormData(form)) {
            const [key, value] = field
            data.append(key, value as string)
            console.log(key, "=>", value)
        }
        data.append("time", ""+time)
        return data
    }

    function addAutofocusHandler(optionId: number) {
        return () => {
            addAutofocus(optionId)
        }
    }

    function addAutofocus(optionId: number) {
        if (optionId === "am11" || optionId === "am21" || optionId == "m3") {
            return 'autofocus'
        } else {
            return ''
        }
    }

    function handleInputBlur() {
        if (!otherValue.trim()) {
            setTimeout(() => {
                otherValue = '';
                afterUpdate(() => {
                    form.dispatchEvent(new Event('change')); // Auslösen des 'change'-Events, um die Sichtbarkeit des Buttons zu aktualisieren
                }); // Zurücksetzen des Texts im Eingabefeld, wenn leer
            }, 0);
        }
    }

    function handleConfirmation() {
        if (otherValue.trim().length > 0) {
            const selectedOption = options.find(option => option.id === "other");
            if (selectedOption) {
                selectedOption.text = otherValue;
                value = selectedOption.id;
                form.dispatchEvent(new Event('change')); // Auslösen des 'change'-Events, um die Sichtbarkeit des Buttons zu aktualisieren
            }
        }
    }

    export let currentRouteForTitle


</script>

<svelte:head>
    {#if first}
        <title>Audio Frage {currentRouteForTitle}</title>
    {:else }
        <title>Audio Frage {currentRouteForTitle}.2</title>
    {/if}
</svelte:head>

<div class="flex flex-col gap-4 bg-white pt-3 card-header justify-center">

    <div class="flex justify-center" aria-live="polite">
        {#if first}
            <div class="px-4 !text-2xl first" id="dialogheading">{@html questionText}</div>
        {:else }
            <div class="px-4 !text-2xl second">Wie sicher sind Sie sich bei der Zuordnung der Emotion zuvor
                gewesen?
            </div>
        {/if}
    </div>

    <form
            bind:this={form}
            on:submit|preventDefault={skipOrNavigate}
            class="p-4 flex flex-col gap-4 items-center"
            aria-live="polite"
    >
        {#if first}
            <section class="w-full flex flex-col items-center">
                {#if questionUrl}
                    <AudioAnswer audioURL={questionUrl} />
                {/if}
                <RadioGroup
                        display="flex-col"
                        rounded=rounded-container-token
                        class="w-full max-w-xl !bg-black"
                        aria-labelledby="Antwortoptionen"
                        spacing="space-y-4"
                >
                    {#each options as option}
                        {#if option.id === "other"}
                            <div class="flex justify-center gap-4">
                                {#if !other}
                                    <label for="radioItem"
                                           class="w-full flex py-2 justify-center text-center border-gray-300 rounded-md bg-white cursor-pointer hover:bg-gray-300 focus:bg-gray-300">
                                        Andere
                                    </label>
                                    <input type="radio"
                                           id="radioItem"
                                           bind:group={value}
                                           name="answer"
                                           value={option.id}
                                           class="visually-hidden"
                                    >
                                {:else }
                                    <label for="otherInput" class="w-[90%]">
                                        <input
                                                type="text"
                                                id="otherInput"
                                                bind:value={otherValue}
                                                class="border border-gray-300 rounded-md p-2 ml-2 text-black w-full bg-white ml-0"
                                                placeholder="Andere"
                                                on:input={activateNextBtn}
                                                on:blur={handleInputBlur}
                                                on:keydown={handleKeyDown}
                                                autofocus
                                        />
                                    </label>
                                    <!--                                    <button class="m-0 pl-2 pr-2 bg-black text-white rounded-md" type="button"-->
                                    <!--                                            aria-label="Eingabe bestätigen" on:click={handleConfirmation}>✓-->
                                    <!--                                    </button>-->
                                {/if}
                            </div>
                            <!--                            </RadioItem>-->
                        {:else}
                            <!--                            <RadioItem bind:group={value} name="answer" value={option.id}>-->
                            <!--                                {option.text}-->
                            <!--                            </RadioItem>-->
                            <div class="flex justify-center gap-4">
                                <input type="radio" id={option.id} bind:group={value} name="answer"
                                       value={option.id}
                                       class="visually-hidden" on:load={addAutofocusHandler(option.id)}>
                                <label for={option.id}
                                       class="w-full flex py-2 justify-center text-center border-gray-300 rounded-md bg-white cursor-pointer hover:bg-gray-300 focus:bg-gray-300">{option.text}</label>
                            </div>
                        {/if}
                    {/each}
                </RadioGroup>
            </section>
            <footer class="card-footer flex justify-center">
                <div class="flex justify-end items-center">
                    <span class="px-4 md:inline hidden text-black/40">Leertaste für weiter</span>
                    <BigButton
                            type="button"
                            bind:disabled={disabled}
                            class="btn variant-filled font-bold md:w-32 w-full"
                            on:click={()=> first = false}
                    >
                        {nextBtnText}
                    </BigButton>
                </div>
            </footer>
        {:else }
            <RadioGroup display="flex-col" rounded=rounded-container-token class="w-full max-w-xl !bg-black"
                        spacing="space-y-4">
                {#each followUpOptions as option}
                    <!--                    <RadioItem bind:group={followUPValue} name="followUpQuestionAnswer"-->
                    <!--                               value={option.text}>{option.text}</RadioItem>-->
                    <div class="flex justify-center gap-4">
                        <input type="radio" id={option.text} bind:group={followUPValue}
                               name="followUpQuestionAnswer"
                               value={option.text}
                               class="visually-hidden" on:load={addAutofocusHandler(option.id)}>
                        <label for={option.text}
                               class="w-full flex py-2 justify-center text-center border-gray-300 rounded-md bg-white cursor-pointer">{option.text}</label>
                    </div>
                {/each}
            </RadioGroup>
            <footer class="card-footer flex justify-center">
                <div class="flex justify-end items-center">
                    <span class="px-4 md:inline hidden text-black/40">Leertaste für weiter</span>
                    <BigButton bind:disabled={followUpDisabled} type="submit">{nextBtnText}</BigButton>
                </div>
            </footer>
        {/if}
        <input type="hidden" name="nextRoute" value={nextRoute}/>
        <input type="hidden" name={StorageKeys.SESSION_ID} value={$sessionID}/>
        <input type="hidden" name="questionID" value={questionID}/>
        <input type="hidden" name="answer" value={value === "other" ? otherValue : value}/>
<!--        <input type="hidden" name="time" value={timeForQuestion}/>-->
    </form>
</div>


<style>
    .visually-hidden {
        position: absolute;
        width: 1px;
        height: 1px;
        margin: -1px;
        border: 0;
        padding: 0;
        white-space: nowrap;
        clip-path: inset(100%);
        clip: rect(0 0 0 0);
        overflow: hidden;
    }

    input[type="radio"]:checked + label {
        background-color: lightsteelblue;
        color: black;
    }

    input[type="radio"]:hover + label {
        background-color: lightgoldenrodyellow;
        color: black;
    }

    input[type="radio"]:focus + label {
        outline: 2px solid blue;
        box-shadow: 0 0 0 2px blue;
        border: 2px solid blue;
    }
</style>
