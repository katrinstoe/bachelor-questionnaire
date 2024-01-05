import type {RequestHandler} from "@sveltejs/kit";
import {db, getQandA} from "$lib/server/drizzle";

export const GET: RequestHandler = async ({request}) => {
    console.log("keeping db Alive")
    console.time("dbLifeline")

    try {
        const res = await db.query.QuestionsTable.findFirst()
    } catch (e) {
        console.log(e)
    }
    console.timeEnd("dbLifeline")
    return new Response()
}