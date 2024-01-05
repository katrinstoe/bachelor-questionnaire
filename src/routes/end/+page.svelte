<script lang="ts">
    import {isSona, sessionID} from "../../store";
    import MiddleCard from "$lib/MiddleCard.svelte";
    import TextQuestion from "$lib/TextQuestion.svelte";

    const sona = $isSona


    let sonaText = "Haben Ihnen die Vertonung der Texte gefallen? Könnten Sie sich vorstellen solche emotionalen Texte generiert mit Hilfe beispielsweise künstlicher Intelligenz einer neutralen Sprachassistenten-Stimme vorzuziehen und wieso?"
    let normalText = "Haben Ihnen die Vertonung der Texte gefallen? Könnten Sie sich vorstellen solche emotionalen Texte generiert mit Hilfe beispielsweise künstlicher Intelligenz einer neutralen Screenreader Stimme vorzuziehen und wieso?"

    let nextRoute = "end/1"

    const submitRoute = "?/submit"

    const questionID = sona ? "e1Sona" : "e1"

    const text = sona ? sonaText : normalText

</script>

<svelte:head>
    <title>Endfrage 1</title>
</svelte:head>
<section role="document" class="p-4 w-full h-full flex flex-col items-center">
    <MiddleCard>
        <TextQuestion {text} {nextRoute} {submitRoute} {questionID}/>
    </MiddleCard>
</section>