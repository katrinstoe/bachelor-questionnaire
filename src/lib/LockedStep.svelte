
<script lang="ts">
    import {Step} from "@skeletonlabs/skeleton";

    let locked = true

    function setLocked(state: boolean) {
        locked = state
    }



</script>

<Step {locked}  >
    <slot {locked} {setLocked}/>
</Step>