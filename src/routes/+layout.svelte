<script lang='ts'>
    // The ordering of these imports is critical to your app working properly
    import '@skeletonlabs/skeleton/themes/theme-gold-nouveau.css';
    // If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
    import '@skeletonlabs/skeleton/styles/skeleton.css';
    // Most of your app wide CSS should be put in this file
    import '../app.pcss';
    import {AppBar, AppShell} from "@skeletonlabs/skeleton";
    import Footer from "$lib/Footer.svelte";
    import "iconify-icon"
    import {onMount} from "svelte";

    import {Fetcher} from "$lib/fetcher";
    import {isSona} from "../store";


    onMount(async () => {
        console.log("Mount Layout")
        const demographicPromise = Fetcher.demographicQuestions()
        const sessionPromise = Fetcher.sessionID($isSona);
        let defaultPromise = Fetcher.defaultQuestions();
        // const audioPromise = Fetcher.audioQuestions()
        await sessionPromise
        await Promise.all([demographicPromise, defaultPromise])
        // const urls = $audioQuestions.flatMap(quest => [quest.question.answer1Obj.audioURL, quest.question.answer2Obj.audioURL]) as string[];
        // const promises = urls.map(url => fetch(url))
        // await Promise.all([promises])
        keepDBAlive()
    })

    function keepDBAlive() {
        setInterval(()=> {
            Fetcher.keepDBAlive()
        }, 30000)
    }

</script>

<!--<pre>{JSON.stringify($sessionIDStore)}</pre>-->

<AppShell>
    <svelte:fragment slot="header">
        <AppBar>Emoji Sonifizierung</AppBar>
    </svelte:fragment>
    <slot/>
</AppShell>
