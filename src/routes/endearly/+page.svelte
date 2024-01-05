<script lang="ts">
    import MiddleCard from "$lib/MiddleCard.svelte";
    import {setInitialClassState} from '@skeletonlabs/skeleton';
    import {modeOsPrefers, modeUserPrefers, modeCurrent} from '@skeletonlabs/skeleton';


</script>

<svelte:head>
    <title>Umfrage Beendet</title>
</svelte:head>
<section class="p-4 w-full h-full flex flex-col items-center">
    <MiddleCard>
        <header class="card-header">
            <h1 class="h1">Danke für Ihr Interesse</h1>
        </header>
        <section class="p-4">
            <div class="pb-7">
                Sie haben die Umfrage beendet, Sie können die Umfrage jetzt schließen.
            </div>
        </section>
    </MiddleCard>
</section>