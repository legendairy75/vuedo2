//Post route for list

// imports ---------------------------------
import{connectToDB} from "~~/server/utils/db";
import List from "~~/server/models/Lists";

// export function --------------------------------
export default defineEventHandler(async (event) => {
    await connectToDB(); // Wait to connect to mongo

    try {
        const body = await readBody(event); // read the body of the event variable

        const newList = await List.create({ name: body.name }); // create list
        console.log('list created successfully')
        return (newList) // return created list
        return { message: `Create: ${newList.name}` }
    } catch (error) {
        console.error('Error reading body:', error);
        return { error: 'Failed to read request body' };
    }

})