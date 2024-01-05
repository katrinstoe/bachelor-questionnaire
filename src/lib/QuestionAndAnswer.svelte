<script lang="ts">
    import AudioAnswer from "./AudioAnswer.svelte";
    import type QuestionAndAnswerData from "./data/QuestionAndAnswerData";

    import {onDestroy, onMount} from "svelte";
    import type {Answer} from "$lib/data/Answer";


    // export let locked = true
    export let setLocked = (state:boolean) => {""}

    export let data: QuestionAndAnswerData
    let answers: Answer[] = data.answers




    // Time Tracking pro Frage
    let startTime: Date
    onMount(() => {
        startTime = new Date()
        // get stored Data from local storage


    })

    onDestroy(() => {
        if (!startTime) return // I think it's a dev problem, but when the component is destroyed before its mounted the calculation does not work
        let endTime = new Date()
        const time = (endTime.getTime() - startTime.getTime())
        console.log("time milli: " + time)
        console.error("Does not send Data back to Backend")


        // const res: Result = {
        //
        // }

        // $audioResultsStore["" + res.question.id] = res
        // console.log("Result:", res)
    })






</script>


<div class="mx-2">
    <p>{@html data.question.text}</p>
    <div class="border-b border-white/10 my-2"></div>
    <AudioAnswer data={answers.one} />
    <AudioAnswer data={answers.two} />
</div>