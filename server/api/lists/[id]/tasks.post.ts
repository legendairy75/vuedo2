// Post rout for tasks

// imports ---------------------------------
import Task from "~~/server/models/Tasks"
import List from "~~/server/models/Lists"
import {connectToDB} from "~~/server/utils/db";

// export function -----------------------------
export default defineEventHandler(async (event) => {
    await connectToDB(); // Wait to connect to mongo

    try {
        // get id from route: /api/lists/:id/tasks
        const{id}=event.context.params;
        // find list first
        const list = await List.findById(id);
        if (!list) {
            return{error: "No list found"};
        }

        const body = await readBody(event); // read the body of the event variable

        const task = await Task.create({ text: body.text, checked: false, list: list._id }); // create task

        // add task to list
        list.tasks.push(task._id);
        await list.save();

        console.log('tasks created successfully')
        return {
            message: `Create: ${body.text}`,
            id: task._id,
            text: body.text,
        }
    } catch (error) {
        console.error('Error reading body:', error);
        return { error: 'Failed to read request body' };
    }

})
