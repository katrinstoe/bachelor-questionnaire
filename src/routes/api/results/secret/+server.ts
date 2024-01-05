import type {RequestHandler} from "@sveltejs/kit";
import {superValidate} from "sveltekit-superforms/server";
import {error, json} from "@sveltejs/kit";
import {type NewSecretResult, SecretResultTable} from "$lib/data/SecretResult";
import {db} from "$lib/server/drizzle";
import {z} from "zod";

const encryptedSchema = z.object({
    nextRoute: z.string().min(1),
    sessionID: z.string().nonempty(),
    questionID: z.string().min(1),
    encrypted: z.string().min(1)
})
export const POST: RequestHandler = async ({request}) => {
    console.log("got secret request 2")
    const form = await superValidate(request, encryptedSchema)
    if (!form.valid) {
        console.log(form)
        throw error(501, "invalid form Data from SubEncrpted" + form.errors)
    }

    // console.timeEnd("dbsecret")
    console.time("dbsecret")
    const {encrypted, nextRoute, questionID, sessionID} = form.data;
    const result: NewSecretResult = {answer: encrypted, sessionID: sessionID, questionID: questionID}
    try {
        console.log("before inserting")
        await db.insert(SecretResultTable).values(result)
        console.log("after inserting")
    } catch (e) {
        console.log("error inserting secret to db:\n", e)
        console.timeEnd("dbsecret")
        throw error(501, "error writing result to db")
    }
    console.timeEnd("dbsecret")
    return new Response()
}
