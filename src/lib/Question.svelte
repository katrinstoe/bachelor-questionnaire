<script lang="ts">

    import BigButton from "$lib/BigButton.svelte";
    import {onMount} from "svelte";
    import {enhance} from "$app/forms";
    import {StorageKeys} from "$lib/data/storageKeys";
    import {demographicQuestions, sessionID} from "../store";

    export let next = ""
    export let text: string

    export let questionID: string


    export let form

    export let listenForEnter = false

    export let submitRoute = "/demographic?/submit"

    export let nextBtnText = "Weiter"

    export let skips: string


    export let active = false
    $: disabled = active ? "" : "true"

    onMount(() => {
        const radioGroup = document.querySelector('.radio-group');

        if (radioGroup) {
            radioGroup.addEventListener('change', (event) => {
                if (firstTimeCalled) {
                    first = false;
                }
            });
        }


        window.addEventListener("keydown", (e) => {
            // if (e.key == "Enter") {
            //     form.requestSubmit();
            // }
            // TODO: form is null immer?

            if (listenForEnter && e.key == " "
                && !document.activeElement?.matches("input[type='text']")
            ) {
                // } else if (e.key == " ") {
                // e.preventDefault();
                //form.requestSubmit();
                skipOrNavigate()
            }
        })

    })

    export let first
    let firstTimeCalled = true
    $: {
        firstTimeCalled = first;
    }

    function getFormData() {
        const data = new URLSearchParams()
        for (let field of new FormData(form)) {
            const [key, value] = field
            data.append(key, value as string)
            console.log(key, "=>", value)
        }
        const answer = data.get("answer")
        if (answer == "Nein") {
            $demographicQuestions = $demographicQuestions.filter(q => q.question.id != skips)
        }
        return data;
    }

    async function skipOrNavigate() {
        console.log(firstTimeCalled);
        if (firstTimeCalled) {
            first = false
        } else {
            // Führt zu instant commit bei leerzeichen klick
            // form.requestSubmit();

            let res
            setTimeout(() => {
                if (!res) {
                    console.log("waited too long")
                    window.location.href = next
                }
            }, 1000)
            res = await fetch("/api/questions/default", {
                // fetch("/api/questions/default", {
                method: "POST",
                body: getFormData()
            })
            console.log("nxt", next)
            window.location.href = next
            // window.location.assign(next)
        }
    }
</script>
<!--<section role="main" aria-labelledby="dialogheading" class="p-4 w-full h-full flex flex-col items-center">-->
<!--<section role="document" class="p-4 w-full h-full flex flex-col items-center">-->
<div class="flex flex-col gap-4 bg-white pt-3" id="question">
    <!--        <header class="card-header">-->
    <div class="flex justify-center">
        <div class="px-4 !text-2xl" lang="de" id="dialogheading">{@html text}</div>
    </div>
    <!--        </header>-->

    <form bind:this={form}
          on:submit|preventDefault={skipOrNavigate}
          class="p-4 flex flex-col gap-4 items-center">
        <section class="w-full flex flex-col items-center">
            <slot/>
            <input type="hidden" name="nextRoute" value={next}>
            <input type="hidden" name={StorageKeys.SESSION_ID} value={$sessionID}>
            <input type="hidden" name="questionID" value={questionID}>
        </section>

        <footer class="card-footer flex justify-center">
            <div class="flex justify-end items-center">
                <span class="px-4 md:inline hidden text-black/60">Leertaste für weiter</span>
                <BigButton bind:disabled={disabled} type="submit" role="button">{nextBtnText}</BigButton>
            </div>
        </footer>
    </form>
</div>
<!--</section>-->