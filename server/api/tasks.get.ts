// Get route for tasks

// imports -----------------------------------
import{connectToDB} from "~~/server/utils/db";
import Task from "~~/server/models/Tasks";
// import {eventHandler} from "#build/types/nitro-imports";

// export function --------------------------
export default defineEventHandler(async (event)=>{
    await connectToDB(); // wait to connect to mongo

    const query = getQuery(event) // take the value from query
    const {listId} = query // set that value to listId

    if (!listId) {
        return await Task.find(); // or return []
    }

    return await Task.find({ list: listId }); // return tasks from list with listId

    /*const tasks = await Task.find(); // find all tasks
    return tasks;*/
})