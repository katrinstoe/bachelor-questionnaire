import type {PageLoad} from "./$types"
import {demographicQuestions} from "../../../store";
import {get} from "svelte/store";
import RadioQuestion from "$lib/RadioQuestion.svelte";
import TextQuestion from "$lib/TextQuestion.svelte";
import type {Answer} from "$lib/data/Answer";

export const ssr = false


export const load: PageLoad = async ({params}) => {
    const slug = parseInt(params.slug)
    let next = "/demographic/" + (slug + 1);
    const currentQuestion = get(demographicQuestions)[slug];

    // To sort answers by size for ages, etc.
    function sortArrayById(answers: Answer[]) {
        answers.sort((a, b) => {
            const idA = parseInt(a.id.substring(2));
            const idB = parseInt(b.id.substring(2));

            if (idA < idB) {
                return -1;
            }
            if (idA > idB) {
                return 1;
            }
            return 0;
        });

        return answers;
    }

    const sortedArray = sortArrayById(currentQuestion.answers);

    if (slug + 2 > get(demographicQuestions).length) {
        next = "/questions" // Hier die Route wo man nach den demografischen Daten hin möchte
    }


    let selected
    let props
    const skips = currentQuestion.question.skipsQuestionID || [""]
    if (currentQuestion) {
        switch (currentQuestion.question.answerType) {
            case "multipleChoice":
                props = {
                    options: currentQuestion.answers,
                    questionText: currentQuestion.question.text,
                    nextRoute: next,
                    questionID: currentQuestion.question.id,
                    vertical: true,
                    currentRoute: ""+slug,
                    skips: skips[0]
                }
                selected = RadioQuestion
                break
            case "freeText":
                props = {questionID: currentQuestion.question.id, nextRoute: next, text: currentQuestion.question.text, currentRoute: ""+slug}
                selected = TextQuestion
                break
        }
    }
    return {current: currentQuestion, next, selected, props}
}