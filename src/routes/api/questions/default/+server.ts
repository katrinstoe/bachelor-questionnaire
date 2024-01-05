import type {RequestHandler} from "@sveltejs/kit";
import {error, json} from "@sveltejs/kit";
import {db} from "$lib/server/drizzle";
import {QuestionsTable, QuestionsTable as questions} from "$lib/data/Question";
import {eq} from "drizzle-orm";
import type QuestionAndAnswerData from "$lib/data/QuestionAndAnswerData";
import {superValidate} from "sveltekit-superforms/server";
import {z} from "zod";
import {type NewResult, ResultTable} from "$lib/data/Result";

export const GET: RequestHandler = async ({request}) => {
    console.log("getting Demographic Questions")
    try {
        const res = await db.query.QuestionsTable.findMany({
            with: {
                questionToQandA: {with: {answer: true}}
            },
            where: eq(QuestionsTable.type, "default")
        })

        const followUpRes = await db.query.QuestionsTable.findMany({
            with: {
                questionToQandA: {with: {answer: true}}
            },
            where: eq(QuestionsTable.type, "followUp")
        })

        const mappedRes = res.map(row => {
            const qAndA: QuestionAndAnswerData = {question: row, answers: row.questionToQandA.map(obj => obj.answer)}
            return qAndA
        })
        const mappedFollowUpRes = followUpRes.map(row => {
            const qAndA: QuestionAndAnswerData = {question: row, answers: row.questionToQandA.map(obj => obj.answer)}
            return qAndA
        })

        // Find the question with ID "m1" and remove it from the array
        const indexToRemove = mappedRes.findIndex(
            (question) => question.question.id === "m1"
        );
        if (indexToRemove !== -1) {
            mappedRes.splice(indexToRemove, 1);
        }

        const shuffeledQuestions = shuffleArray(mappedRes)
        const allQuestions: QuestionAndAnswerData[] = []
        for (const question of shuffeledQuestions) {
            allQuestions.push(question)
            // allQuestions.push(mappedFollowUpRes[0])
        }



        console.log(allQuestions)

        return json(allQuestions)
    } catch (e) {
        throw error(500, "unable to get demographic questions from Database")
    }
}

const resSchema = z.object({
    time: z.number(),
    answer: z.string().min(1),
    questionID: z.string().min(1),
    followUpQuestionAnswer: z.string().optional(),
    sessionID: z.number().positive(),
    nextRoute: z.string().min(1)
})
export const POST: RequestHandler = async ({request})=>{
    console.log("got Request")
    const form = await superValidate(request, resSchema)
    if (!form.valid) {
        throw error(500,"invalid form Data" + form.errors)
    }

    const {time, answer, nextRoute, questionID, sessionID}=form.data;

    const result: NewResult = {
        time,
        answer,
        questionID,
        sessionID
    };

    console.time("database")
    try {
        await db.insert(ResultTable).values(result)
    } catch (e) {
        console.timeEnd("database")
        console.log(e)
        throw error(501, "error writing result to db")
    }

    console.timeEnd("database")
    console.log("written form to db")
    return new Response()
}

function shuffleArray<T>(array: T[]) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array
}
