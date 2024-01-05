<script lang="ts">
    import {isSona, secretSessionID, sessionID} from "../../store";
    import MiddleCard from "$lib/MiddleCard.svelte";
    import TextQuestion from "$lib/TextQuestion.svelte";
    import {goto} from "$app/navigation";

    const sona = $isSona

    function generateRandomId(length) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        const charactersLength = characters.length;

        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charactersLength);
            result += characters.charAt(randomIndex);
        }

        return result;
    }

    // Usage example
    const randomId = generateRandomId(8);
    $secretSessionID = randomId

    let sonaText = "Herzlichen Dank nochmal für die Teilnahme an meiner Bachelorarbeit, im Folgenden wird Ihre E-Mail Adresse abgefragt. Die Daten werden vertraulich behandelt. Die 0.5 VPh werden schnellstmöglich verbucht."
    let normalText = "Herzlichen Dank nochmal für die Teilnahme an meiner Bachelorarbeit, im Folgenden werden einige Bankinformationen abgefragt. Die Daten werden vertraulich behandelt. Sie sollten dann im Anschluss an diese Umfrage, im Laufe der nächsten Wochen, die 10€ auf Ihr Konto überwiesen bekommen."

    let nextRoute = "compensation/1"

    const submitRoute = "?/submit"

    const questionID = sona ? "v1Sona" : "v1"

    const text = sona ? sonaText : normalText

</script>

<svelte:head>
    <title>Vergütung</title>
</svelte:head>
<section class="p-4 w-full h-full flex flex-col items-center">
    <MiddleCard>
        <section class="p-4">
            <div>{@html text}</div>
        </section>
        <footer class="card-footer flex justify-center">
            <button on:click={()=>location.href = "/compensation/1"} class="btn variant-filled font-bold md:w-32 w-full" aria-label="Weiter Button">Weiter</button>
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