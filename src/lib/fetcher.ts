import {demographicQuestions, sessionID as sessionIDStore, defaultQuestions, isSona as isSonaStore} from "../store";
import {get} from "svelte/store";
import type {Question} from "$lib/data/Question";
import type QuestionAndAnswerData from "$lib/data/QuestionAndAnswerData";

export class Fetcher {
    static async sessionID(isSona: boolean) {
        if (get(sessionIDStore) < 1) {
            const sessionJson = await (await fetch("/api/sessions", {
                method: "POST",
                body: JSON.stringify({is_sona: isSona})
            })).json()
            sessionIDStore.set(sessionJson.id)
        }
    }

    static async demographicQuestions() {
        const demQuesitons = get(demographicQuestions)
        if (demQuesitons.length == 0) {
            const demographicJson = await (await fetch("/api/questions/demographic")).json();
            console.log(demographicJson)
            let demographicQuestionsFromDB = demographicJson as QuestionAndAnswerData []
            demographicQuestionsFromDB =  demographicQuestionsFromDB.sort((current, next) => current.question.order - next.question.order )
            demographicQuestions.set(demographicQuestionsFromDB)
        }
    }

    static async defaultQuestions() {
        const defQuestions = get(defaultQuestions)
        if (defQuestions.length == 0) {
            const jsonData = await (await fetch("/api/questions/default")).json() as  QuestionAndAnswerData []
            console.log(jsonData)
            defaultQuestions.set(jsonData)
        }
    }


    static  keepDBAlive() {
        fetch("/api/alive")
    }

    // static async audioQuestions() {
    //     if (get(audioQuestions).length == 0) {
    //         const audioJson = await (await fetch("/api/questions/audio")).json() as AudioQuestionData[]
    //         const qAndA = audioJson.map(quest => new QuestionAndAnswerClass(quest))
    //         const shuffeled = this.shuffleArray(qAndA)
    //         audioQuestions.set(shuffeled)
    //         console.log("got AudioQuestions")
    //     }
    // }

    /**
     * Shuffeles an array with the Fisher-Yates algorith
     * @param array Input array
     * @private
     */
    private static shuffleArray<T>(array: T[]) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array
    }
}