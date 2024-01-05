<script lang="ts">
    import MiddleCard from "$lib/MiddleCard.svelte";
    import {goto} from "$app/navigation";
    import {onMount} from "svelte";

    let agreed = false
    $: disabled = !agreed

    let emailLink;
    /*Für Firefox zusätzlich...*/
    onMount(() => {
        if (emailLink){
            emailLink.addEventListener('keydown', (event) => {
                if (event.key === 'Tab') {
                    event.preventDefault();
                }
            });
        }
    });
</script>

<svelte:head>
    <title>Einverständniserklärung</title>
</svelte:head>
<section class="p-4 w-full h-full flex flex-col items-center">
    <MiddleCard>
        <header class="card-header">
            <h1 style="font-size: min(40px, 7vw);">Einverständniserklärung</h1>
        </header>
        <section class="p-4">
            <div>
                <p>
                <p>Ich bin hiermit schriftlich über die Studie und den Versuchsablauf aufgeklärt worden. Ich willige
                    ein,
                    dass
                    meine Antworten im Fragebogen anonym erhoben und gespeichert werden dürfen. Falls Fragen auftreten,
                    kann
                    ich
                    mich jederzeit bei
                    <a tabindex="-1" href="mailto:katrin.stoetter@stud-mail.uni-wuerzburg.de" rel="noopener noreferrer"
                       target="_blank" id="email-link"
                       aria-label="katrin punkt stoetter at stud minus mail punkt uni minus wuerzburg punkt de eh">katrin.stoetter@stud-mail.uni-wuerzburg.de</a>
                    melden.</p>
                <p><br></p>
                <p>Mit der beschriebenen Erhebung und Verarbeitung der Daten in Form von Fragebogenantworten und
                    demographischen
                    Daten bin ich einverstanden. Die Aufzeichnung und Auswertung der Daten erfolgt vollständig anonym.
                    Das
                    heißt, es ist niemandem möglich, meine Daten mit meinem Namen in Verbindung zu bringen. Mein
                    Einverständnis
                    zur Aufbewahrung bzw. Speicherung meiner Daten kann aufgrund der anonymen Erhebung nicht widerrufen
                    werden
                    und eine nachträgliche Löschung meiner Daten ist nach Abschluss der Studie nicht möglich.</p>
                <p><br></p>
                <p>Ich bin einverstanden, dass meine anonymen Daten zu Forschungszwecken weiterverwendet werden können.
                    Dazu
                    werden sie mindestens 10 Jahre nach Datenauswertung bzw. mindestens 10 Jahre nach Erscheinen einer
                    Publikation zu dieser Studie aufbewahrt.</p>
                <p><br></p>
                <p>Ich hatte genügend Zeit für eine Entscheidung und bin bereit, an der Studie teilzunehmen. Ich weiß,
                    dass
                    die
                    Teilnahme an der Studie freiwillig ist und ich die Teilnahme jederzeit ohne Angaben von Gründen
                    beenden
                    kann. Mit der Auswahl des "Ich akzeptiere" Buttons bin ich mit diesen Bedingungen und der
                    Verarbeitung meiner Daten
                    einverstanden und kann mit der Studie beginnen. Mit einem Klick auf den "Ich akzeptiere nicht"
                    Button ist die Umfrage
                    beendet.</p></div>
        </section>
        <footer class="card-footer flex justify-center">
            <div class="flex items-center justify-center">
                <button tabindex="0" on:click={()=> location.href = "demographic/0"}
                        class="bg-black text-white rounded focus:border-blue-700  hover:bg-white hover:text-black p-4"
                        value="Ich akzeptiere">Ich akzeptiere
                </button>
                <!--            <button on:click={()=> {agreed = false}} class="focus:border-blue-700">Ich akzeptiere</button>-->
                <button tabindex="0" on:click={()=>{goto("/endearly")}}
                        class="bg-black text-white rounded focus:border-blue-700 hover:text-black hover:bg-white p-4 ml-3">
                    Ich akzeptiere nicht
                </button>
            </div>
        </footer>
    </MiddleCard>
</section>

<style>
    button:focus{
        outline: 2px solid blue;
        box-shadow: 0 0 0 2px blue;
        border: 2px solid blue;
    }
</style>