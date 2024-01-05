import {pgEnum, pgTable, serial, text, varchar} from "drizzle-orm/pg-core";
import type {InferModel} from "drizzle-orm";
import {relations} from "drizzle-orm";
import {questionAndAnswerTable} from "./QuestionAndAnswerData";


export const questionsType = pgEnum("questiontype", ["demographic", "default", "end", "compensation", "followUp"])
export const answerType = pgEnum("answertype", ["multipleChoice", "freeText"])
export const QuestionsTable = pgTable(
    "questions",
    {
        id: varchar('id').primaryKey(),
        text: text("question").notNull(),
        type: questionsType("type").notNull().default("default"),
        skipsQuestionID: text('skips_question_id').array(20),
        order: serial('order').notNull(),
        answerType: answerType("answer_type").notNull().default("multipleChoice"),
        audioURL: text('audio_url')
    })

export const questionRelations = relations(QuestionsTable, ({many})=>({
        questionToQandA: many(questionAndAnswerTable)
}))

export type Question = InferModel<typeof QuestionsTable>
export type NewQuestion = InferModel<typeof QuestionsTable, 'insert'>