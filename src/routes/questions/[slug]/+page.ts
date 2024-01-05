import {defaultQuestions} from "../../../store";
import {get} from "svelte/store";
import type {PageLoad} from "./$types"

export const ssr = false


export const load: PageLoad = async ({params}) => {
    console.log(params.slug)
    const slug = parseInt(params.slug)
    let next = "/questions/" + (slug + 1);
    const currentQuestion = get(defaultQuestions)[slug];


    if (slug + 2 > get(defaultQuestions).length) {
        next = "/end" // Hier die Route wo man nach den demografischen Daten hin möchte
    }
    const submitRoute = "/questions?/submit";

    const props = {
        options: currentQuestion.answers,
        questionText: currentQuestion.question.text,
        nextRoute: next,
        questionID: currentQuestion.question.id,
        vertical: true,
        questionUrl: currentQuestion.question.audioURL,
        submitRoute: submitRoute,
        currentRoute: "" + slug
    }

    if (currentQuestion) {
        return {current: currentQuestion, next, props}

    }

}



