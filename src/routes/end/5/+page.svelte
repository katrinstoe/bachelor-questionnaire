<script lang="ts">
    import MiddleCard from "$lib/MiddleCard.svelte";
    import TextQuestion from "$lib/TextQuestion.svelte";

    const text = "Haben Sie Interesse im Anschluss weiter Informationen zu Ergebnissen dieser Bachelorarbeit zu erhalten? Hierzu gehört im speziellen meine Bachelorarbeit an sich bzw. die Ergebnisse dieser Umfrage. Falls Interesse besteht, geben Sie gerne nachfolgend Ihre E-Mail-Adresse ein, ansonsten überspringen Sie diese Frage einfach, indem sie direkt den \"Senden\" Knopf drücken."
    let nextRoute = "/end/6"
    let currentRoute = "/end/5"


    const submitRoute = "/end?/submit"

    const questionID = "e6"

    const placeholderText = "mustermann@gmail.com"

    const nextBtnText = "Senden"

    let type = "email"
    let activeByDefault = true

</script>

<svelte:head>
    <title>Endfrage 6</title>
</svelte:head>
<section class="p-4 w-full h-full flex flex-col items-center">
    <MiddleCard>
        <TextQuestion {activeByDefault} {text} {nextRoute} {submitRoute} {questionID} {currentRoute} type={type} {placeholderText} {nextBtnText}/>
    </MiddleCard>
</section>