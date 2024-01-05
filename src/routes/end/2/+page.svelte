<script lang="ts">
    import MiddleCard from "$lib/MiddleCard.svelte";
    import RadioQuestion from "$lib/RadioQuestion.svelte";

    const text = "Viel es Ihnen leichter die Emotion zuzuordnen, wenn der Vokalausbruch (also das Lachen, wimmern, etc.) zu Beginn der Nachricht abgespielt wurde oder gegen Ende?"
    let nextRoute = "/end/3"
    let options = [{
        id: "e31",
        text: "Anfang"
    }, {
        id: "e32",
        text: "Ende"
    }]

    const submitRoute = "/end?/submit"

    const questionID = "e3"

    const currentRoute = "/end/2"


</script>

<svelte:head>
    <title>Endfrage 3</title>
</svelte:head>
<section class="p-4 w-full h-full flex flex-col items-center">
    <MiddleCard>
        <RadioQuestion questionText={text} {questionID} {nextRoute} {submitRoute} {options} {currentRoute} vertical="true"/>
    </MiddleCard>
</section>