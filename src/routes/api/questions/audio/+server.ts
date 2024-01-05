import type {RequestHandler} from "@sveltejs/kit";
import {db, getQandA} from "$lib/server/drizzle";
import {z} from "zod";
import {superValidate} from "sveltekit-superforms/server";
import {error} from "@sveltejs/kit";
import {AudioResultTable, type NewAudioResult} from "$lib/data/AudioResult";

export const GET: RequestHandler = async ({request}) => {
    console.log("getting audio Questions")
    await getQandA()
    return new Response()
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
    const {time, answer, nextRoute, questionID, sessionID, followUpQuestionAnswer}=form.data;

    const result: NewAudioResult = {
        time,
        answer,
        questionID,
        sessionID,
        followUpQuestionAnswer
    };
    console.time("database")
    try {
        await db.insert(AudioResultTable).values(result)
    } catch (e) {
        console.timeEnd("database")
        console.log(e)
        throw error(501, "error writing result to db")
    }

    console.timeEnd("database")
    console.log("written form to db")
    return new Response()
}