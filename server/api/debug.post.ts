import { readRawBody } from "h3";

export default defineEventHandler(async (event) => {
    const raw = await readRawBody(event).catch(() => {});
    console.log("Body type:", typeof raw);
    console.log("Body content:", raw);
    return { ok: true };
});
