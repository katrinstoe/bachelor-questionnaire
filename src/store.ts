import {type Writable, writable} from "svelte/store";
import type {Question} from "$lib/data/Question";
import {localStorageStore} from "@skeletonlabs/skeleton";
import type QuestionAndAnswerData from "$lib/data/QuestionAndAnswerData";


export const surveyProgress = writable({total: 1, current: 0})

export const isSona = localStorageStore("isSona", false, {storage: "session"})
export const sessionID = localStorageStore("sessionID", -1, {storage: "session"})
export const secretSessionID = localStorageStore("secretSessionID", "error", {storage: "session"})

export const demographicQuestions: Writable<QuestionAndAnswerData[]> = localStorageStore("demographicQuestions", [], {storage: "session"})
export const defaultQuestions: Writable<QuestionAndAnswerData[]> = localStorageStore("defaultQuestions", [], {storage: "session"})






export function clearAllStores() {
    surveyProgress.set({total: 1, current: 0})
    sessionID.set(-1)
    demographicQuestions.set([])
    defaultQuestions.set([])
    isSona.set(false)
}
