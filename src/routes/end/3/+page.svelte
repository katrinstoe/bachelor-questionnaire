<script lang="ts">
    import MiddleCard from "$lib/MiddleCard.svelte";
    import TextQuestion from "$lib/TextQuestion.svelte";

    const text = "Und warum viel es Ihnen an der Position leichter?"
    let nextRoute = "/end/4"
    let currentRoute = "/end/3"


    const submitRoute = "/end?/submit"

    const questionID = "e4"



</script>

<svelte:head>
    <title>Endfrage 4</title>
</svelte:head>
<section class="p-4 w-full h-full flex flex-col items-center">
    <MiddleCard>
        <TextQuestion {text} {nextRoute} {submitRoute} {questionID} {currentRoute}/>
    </MiddleCard>
</section>