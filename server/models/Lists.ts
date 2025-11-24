/*
    Schema for list
    NOTE: import Task may or may not be required
 */

// import mongoose modual
import mongoose, {Schema} from "mongoose";
import Task from "~~/server/models/Tasks";

const ListSchema= new mongoose.Schema({
    name: String, // name must be of type string
    // add child tasks id to schema
    tasks:[{
        type: Schema.Types.ObjectId,
        ref: "Task"
    }]
});

export default mongoose.models.Lists || mongoose.model("List", ListSchema);