import type {Config} from "drizzle-kit"

export default {
    schema: "src/lib/data/*",
    out: "./migrations-folder"
} satisfies Config