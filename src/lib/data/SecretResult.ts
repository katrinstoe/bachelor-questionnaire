import {integer, pgTable, serial, text, varchar} from "drizzle-orm/pg-core";
import type {InferModel} from "drizzle-orm";
import {relations} from "drizzle-orm";
import {QuestionsTable} from "./Question";
import {SessionTable} from "./Session";

export const SecretResultTable = pgTable(
    "secretResults",
    {
        id: serial("id").primaryKey(),
        answer: text('answer').notNull(),
        questionID: varchar('question_id').references(() => QuestionsTable.id).notNull(),
        sessionID: text('session_id')
    }
)

export type secretResult = InferModel<typeof SecretResultTable>
export type NewSecretResult = InferModel<typeof SecretResultTable, "insert">