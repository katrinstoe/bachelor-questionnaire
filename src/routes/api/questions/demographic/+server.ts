import type {RequestHandler} from "@sveltejs/kit";
import {error, json} from "@sveltejs/kit";
import {db} from "$lib/server/drizzle";
import {QuestionsTable, QuestionsTable as questions} from "$lib/data/Question";
import {eq} from "drizzle-orm";
import type QuestionAndAnswerData from "$lib/data/QuestionAndAnswerData";

export const GET: RequestHandler = async ({request}) => {
    console.log("getting Demographic Questions")
    try {
        const res = await db.query.QuestionsTable.findMany({
            with: {
                questionToQandA: {with: {answer: true}}
            },
            where: eq(QuestionsTable.type, "demographic")
        })
        const mappedRes = res.map(row => {
            const qAndA: QuestionAndAnswerData = {question: row, answers: row.questionToQandA.map(obj => obj.answer)}
            return qAndA
        })
        console.log(mappedRes)

        return json(mappedRes)
    } catch (e) {
        throw error(500, "unable to get demographic questions from Database")
    }
}

