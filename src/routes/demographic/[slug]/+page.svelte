<script lang="ts">
    import MiddleCard from "$lib/MiddleCard.svelte";
    import type {PageData} from "./$types"
    import {afterUpdate, onMount, setContext} from "svelte";

    export let data: PageData

    let currentRouteForTitle = ""
    $:{
        if (data.props.nextRoute - 1 === 0) {
            currentRouteForTitle = "1, Frage: Welchem Geschlecht fühlen Sie sich angehörig?"
        } else {
            let curRoute = parseInt(data.props.currentRoute) + 1
            currentRouteForTitle = curRoute.toString()
        }
    }

</script>
<!--<pre>{data.next}</pre>-->
<svelte:head>
    <title>Demographische Frage {currentRouteForTitle} </title>
</svelte:head>
<!--<section role="document" class="p-4 w-full h-full flex flex-col items-center">-->
    <MiddleCard bg={false}>
<!--<div>-->
    <svelte:component this={data.selected} {...data.props}/>
<!--</div>-->
    </MiddleCard>
<!--</section>-->