import type {Actions} from "@sveltejs/kit";
import {error, redirect} from "@sveltejs/kit";
import type {NewResult} from "$lib/data/Result";
import {db} from "$lib/server/drizzle";
import {ResultTable} from "$lib/data/Result";
import {z} from "zod";
import {superValidate} from "sveltekit-superforms/server";

const demographicSchema = z.object({
    answer: z.string().min(1),
    nextRoute: z.string().min(1),
    sessionID: z.number().positive("SessionID has to be Positive"),
    questionID: z.string().min(1)
})

export const actions: Actions = {
    submit: async (event) => {
        const form = await superValidate(event, demographicSchema)
        if (!form.valid) {
            throw error(501,"invalid form Data" + form.errors)
        }
        const {answer, nextRoute, questionID, sessionID}=form.data;

        const result: NewResult = {
            questionID,
            sessionID,
            answer
        };

        try {
            await db.insert(ResultTable).values(result)
        } catch (e) {
            console.log(e)
            throw error(501, "error writing result to db")
        }

        console.log(nextRoute);
        if (nextRoute) {
            throw redirect(303, nextRoute)
        }
    }
}
