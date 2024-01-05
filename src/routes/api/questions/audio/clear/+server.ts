import type {RequestHandler} from "@sveltejs/kit";
import {addAudioQuestions} from "$lib/server/addQuestions";
import {error} from "@sveltejs/kit";

export const GET: RequestHandler = async (e)=>{
    console.log("generating")
    try {
        await addAudioQuestions()
    } catch (e) {
        throw error(500, "error while adding questions to DB")
    }
    console.log("generated")
    return new Response()
}
