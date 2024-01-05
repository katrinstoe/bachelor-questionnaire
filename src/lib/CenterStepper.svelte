<script lang="ts">
    import {Stepper} from "@skeletonlabs/skeleton";
    import {surveyProgress} from "../store.js";
    import {goto} from "$app/navigation";

    function onStepHandler(e: { detail: { step: number, state: { current: number, total: number } } }): void {
        console.log("event:step", e.detail.state.current)
        $surveyProgress = e.detail.state
    }

    function onCompleteHandler(e: Event) {
        $surveyProgress = {total: 1, current: 1}
        goto("/finish")
    }
</script>

<div class="h-full w-full grid content-center">
    <div class="flex justify-center">
        <div class="card p-4 md:w-8/12">
            <Stepper on:step={onStepHandler}
                     on:complete={onCompleteHandler}
                     gap="gap-1 md:gap-2 lg:gap-4"
                     badge="hidden md:inline variant-filled-surface"
                     stepTerm="Frage"
            >
                <slot/>
            </Stepper>
        </div>
    </div>
</div>
