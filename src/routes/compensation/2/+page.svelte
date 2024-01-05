<script lang="ts">
    import {isSona, sessionID} from "../../../store";
    import MiddleCard from "$lib/MiddleCard.svelte";
    import TextQuestion from "$lib/TextQuestion.svelte";
    import SecretQuestion from "$lib/SecretQuestion.svelte";

    const sona = $isSona


    let nextRoute = "/compensation/3"

    const submitRoute = "/end/?/submit"

    const questionID = "v3"

    const text = "Die IBAN des Kontos an das die Zahlung gehen soll:"

    const type = "text"

</script>

<svelte:head>
    <title>Vergütung IBAN</title>
</svelte:head>
<!--<section role="document" class="p-4 w-full h-full flex flex-col items-center" aria-live="assertive">-->
    <MiddleCard>
        <SecretQuestion questionText={text} {nextRoute} {questionID}/>
<!--        <TextQuestion {text} {nextRoute} {submitRoute} {questionID} {type}/>-->
    </MiddleCard>
<!--</section>-->