<script lang="ts">
    import {ListBox, ListBoxItem, RadioGroup, RadioItem} from "@skeletonlabs/skeleton";
    import Question from "$lib/Question.svelte";
    import {onMount} from "svelte";

    export let options: string[]
    export let text: string
    let value: string
    $: active = value

    let form: HTMLFormElement
    onMount(() => {
        window.addEventListener("keydown", (e) => {
            if (e.code === "Enter") {
                form.requestSubmit();
            }
        })
    })
    let freeText

    function unlockButton(e) {
        let inputValue = e.target.value
        if (inputValue) {
            value = 'true';
        } else {
            value = '';
        }
    }


</script>


<Question {active} bind:form={form} bind:text={text}>
    <slot/>
    <ListBox>
        {#each options as option}
            <ListBoxItem bind:group={value} name="justify" value={option}>{option}</ListBoxItem>
        {/each}
        <input type="text" bind:value={freeText} on:input={unlockButton}
               class="input text-white w-full border-0 bg-surface-700"
               placeholder="Andere Option">
    </ListBox>
</Question>
