import type {Actions} from "@sveltejs/kit";
import {error, redirect} from "@sveltejs/kit";
import type {NewResult} from "$lib/data/Result";
import {db} from "$lib/server/drizzle";
import {ResultTable} from "$lib/data/Result";
import {z} from "zod";
import {superValidate} from "sveltekit-superforms/server";
import {type NewSecretResult, SecretResultTable} from "$lib/data/SecretResult";

const defaultSchema = z.object({
    answer: z.string().min(1),
    nextRoute: z.string().min(1),
    sessionID: z.number(),
    questionID: z.string().min(1)
})

const encryptedSchema = z.object({
    nextRoute: z.string().min(1),
    sessionID: z.string().nonempty(),
    questionID: z.string().min(1),
    encrypted: z.string().min(1)
})

export const actions: Actions = {
    submit: async (event) => {
        const form = await superValidate(event, defaultSchema)
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
    },
    subEncrypted: async (event )=> {
        const form = await superValidate(event, encryptedSchema)
        if (!form.valid) {
            console.log(form)
            throw error(501,"invalid form Data from SubEncrpted" + form.errors)
        }


        const {encrypted, nextRoute, questionID, sessionID}=form.data;
        const result:NewSecretResult = {answer: encrypted, sessionID: sessionID, questionID: questionID}
        try {
            await db.insert(SecretResultTable).values(result)
        } catch (e) {
            console.log(e)
            throw error(501, "error writing result to db")
        }
        console.log("sessionID", sessionID)
        console.log("redirecting to ", nextRoute)
        throw redirect(303, nextRoute)
    }
}

