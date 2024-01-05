<script lang="ts">
    import MiddleCard from "$lib/MiddleCard.svelte";
    import {onMount} from "svelte";

    let emailLink;
/*Für Firefox zusätzlich...*/
    onMount(() => {
        if (emailLink) {
            emailLink.addEventListener('keydown', (event) => {
                if (event.key === 'Tab') {
                    event.preventDefault();
                }
            });
        }
    });
</script>

<MiddleCard>
    <header class="card-header">
        <title>Willkommen</title>
        <h1 class="h1">Herzlich willkommen zur Bachelorarbeit zum Thema „Emoji Vertonung"!</h1>
    </header>
    <section class="p-4" lang="de">
        <div class="pb-2"><p><strong></strong></p>
            <p>Wir danken Ihnen für Ihr Interesse an dieser Studie. In dieser Studie untersuchen wir, ob die emotionale
                Vertonung von Texten in denen Emoji vorkommen bei der Kontextvermittlung von Emotionen für Menschen mit
                und ohne Sehbehinderung hilfreich sein kann.</p></div>
        <p><br></p>
        <div class="pb-2">
            <h2>Ablauf der Studie:</h2>
            <p><br></p>
            <p lang="de">In dieser Studie hören Sie sich verschiedene Vertonungen von Textnachrichten an, die mit emotionalen
                Vokalausbrüchen wie "haha" versehen sind an deren Stelle normalerweise ein Emoji-Gesicht wäre. Sie
                ordnen der Audiodatei eine Emotion zu und beantworten einige allgemeine Fragen zur Vertonung von Emojis.
                Hierbei geht es nicht darum, Sie als Person auf ihre Fähigkeiten oder Kenntnisse zu testen. Vielmehr
                möchten wir die Töne und die Idee der Vertonung evaluieren.</p>
            <p>Zusätzlich fragen wir Ihre Vorerfahrung zu vertonten Emotionen ab und erheben demographische Daten zu
                Geschlecht, Altersgruppe und Einstufung der Sehfähigkeit.</p>
            <p>Es wird empfohlen, die Umfrage an einem ruhigen Ort mit Kopfhörern durchzuführen.</p>
            <p>Hinweis zur Bedienung: Bei Multiple Choice Fragen, müssen die Antwortmöglichkeiten erst ausgewählt werden mithilfe der Pfeiltasten oder einem ersten Leertastenklick bevor sie selektiert werden können mit einem erneuten klick der Leertaste beispielsweise.</p>
            <p>Sollten Sie noch Fragen haben, wenden Sie sich damit bitte an die Email Adresse:
                <a tabindex="-1" href="mailto:katrin.stoetter@stud-mail.uni-wuerzburg.de" rel="noopener noreferrer" target="_blank" aria-label="katrin punkt stoetter at stud minus mail punkt uni minus wuerzburg punkt de eh" id="email-link">katrin.stoetter@stud-mail.uni-wuerzburg.de</a>.
            </p>
            <p><br></p>
        </div>
        <div class="pb-2">
            <h2>Freiwilligkeit und Anonymität:</h2>
            <p><br></p>
            <p>Die Teilnahme an der Studie ist freiwillig. Sie können jederzeit und ohne Angabe von Gründen die
                Teilnahme an dieser Studie beenden, haben dann aber keinen Anspruch auf anteilige Vergütung. Falls Sie
                die Studie abbrechen, werden Ihre bis dahin gemachten Eingaben gelöscht. </p>
            <p><br></p>
            <p>Die im Rahmen dieser Studie erhobenen, oben beschriebenen Daten und persönlichen Mitteilungen werden
                vertraulich behandelt. So unterliegen diejenigen Projektmitarbeitenden, die durch direkten Kontakt
                mit Ihnen über personenbezogene Daten verfügen, der Schweigepflicht. Des Weiteren wird die
                Veröffentlichung der Ergebnisse der Studie in anonymisierter Form erfolgen, das heißt ohne, dass Ihre Daten
                Ihrer Person zugeordnet werden können.</p>
            <p><br></p>
            <p>Die Umfrage nutzt die eine eigens erstellte Plattform. Die Erhebung und Verarbeitung Ihrer oben
                beschriebenen Daten erfolgt vollständig anonym. Damit ist es niemandem möglich, die erhobenen Daten mit
                Ihrem Namen in Verbindung zu bringen. Eine Löschung der Daten nach Studienende ist daher nicht möglich.
                Die Aufbewahrungsfrist für die vollständig anonymisierten Daten beträgt mindestens 10 Jahre nach
                Datenauswertung, bzw. mindestens 10 Jahre nach Erscheinen einer Publikation zu dieser Studie.</p>
            <p><br></p>
            <p>Des Weiteren bitten wir Sie die gehörten Audiodateien vertraulich zu behandeln und nicht an Dritte
                weiterzugeben.</p>
            <p><br></p>
        </div>
        <div class="pb-2">
            <h2>Datenschutz:</h2>
            <p><br></p>
            <p>Um die Audiodateien barrierefrei zugänglich zu machen, verwenden wir vercel.com als Hosting-Plattform für
                unsere Webseite und die PostgreSQL-Datenbank für die Speicherung der erhobenen Studiendaten. Die von
                Vercel Inc. gehosteten Daten werden DSGVO-konform verarbeitet und auf sicheren Servern gespeichert (<a
                    tabindex="-1"    href="https://vercel.com/security" rel="noopener noreferrer" target="_blank">https://vercel.com/security</a>).
            </p>
            <p>Ihre personenbezogenen Daten werden nochmal zusätzlich clientseitig asymmetrisch verschlüsselt, wodurch
                gewährleistet wird, dass ausschließlich die Studienleiterin Zugriff auf Ihre Daten hat. </p>
            <p>Wir speichern Ihre Studiendaten auf den Servern der Vercel Inc. nur für den Zeitraum, der für die Analyse
                und Auswertung der Umfrageergebnisse erforderlich ist. Nach Abschluss der Umfrage werden Ihre Daten
                gelöscht.</p>
            <p><br></p>
        </div>
        <div class="pb-2">
            <h2>Mentale Gesundheit:</h2>
            <p><br></p>
            <p>Sollten Sie während der Studie merken, dass die vertonten Emotionen Ihr Wohlbefinden beeinflussen, machen
                Sie gerne eine Pause oder brechen Sie ab. Sollten Sie Probleme mit der mentalen Gesundheit, wie
                Depressionen, oder ähnlichem haben, sein Sie sich bewusst, dass auch negative Emotionen, wie Trauer und Wut
                vertont werden und entscheiden Sie selbst, ob dies einen negativen Einfluss auf Ihre Gesundheit haben
                könnte und nehmen Sie gegebenenfalls nicht Teil.</p>
            <p><br></p>
        </div>
        <div class="pb-2">
            <h2>Vergütung:</h2>
            <p><br></p>
            <p>Für die Teilnahme an dieser Studie erhalten Sie eine Vergütung in Höhe von 10 Euro.</p>
            <p>Für die Abwicklung der Vergütung werden Sie am Ende der Umfrage gebeten Ihre Bankdaten (Name, IBAN und BIC)
                anzugeben. Ihre Bankdaten sind dadurch nicht mit Ihren Angaben in der Studie verbunden und werden nur
                für den Überweisungsauftrag innerhalb der Uni weitergegeben und danach von unseren Festplatten und aus
                der Datenbank der Umfrage gelöscht.</p>
            <p><br></p>
        </div>
        <div class="pb-2">
            <h2>Datenschutzgrundverordnung: </h2>
            <p><br></p>
            <p>Hinweis auf Rechte der Betroffenen gemäß Artikel 13 Absatz 2 littera b der Datenschutzgrundverordnung haben Sie
                das Recht auf Auskunft (Artikel 15 DSGVO und Paragraph 34 BDSG), Widerspruch (Artikel 21 DSGVO 2018 und Paragraph 36 BDSG),
                Datenübertragbarkeit (Artikel 20 DSGVO), Löschung (Artikel 17 DSGVO und Paragraph 35 BDSG), Einschränkung der
                Verarbeitung (Artikel 18 DSGVO), und Berichtigung (Artikel 16 DSGVO).</p>
            <p><br></p>
            <p>Möchten Sie eines dieser Rechte in Anspruch nehmen, wenden Sie sich bitte an den Verantwortlichen: </p>
            <p>Julius-Maximilians-Universität Würzburg Sanderring 2, 97070 Würzburg </p>
            <p>Telefonnummer: 0931/ 31-0 <a tabindex="-1" href="mailto:info@uni-wuerzburg.de" rel="noopener noreferrer" target="_blank" aria-label="info at uni minus wuerzburg punkt de">info@uni-wuerzburg.de</a>
            </p>
            <p>Weiterhin haben Sie das Recht, Beschwerde bei der Aufsichtsbehörde einzulegen:</p>
            <p>Datenschutzbeauftragter der Universität Würzburg Sanderring 2, 97070 Würzburg Telefonnummer: 0931/ 31-0
                <a tabindex="-1" href="mailto:datenschutz@uni-wuerzburg.de" rel="noopener noreferrer" target="_blank" aria-label="datenschutz at uni minus wuerzburg punkt de">datenschutz@uni-wuerzburg.de</a>
            </p>
            <p><br></p>
        </div>
        <div class="pb-2">
            <h2>Ausschlusskriterien:</h2>
            <p>Sollten Sie mit einer Sehhilfe ein Sehvermögen von mehr als 33% auf dem besseren Auge erreichen, können Sie nicht an der Studie teilnehmen. Ihr Sehvermögen wird dann nicht als sehbehindert oder blind eingestuft.</p>
            <p><br></p>
        </div>
        <p><br></p>
    </section>
    <footer class="card-footer flex justify-center">
<!--        <a href="datapolicy" class="btn variant-filled font-bold md:w-32 w-full" aria-label="Einverstanden Button" role="button">Einverstanden?</a>-->
        <button tabindex="0" on:click={()=>location.href = "datapolicy"} class="btn variant-filled font-bold md:w-32 w-full" aria-label="Einverstanden Button">Einverstanden?</button>
    </footer>
</MiddleCard>

<style>
    button:focus{
        outline: 2px solid blue;
        box-shadow: 0 0 0 2px blue;
        border: 2px solid blue;
    }
</style>