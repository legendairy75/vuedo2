// Put route for tasks

// imports ----------------------------
import{connectToDB} from "~~/server/utils/db";
import Task from "~~/server/models/Tasks";

// exports --------------------------------
export default defineEventHandler(async (event)=> {

    const id = event.context.params.id //fet id from url
    if(!id) return sendError(event,{ statusCode: 400, statusMessage: 'Task ID required'})

    await connectToDB(); // Wait to connect to mongo

    try {
        const res = await Task.findByIdAndUpdate(id,{checked:true}) // update task
        if (!res) return sendError(event, { statusCode: 404, statusMessage:'Task not found'})
        return { success: true , message: `Task was updated successfully` };
    } catch (err) {
        console.error(err);
        return sendError(event, { statusCode: 500, statusMessage:'Internal server error'})
    }

})