<script lang="ts">
    import Question from "$lib/Question.svelte";

    export let text = "no Question Text Given"
    export let nextRoute
    export let currentRoute
    export let questionID: string
    // export let type = "text"

    export let submitRoute

    export let placeholderText = "Hier Texteingabe"

    export let nextBtnText

    export let activeByDefault

    let active
    let questionIDActiveByDefault
    let isRequired;
    export let type = "text"

    if (activeByDefault != null) {
        active = activeByDefault;
        questionIDActiveByDefault = questionID;
        isRequired = false;
    } else {
        active = false;
        isRequired = true;
    }

    function unlockButton(e) {
        let inputValue = e.target.value
        active = activeByDefault !== undefined ? activeByDefault : !!inputValue;
        e.target.setCustomValidity("");
    }


</script>
<Question {text} {active} next={nextRoute} questionID={questionID} {submitRoute} {nextBtnText}
          currentRoute={currentRoute}>
    <input aria-required={isRequired} on:input={unlockButton} class="input" name="answer" id={questionID}
           title="Textfeld" type={type}
           placeholder={placeholderText} aria-label="Eingabefeld Antwort" role="textbox"
           oninvalid={
      type === "email" ? "setCustomValidity('Geben Sie bitte eine korrekte E-Mail Adresse ein')" : ""
    }
    />
</Question>
