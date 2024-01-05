import {sql} from "@vercel/postgres";
import {drizzle} from "drizzle-orm/vercel-postgres"
import * as sessions from "$lib/data/Session"
import * as questions from "$lib/data/Question";
import * as results from "$lib/data/Result";
import * as answer from "$lib/data/Answer";
import * as qAndA from "$lib/data/QuestionAndAnswerData";


import {eq, sql as drizzleSQL} from "drizzle-orm";
import type QuestionAndAnswerData from "$lib/data/QuestionAndAnswerData";
import {QuestionsTable} from "$lib/data/Question";


export async function createNewSessionInDB(is_sona: boolean) {
    const result = await db.execute<{ id: number }>(drizzleSQL`
        INSERT INTO sessions (id, start_time, is_sona)
        VALUES (DEFAULT, DEFAULT, ${is_sona}) returning *`)
    return result.rows.at(0)!.id
}

export async function getQandA() {
    const rows = await db.query.QuestionsTable.findMany({with: {
        questionToQandA: {with: {answer: true}}},
        where: eq(QuestionsTable.type, "demographic")
    }
    )
    console.log(rows);
}


export const db = drizzle(sql, {
    schema: {
        ...sessions,
        ...questions,
        ...results,
        ...answer,
        ...qAndA
    }
})
