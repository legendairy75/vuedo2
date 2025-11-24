/*
    Get route for lists
    TODO: add try catch to function
 */

// imports ------------------------------
import{connectToDB} from "~~/server/utils/db";
import List from "~~/server/models/Lists";
// import {eventHandler} from "#build/types/nitro-imports";

// export function ----------------------------
export default defineEventHandler(async ()=>{
    await connectToDB(); // wait to connect to mongo
    const lists = await List.find(); // find all tasks
    return lists;
})