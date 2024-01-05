import {integer, pgTable, serial, text, varchar} from "drizzle-orm/pg-core";
import type {InferModel} from "drizzle-orm";
import {relations} from "drizzle-orm";
import {QuestionsTable} from "./Question";
import {SessionTable} from "./Session";

export const ResultTable = pgTable(
    "results",
    {
        id: serial("id").primaryKey(),
        time: integer('time').default(0),
        answer: text('answer').notNull(),
        questionID: varchar('question_id').references(() => QuestionsTable.id).notNull(),
        sessionID: integer('session_id').references(() => SessionTable.id).notNull()
    }
)

const resultRelations = relations(ResultTable, ({one})=>({
    session: one(SessionTable, {
        fields: [ResultTable.sessionID],
        references: [SessionTable.id]
    })
}))

export type Result = InferModel<typeof ResultTable>
export type NewResult = InferModel<typeof ResultTable, "insert">