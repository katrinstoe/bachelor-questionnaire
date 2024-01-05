<script lang="ts">
    import Question from "$lib/Question.svelte";

    export let text = "no Question Text Given"
    export let nextRoute
    export let questionID:string

    let active
    function unlockButton(e) {
        let inputValue = e.target.value
        active = !!inputValue;

    }

</script>
<Question {text} {active} next={nextRoute} {questionID}>
    <input required on:input={unlockButton} class="input" name="answer" id="age" title="Input (number)" type="number"/>
</Question>
