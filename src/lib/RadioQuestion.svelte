<script lang="ts">
    import {RadioGroup, RadioItem} from "@skeletonlabs/skeleton";
    import Question from "$lib/Question.svelte";
    import AudioAnswer from "$lib/AudioAnswer.svelte";
    import {afterUpdate, onMount} from "svelte";
    import {demographicQuestions} from "../store"

    export let options: { id: string, text: string, correct: boolean }[]
    export let questionText

    export let questionUrl

    export let nextRoute
    export let currentRoute
    export let questionID: string
    export let vertical = false
    export let submitRoute
    export let nextBtnText
    export let skips: string
    export let listenForEnter = true;

    let orientation = vertical ? "flex-col" : "inline-flex"
    let rounded = vertical ? "rounded-container-token" : "rounded-token"
    let value: number
    $: active = value


    let firstValue = "";

    function addAutofocusHandler(optionId: number) {
        return () => {
            if (event.target === document.activeElement) {
                first = false;
            }
            addAutofocus(optionId)
        }
    }

    function addAutofocus(optionId: number) {
        if (firstValue === "") {
            firstValue = optionId.toString()
            return 'autofocus'
        } else {
            firstValue = optionId.toString()
            return ''
        }
    }


    // go to next page when a value is selected
    let form: HTMLFormElement
    export let first = true



</script>

<Question
        {active}
        bind:form={form}
        text={questionText}
        next={nextRoute}
        listenForEnter={true}
        {questionID}
        {submitRoute}
        {nextBtnText}
        currentRoute={currentRoute}
        {first}
        {skips}
>
    {#if questionUrl}
        <AudioAnswer audioURL={questionUrl}/>
    {/if}
    <RadioGroup display={orientation} rounded={rounded} class="w-full max-w-xl !bg-black" spacing="space-y-4">
        {#each options as option}
            <!--            <RadioItem bind:group={value} name="answer" value={option.id} class="!text-xl">{option.text}</RadioItem>-->
            <div class="flex justify-center gap-4">
                <input type="radio" id={option.id} bind:group={value} name="answer"
                       value={option.text}
                       class="visually-hidden">
                <label for={option.id}
                       class="w-full flex py-2 justify-center text-center border-gray-300 rounded-md bg-white cursor-pointer hover:bg-gray-300 focus:bg-gray-300">{option.text}</label>
            </div>
        {/each}
    </RadioGroup>
</Question>


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