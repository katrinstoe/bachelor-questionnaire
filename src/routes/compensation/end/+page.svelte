<script lang="ts">
    import {isSona, sessionID} from "../../../store";
    import MiddleCard from "$lib/MiddleCard.svelte";
    import TextQuestion from "$lib/TextQuestion.svelte";
    import {browser} from "$app/environment";

    const sona = $isSona


    const normalTextHeader = "Herzlichen Dank für Ihre Teilnahme!\n";
    const normalText = "<p>Wir werden uns kümmern, dass das Geld zeitnah auf Ihr Konto überwiesen wird. Falls Probleme auftreten sollten, können Sie sich auch in diesem Fall an <a tabindex=\"-1\" href=\"mailto:katrin.stoetter@stud-mail.uni-wuerzburg.de\" rel=\"noopener noreferrer\" target=\"_blank\" aria-label=\"katrin punkt stoetter at stud minus mail punkt uni minus wuerzburg punkt de eh\">katrin.stoetter@stud-mail.uni-wuerzburg.de</a> wenden. Es kann sich aber um einige Wochen handeln, bis das Geld auf Ihrem Konto eintrifft.</p>";
    const sonaTextHeader = "Herzlichen Dank für Ihre Teilnahme!\n";
    const sonaText = "<p>Wir werden uns kümmern, dass die Versuchspersonenstunden zeitnah verbucht werden. Falls Probleme bei der Verbuchung auftreten sollten, können Sie sich auch in diesem Fall an katrin.stoetter@stud-mail.uni-wuerzburg.de wenden.</p>"
    let nextRoute = sona ? "../compensation/end" : "../compensation/2"


    const text = sona ? sonaText : normalText
    const textHeader = sona ? sonaTextHeader : normalTextHeader

    const type = sona ? "email" : "text"

</script>

<svelte:head>
    <title>Ende der Umfrage</title>
</svelte:head>
<section class="p-4 w-full h-full flex flex-col items-center">
    <MiddleCard>
        <header class="card-header">
            <h1 class="h1">{textHeader}</h1>
        </header>
        <section class="p-4">
            <div class="pb-7">{@html text}</div>
        </section>
    </MiddleCard>
</section>