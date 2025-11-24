import { getQuery, readBody } from 'h3'
import Task from"../models/Tasks"
import {connectToDB} from "~~/server/utils/db";

export default defineEventHandler(async (event) => {
    await connectToDB();
    // Safely read all possible inputs
    const query = getQuery(event)
    const body = await readBody(event).catch(() => ({}))  // avoid crash if no body
    const params = event.context?.params || {}            // safe optional chain

    // Pick whichever has the id
    const id = query.id || body.id || params.id

    console.log("Id:", id)

    if (!id) {
        return { error: 'No ID provided in params, body, or query' }
    }

    await Task.findByIdAndDelete(id)
    console.log('deleteTask:',id)

    return { message: `Delete ID: ${id}` }
})