// Post rout for tasks

import Task from "~~/server/models/Tasks"
import List from "~~/server/models/Lists"
import {connectToDB} from "~~/server/utils/db";

export default defineEventHandler(async (event) => {
    await connectToDB(); // Wait to connect to mongo

    try {
        // get id & taskId from route: /api/lists/:id/tasks/:taskId
        const{id, taskId}=event.context.params;
        // find list first

        const deleteTask = await Task.findByIdAndDelete(taskId); // delete task
        if (!deleteTask) {
            return {error: 'Task not found'};
        }

        // remove task from list
        const list = await List.findByIdAndUpdate(id, {
            $pull: {tasks: taskId}
        });
        if (!list) {
            return{error: "No list found"};
        }

        console.log('tasks deleted successfully')
        return { message: `Deleted: ${deleteTask.text}` }
    } catch (error) {
        console.error('Error reading body:', error);
        return { error: 'Failed to read request body' };
    }

})
