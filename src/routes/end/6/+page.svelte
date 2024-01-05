<script lang="ts">
    import {isSona, sessionID} from "../../../store";
    import MiddleCard from "$lib/MiddleCard.svelte";
    import TextQuestion from "$lib/TextQuestion.svelte";
    import {goto} from "$app/navigation";

    const sona = $isSona

    let nextRoute = "/compensation"

    const nextBtnText = "Weiter zur Vergütung"
</script>

<svelte:head>
    <title>Endfrage 7</title>
</svelte:head>
<MiddleCard>
    <section class="p-4 w-full h-full flex flex-col items-center">
        <header class="card-header">
            <h1 class="h1">Vielen Dank für Ihre Teilnahme an meiner Studie.</h1>
        </header>
        <section class="p-4">
            <div class="pb-7"><p><strong></strong></p>
                <p>Ich untersuche in der Studie, ob die Vertonung von emotionalen Inhalten wie Emoji effektiver gelingt
                    mit
                    einer Kombination aus Vokalausbrüchen (wie ein "haha") und emotionalen Texten oder mit reinen
                    Vokalausbrüchen und einer Screenreader Stimme. Hierbei stehen besonders Menschen mit Blindheit und
                    Sehbehinderung im Fokus, da in Anwendungsgebieten wie bei der Nutzung von Emojis, teilweise
                    emotionale
                    Kontexte der Nachrichten von Screenreadern nicht gut vermittelt werden.</p>
                <p>Auch sehende Menschen wurden befragt, da sie mit Sprachassistenten heutzutage auch immer mehr in
                    Kontakt
                    mit Textvertonungen kommen.</p>
            </div>
            <div>
                <p>Ich danke Ihnen herzlich für Ihre Teilnahme.</p>
                <p>Um Ihnen die Vergütung zukommen zu lassen, bitte ich Sie noch die folgenden Daten auszufüllen.</p>
            </div>
        </section>
    </section>
    <footer class="card-footer flex justify-center">
        <button on:click={()=>location.href=nextRoute} class="btn variant-filled font-bold md:w-52 w-full"
           aria-label={nextBtnText}>{nextBtnText}</button>
    </footer>
</MiddleCard>

<style>
    button:focus{
        outline: 2px solid blue;
        box-shadow: 0 0 0 2px blue;
        border: 2px solid blue;
    }
</style>