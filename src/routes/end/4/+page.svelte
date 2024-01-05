<script lang="ts">
    import MiddleCard from "$lib/MiddleCard.svelte";
    import TextQuestion from "$lib/TextQuestion.svelte";

    const text = "Wir sind nun fast am Ende der Umfrage angekommen. Sollten Sie noch Feedback oder Anmerkungen haben, die Sie gerne teilen möchten, dürfen Sie das hier nun gerne tun. Falls nicht wählen Sie einfach den \"Ok\" Button aus."
    let nextRoute = "/end/5"
    let currentRoute = "/end/4"


    const submitRoute = "/end?/submit"

    const questionID = "e5"

    let activeByDefault = "true"
    let nextBtnText = "Ok"


</script>

<svelte:head>
    <title>Endfrage 5</title>
</svelte:head>
<section class="p-4 w-full h-full flex flex-col items-center">
    <MiddleCard>
        <TextQuestion {text} {nextRoute} {submitRoute} {questionID} {activeByDefault} {nextBtnText} {currentRoute}/>
    </MiddleCard>
</section>