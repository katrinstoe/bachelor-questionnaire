<script lang="ts">
    import {ProgressBar} from "@skeletonlabs/skeleton";
    import {surveyProgress} from "../store.js";
</script>
<div class="m-4">
    <ProgressBar label="progress" value={$surveyProgress.current} max={$surveyProgress.total}/>
</div>
