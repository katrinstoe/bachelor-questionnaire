<script lang="ts">
    import MiddleCard from "$lib/MiddleCard.svelte";
    import type {PageData} from "./$types"
    import FollowUpQuestion from "$lib/FollowUpQuestion.svelte";

    export let data: PageData
    console.log("PageDAta", data)

    let currentRouteForTitle = ""
    $:{
        if (data.props.nextRoute - 1 === 0) {
            currentRouteForTitle = "1"
        } else {
            let curRoute = parseInt(data.props.currentRoute) + 1
            currentRouteForTitle = curRoute.toString()
        }
        console.log(currentRouteForTitle) //hier weiß ers noch
    }
    console.log(currentRouteForTitle) //Empty

</script>

<MiddleCard>
    <FollowUpQuestion {...data.props} {currentRouteForTitle} />
</MiddleCard>


