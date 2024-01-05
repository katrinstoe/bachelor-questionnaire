import type {NewQuestion, Question} from "$lib/data/Question";
import {QuestionsTable} from "$lib/data/Question";
import {db} from "$lib/server/drizzle";
import {eq} from "drizzle-orm";
import type {NewAnswer} from "$lib/data/Answer";
import type {NewQuestionAndAnswerData} from "$lib/data/QuestionAndAnswerData";
import {AnswerOptionTable} from "$lib/data/Answer";
import {questionAndAnswerTable} from "$lib/data/QuestionAndAnswerData";
import {ResultTable} from "$lib/data/Result";
import {AudioResultTable} from "$lib/data/AudioResult";
import {SessionTable} from "$lib/data/Session";
import {SecretResultTable} from "$lib/data/SecretResult";


export async function addDemographicQuestions() {
    const answers1: NewAnswer[] = [
        {
            id: "m31",
            text: "Äußert sicher"
        },
        {id: "m32", text: "Sehr sicher"},
        {id: "m33", text: "Etwas sicher"},
        {id: "m34", text: "Nur bedingt sicher"},
        {id: "m35", text: "Überhaupt nicht sicher"},
    ]
    const quest1: NewQuestion = {
        id: "v3Sona",
        text: "<h1>Herzlichen Dank für Ihre Teilnahme!</h1><br><p>Wir werden uns kümmern, dass die Versuchspersonenstunden zeitnah verbucht werden. Falls Probleme bei der Verbuchung auftreten sollten, können Sie sich auch in diesem Fall an katrin.stoetter@stud-mail.uni-wuerzburg.de wenden.</p><br><p>Sie dürfen die Umfrage nun schließen</p>",
        type: "default",
        answerType: "multipleChoice"
    }
    const questionAndAnswers: NewQuestionAndAnswerData[] = [{
        question: quest1,
        answers: answers1
    }]

    try {
        // await db.insert(AnswerOptionTable).values(answers1).onConflictDoNothing()
        // await db.insert(QuestionsTable).values(quest1).onConflictDoNothing()
        // for (const questionAndAnswer of questionAndAnswers) {
        //     await db.insert(questionAndAnswerTable).values(QuestionAndAnswer.toDrizzle(questionAndAnswer)).onConflictDoNothing()
        // }

    } catch (e) {
        console.log(e)
    }
}

export async function clearAndInsertDemographicQuestions() {
    // await db.delete(QuestionsTable).where(eq(QuestionsTable.type, "demographic"))
    await db.delete(ResultTable)
    await db.delete(AudioResultTable)
    await db.delete(SessionTable)
    await db.delete(SecretResultTable)

    // await addDemographicQuestions()
}

export async function addAudioQuestions() {

    console.log("AddAudioQuestion not implemented")
}

