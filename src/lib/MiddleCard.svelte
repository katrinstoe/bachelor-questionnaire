<script lang="ts">
    export let bg = true
    let background = bg ? "card": ""
</script>
<div class="h-full w-full flex justify-center items-center pt-3">
    <div class="{background} sm:max-w-screen-xl flex flex-col gap-4 flex-grow mx-2 md:mx-8 p-4 max-[410px]:max-w-xs">
        <slot/>
    </div>
</div>
