<script>
    import MiddleCard from "$lib/MiddleCard.svelte";
    import {onMount} from "svelte";
    import {goto} from "$app/navigation";

    const route = "questions/0"
    onMount(()=> {
        window.addEventListener("keydown", (e) => {
            // if (e.key == "Enter") {
            //     form.requestSubmit();
            // }
            // TODO: form is null immer?
            if (e.key == " "
            ) {
                goto(route)
            }
        })

    })
</script>

<svelte:head>
    <title>Audio Fragen Beginn</title>
</svelte:head>
<section class="p-4 w-full h-full flex flex-col items-center">
    <MiddleCard>
        <header class="card-header">
            <h1 class="h1" id="dialogheading">Audio Einschätzungen</h1>
        </header>
        <section class="p-4">
            <div class="pb-7">
                <p>Im Folgenden werden Ihnen nun Umsetzungsmöglichkeiten für die Vertonung von Emojis vorgestellt. Die
                    Dateien sind als Audio-Dateien in die Umfrage eingebunden und hinter dem "Audio abspielen" Button
                    verborgen. Hinweis: Die Audiodateien können nur zweimal angehört werden, versuchen Sie also gut zu zuhören. Sollte eine Fehlermeldung auftauchen und die Webseite verschwunden sein, laden Sie die Seite bitte neu.
                    Sollte das nicht funktionieren, schreiben Sie bitte eine E-Mail an katrin.stoetter@stud-mail.uni-wuerzburg.de</p></div>
        </section>
        <footer class="card-footer flex justify-center">
            <button on:click={()=>location.href = route}  class="btn variant-filled font-bold md:w-32 w-full" aria-label="Weiter Button"
                tabindex="0">Weiter</button>
        </footer>
    </MiddleCard>
</section>

<style>
    button:focus{
        outline: 2px solid blue;
        box-shadow: 0 0 0 2px blue;
        border: 2px solid blue;
    }
</style>
<!--<script lang="ts">-->
<!--    import LockedStep from "$lib/LockedStep.svelte";-->
<!--    import QuestionAndAnswer from "$lib/QuestionAndAnswer.svelte";-->
<!--    import CenterStepper from "$lib/CenterStepper.svelte";-->
<!--    import {audioQuestions} from "../../store";-->

<!--    const data = $audioQuestions-->


<!--</script>-->

<!--<CenterStepper>-->
<!--    {#each data as entry }-->
<!--        <LockedStep  let:setLocked>-->
<!--&lt;!&ndash;            <QuestionAndAnswer data={entry} {setLocked} />&ndash;&gt;-->

<!--        </LockedStep>-->
<!--    {/each}-->
<!--</CenterStepper>-->
