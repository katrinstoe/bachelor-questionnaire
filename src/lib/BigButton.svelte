<script lang="ts">
    export let type: "reset"| "button" | "submit" = "button"
    export let disabled = false
</script>
<button on:click
        type="{type}"
        disabled="{disabled}"
        class="btn variant-filled font-bold md:w-32 w-full">
    <slot/>
</button>

<style>
    button:focus{
        outline: 2px solid blue;
        box-shadow: 0 0 0 2px blue;
        border: 2px solid blue;
    }
</style>