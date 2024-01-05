<script lang="ts">
    import MiddleCard from "$lib/MiddleCard.svelte";

    let options = ["männlich", "weiblich", "divers", "keine Angabe"]
</script>

<svelte:head>
    <title>Demographische Frage falsche Seite</title>
</svelte:head>
<section class="p-4 w-full h-full flex flex-col items-center">
    <MiddleCard>
        <section>
            <div>Demographische Daten, Warum bist du hier?</div>
        </section>
    </MiddleCard>
</section>