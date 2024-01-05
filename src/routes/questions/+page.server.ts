// Save into AudioResult

import {type Actions, error, redirect} from "@sveltejs/kit";
import {db} from "$lib/server/drizzle";
import {AudioResultInsertSchema, AudioResultTable, type NewAudioResult} from "$lib/data/AudioResult";
import {superValidate} from "sveltekit-superforms/server";
import { type NewResult, ResultTable} from "$lib/data/Result";
import {z} from "zod";

const resSchema = z.object({
    time: z.number(),
    answer: z.string().min(1),
    questionID: z.string().min(1),
    followUpQuestionAnswer: z.string().optional(),
    sessionID: z.number().positive(),
    nextRoute: z.string().min(1)
})

export const actions: Actions = {
    submit: async (event) => {


        const form = await superValidate(event, resSchema)
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

        console.log(nextRoute);
        if (nextRoute) {
            throw redirect(303, nextRoute)
        }
    }
}