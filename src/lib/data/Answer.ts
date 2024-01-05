import {pgTable, text, varchar, boolean} from "drizzle-orm/pg-core";
import type {InferModel} from "drizzle-orm";
import {createInsertSchema, createSelectSchema} from "drizzle-zod";
import {relations} from "drizzle-orm";
import {questionAndAnswerTable} from "./QuestionAndAnswerData";

export const AnswerOptionTable = pgTable(
    "answerOptions",
    {
        id: varchar('id').primaryKey(),
        text: text('text').notNull(),
        correct: boolean("correct")
    }
)

export const answerRelations = relations(AnswerOptionTable, ({many})=>({
    answerToQandA: many(questionAndAnswerTable)
}))

export type Answer = InferModel<typeof AnswerOptionTable>
export type NewAnswer = InferModel<typeof AnswerOptionTable, 'insert'>

export const selectAnswerOptionSchema = createSelectSchema(AnswerOptionTable)
export const insertAnswerOptionSchema = createInsertSchema(AnswerOptionTable)


