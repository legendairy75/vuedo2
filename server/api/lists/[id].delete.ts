// Delete route for list using ID

// imports -------------------------------------
import{connectToDB} from "~~/server/utils/db";
import List from "~~/server/models/Lists";

// export function ------------------------------------
export default defineEventHandler(async (event)=> {
    const id = event.context.params.id //fetch id from url
    if(!id) return sendError(event,{ statusCode: 400, statusMessage: 'ListID required'})

    await connectToDB(); // Wait to connect to mongo

    try {
        const res = await List.findByIdAndDelete(id) // Delete task
        if (!res) return sendError(event, { statusCode: 404, statusMessage:'List not found'})
        return { success: true , message: `List was deleted successfully` };
    } catch (err) {
        console.error(err);
        return sendError(event, { statusCode: 500, statusMessage:'Internal server error'})
    }
})
