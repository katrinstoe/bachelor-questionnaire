<script lang="ts">
    import {encode} from "base64-arraybuffer"
    import BigButton from "$lib/BigButton.svelte";
    import {enhance} from "$app/forms";
    import {secretSessionID, sessionID} from "../store";

    export let value
    export let questionText: string
    export let nextRoute: string
    export let questionID: string
    export let submitRoute = "/compensation?/subEncrypted"
    export let nextBtnText = "Weiter"

    export let type = "text"
    export let placeholderText = "Hier Texteingabe"

    $: disabled = active ? "" : "true"

    let key = {
        "key_ops": ["encrypt"],
        "ext": true,
        "kty": "RSA",
        "n": "pL5ziL-yoHTV2dBwGEdd3lU2hc2kscg_ABM8exdJs2BcLE_eWI_u96K9wNajLZUdfbb8PWZvLuGC8oc5t_M9tbN2r23fumlqqAGEgZI0_h3c0Ajr97XSM1zHRmKjWxnH4XMcblnpAb7ZBrXvB4aAIbJz4zOh89TsUoKiIEJFJcxizQ2IxKRGfmDXPsK_m8KOzI8WeQEnLCtnhwkmSYQFdDa8PsvrAsEztWTnSCM7Jp42xMmdQqKGztN8781dnODlWIJVbUO12zemxdxdmf90t5ltjEc8ao1vQ9NZlZ0sJmUOihuY8ahbIzFPhIHXxvE9svyTTgU3knHrBhFkRrjNxw",
        "e": "AQAB",
        "alg": "RSA-OAEP-256"
    }


    async function rsaEncrypt(plaintext, pubKey) {
        const ec = new TextEncoder();
        const publicKey = await crypto.subtle.importKey(
            "jwk",
            pubKey,
            {name: "RSA-OAEP", hash: "SHA-256"},
            true,
            ["encrypt"]
        )

        const ciphertext = await crypto.subtle.encrypt({
            name: 'RSA-OAEP',
        }, publicKey, ec.encode(plaintext));
        return encode(ciphertext)
    }

    let encryptedValue

    let form: HTMLFormElement

    function submitMe() {

        rsaEncrypt(value, key).then( async cypher => {
            let res
            setTimeout(()=>{
                if (!res) {
                    console.log("waited too long")
                    window.location.href=nextRoute
                }
            }, 7000)
            res = await fetch("/api/results/secret",{
                method: "POST",
                body: getFormData(cypher)
            })
            console.log(res.ok)
            window.location.href=nextRoute

        })
    }

    function getFormData(cypher: string){
        const data = new URLSearchParams()
        for (let field of new FormData(form)){
            const [key, value] = field
            data.append(key, value as string)
            console.log(key, "=>", value)
        }
        data.append("encrypted", cypher)
        return data
    }

    let active;

    function unlockButton(e) {
        let inputValue = e.target.value;
        active = !!inputValue;
        e.target.setCustomValidity("");

    }

    let isRequired;
    export let activeByDefault

    let questionIDActiveByDefault;


    $: {
        if (activeByDefault != null) {
            active = activeByDefault;
            questionIDActiveByDefault = questionID;
            isRequired = false;
        } else {
            active = false;
            isRequired = true;
        }
    }

    console.log("nextRouteSecretQuestion: " + nextRoute)
</script>

<!--<section role="document" class="p-4 w-full h-full flex flex-col items-center">-->
<div class="flex flex-col gap-4 bg-white pt-3">
    <!--        <header class="card-header">-->
    <div class="flex justify-center">
        <div class="px-4 !text-2xl" lang="de" id="dialogheading">{@html questionText}</div>
    </div>
    <!--        </header>-->

    <form bind:this={form}
          on:submit|preventDefault={submitMe}
          class="p-4 flex flex-col gap-4 items-center">
        <section class="p-4 w-full flex flex-col items-center">
            {#if type === "email"}
                <input aria-required={isRequired} on:input={unlockButton} class="input" name="answer" id={questionID}
                       title="Textfeld" type="email" bind:value={value}
                       placeholder={placeholderText} aria-label="Eingabefeld Antwort" role="textbox"
                       oninvalid={
                          type === "email" ? "setCustomValidity('Geben Sie bitte eine korrekte E-Mail Adresse ein')" : ""
                        }/>
            {:else}
                <input aria-required={isRequired} on:input={unlockButton} class="input" name="answer" id={questionID}
                       title="Textfeld" type="text" bind:value={value}
                       placeholder={placeholderText} aria-label="Eingabefeld Antwort" role="textbox"
                       oninvalid={type === "text" ? "setCustomValidity('Geben Sie bitte wirklich nur Text ein')" : ""}/>
            {/if}
            <input type="hidden" name="nextRoute" value={nextRoute}>
            <!--            <input type="hidden" name={StorageKeys.SESSION_ID} value={$sessionID}>-->
            <input type="hidden" name="questionID" value={questionID}>
            <input type="hidden" name="sessionID" value={$secretSessionID}>

        </section>

        <footer class="card-footer flex justify-center">
            <div class="flex justify-end items-center">
                <span class="px-4 md:inline hidden text-black/60">Leertaste für weiter</span>
                <BigButton bind:disabled={disabled} type="submit" role="button">{nextBtnText}</BigButton>
            </div>
        </footer>
    </form>
</div>
<!--</section>-->
