import {integer, pgTable, serial, text, varchar} from "drizzle-orm/pg-core";
import type {InferModel} from "drizzle-orm";
import {relations} from "drizzle-orm";
import {QuestionsTable} from "./Question";
import {SessionTable} from "./Session";
import {createInsertSchema} from "drizzle-zod";

export const AudioResultTable = pgTable(
    "audio_results",
    {
        id: serial("id").primaryKey(),
        time: integer('time').default(0),
        answer: text('answer').notNull(),
        questionID: varchar('question_id').references(() => QuestionsTable.id).notNull(),
        followUpQuestionAnswer: text('follow_up_answer'),
        sessionID: integer('session_id').references(() => SessionTable.id).notNull()
    }
)
 export const AudioResultInsertSchema = createInsertSchema(AudioResultTable);
const resultRelations = relations(AudioResultTable, ({one})=>({
    session: one(SessionTable, {
        fields: [AudioResultTable.sessionID],
        references: [SessionTable.id]
    })
}))

export type AudioResult = InferModel<typeof AudioResultTable>
export type NewAudioResult = InferModel<typeof AudioResultTable, "insert">