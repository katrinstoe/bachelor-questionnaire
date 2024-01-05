<script lang="ts">
   import MiddleCard from "$lib/MiddleCard.svelte";
   import NumberQuestion from "$lib/NumberQuestion.svelte";

   let nextRoute = "/demographic/gender"
    let questionID = "age"

</script>

<MiddleCard bg={false}>
   <NumberQuestion text="Wie alt sind Sie?" {nextRoute} {questionID}/>
</MiddleCard>