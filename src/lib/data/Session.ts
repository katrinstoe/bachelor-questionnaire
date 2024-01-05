import {boolean, pgTable, serial, timestamp} from "drizzle-orm/pg-core";
import type {InferModel} from "drizzle-orm";
import type {NewResult} from "./Result";

export const SessionTable = pgTable(
    "sessions",
    {
        id: serial('id').primaryKey().notNull(),
        startTime: timestamp('start_time').defaultNow(),
        isSona: boolean('is_sona').default(false)
    }
)

// export const sessionRelations = relations(SessionTable, ({many}) => ({
//     results: many(ResultTable)
// }))

export type DBSession = InferModel<typeof SessionTable>
export type NewDBSession = InferModel<typeof SessionTable, 'insert'>




export interface Session {
    id: number,
    results: NewResult[]
}