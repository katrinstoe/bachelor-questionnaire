import {error, json, type RequestHandler} from "@sveltejs/kit";
import {createNewSessionInDB} from "$lib/server/drizzle";


export const GET: RequestHandler = async ({request}) => {
    console.log("getSession")
    return await createNewSession(request)
}

export const POST: RequestHandler = async ({request})=>{
    return await createNewSession(request)
}

async function createNewSession(request: Request) {
    const res = await  request.json()
    ///--------TODO if the page has a sessionID in the store at the beginning it should be checked, whether there are
    // all results with that id. if not the session should jump the the last answered question or override everything.
    // if there are all results, it should generate a new session, or something

        try {
            const sessionID = await createNewSessionInDB(res.is_sona)

            console.log(sessionID)
            return json({id: sessionID})
        } catch (e) {
            console.log(e)
            throw error(500, "problem getting new Session")
        }

}