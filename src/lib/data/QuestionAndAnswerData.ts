import type {Answer, NewAnswer} from "./Answer";
import type {NewQuestion, Question} from "./Question";
import {pgTable, primaryKey, varchar} from "drizzle-orm/pg-core";
import {type InferModel, relations} from "drizzle-orm";
import {QuestionsTable} from "./Question";
import {AnswerOptionTable} from "./Answer";

export const questionAndAnswerTable = pgTable(
    "questions_to_answers",
    {
        questionID: varchar("question_id").notNull(),
        answerID: varchar("answer_id").notNull()
    },
    (t) => ({
        pk: primaryKey(t.answerID, t.questionID)
    })
)

type QuestionAndAnswerModel = InferModel<typeof questionAndAnswerTable>

export const questionAnswerRelations = relations(questionAndAnswerTable, ({one}) => ({
    question: one(QuestionsTable, {
        fields: [questionAndAnswerTable.questionID],
        references: [QuestionsTable.id]
    }),
    answer: one(AnswerOptionTable, {
        fields: [questionAndAnswerTable.answerID],
        references: [AnswerOptionTable.id]
    })
}))

export default interface QuestionAndAnswerData {
    question: Question
    answers: Answer[]
}

export interface NewQuestionAndAnswerData{
    question: NewQuestion
    answers: NewAnswer[]
}

export class QuestionAndAnswer {

    static toDrizzle(data: NewQuestionAndAnswerData): QuestionAndAnswerModel[] {
        return data.answers.map(answer => ({questionID: data.question.id, answerID: answer.id}))

    }
}

