import type {RequestHandler} from "@sveltejs/kit";
import {clearAndInsertDemographicQuestions} from "$lib/server/addQuestions";

export const GET: RequestHandler = async (e)=>{
    await clearAndInsertDemographicQuestions()
    return new Response()
}
