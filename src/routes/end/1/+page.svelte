<script lang="ts">
    import {isSona, sessionID} from "../../../store";
    import MiddleCard from "$lib/MiddleCard.svelte";
    import TextQuestion from "$lib/TextQuestion.svelte";

    const sona = $isSona


    let normalText = "<div><div class=\"pb-7\">In der Studie gab es drei Arten die Texte und ihre Emojis zu vertonen: Per Vokalausbruch (das ist ein Laut wie ein \"haha\" oder ein Schrei) in Kombination mit einem Screenreader, per Vokalausbruch am Anfang und anschließendem emotional vorgelesenem Text oder emotional vorgelesenen Text und Vokalausbruch am Ende. </div><div>Gefällt Ihnen die Kombination aus Vokalausbrüchen (\"haha\") und emotionalen Texten oder würden Sie eine Kombination aus einer herkömmlichen Screenreader-Stimme mit einem Vokalausbruch bevorzugen?</div></div>";
    let sonaText = "<div><div class=\"pb-7\"><p>In der Studie gab es drei Arten die Texte und ihre Emojis zu vertonen: Per Vokalausbruch (das ist ein Laut wie ein \"haha\" oder ein Schrei) in Kombination mit einem Screenreader, per Vokalausbruch am Anfang und anschließendem emotional vorgelesenem Text oder emotional vorgelesenen Text und Vokalausbruch am Ende. </p><p><br></p><p>Gefällt Ihnen die Kombination aus Vokalausbrüchen (\"haha\") und emotionalen Texten oder würden Sie eine Kombination aus einer herkömmlichen Sprachassistenten-Stimme mit einem Vokalausbruch bevorzugen?</p></div></div>"
    let nextRoute = "/end/2"
    let currentRoute = "/end/1"

    const submitRoute = "/end?/submit"

    const questionID = sona ? "e2Sona" : "e2"

    const text = sona ? sonaText : normalText

</script>

<svelte:head>
    <title>Endfrage 2</title>
</svelte:head>
<section class="p-4 w-full h-full flex flex-col items-center">
    <MiddleCard>
        <TextQuestion {text} {nextRoute} {submitRoute} {questionID} {currentRoute}/>
    </MiddleCard>
</section>