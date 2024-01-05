<script lang="ts">
    import {isSona} from "../../../store";
    import MiddleCard from "$lib/MiddleCard.svelte";
    import SecretQuestion from "$lib/SecretQuestion.svelte";

    const sona = $isSona


    let normalText = "Der Vor- und Nachname des Kontoinhabers oder der Kontoinhaberin an die das Geld gesendet werden soll.";
    let sonaText = "Bitte geben Sie nun Ihre E-Mail Adresse an, die mit Ihrem SONA-Konto verbunden ist, sodass die Versuchspersonenstunden verbucht werden können."
    let nextRoute = sona ? "/compensation/end" : "/compensation/2"

    const submitRoute = "/compensation?/subEncrypted"

    const questionID = sona ? "v2Sona" : "v2"

    const text = sona ? sonaText : normalText

    const type = sona ? "email" : "text"

    const titleName = sona ? "Email Adresse" : "Name des Kontoinhaber"

    console.log("nextRoutPage: " + nextRoute)

</script>

<svelte:head>
    <title>Vergütung {titleName}</title>
</svelte:head>
    <MiddleCard>
        <SecretQuestion questionText={text} {nextRoute} {questionID} type={type}/>
<!--        <TextQuestion {text} {nextRoute} {submitRoute} {questionID} {type}/>-->
    </MiddleCard>
