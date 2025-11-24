// Schema for task

// import mongoose modual
import mongoose, {Schema} from "mongoose";
import List from "~~/server/models/Lists"

const TaskSchema= new mongoose.Schema({
    text: String, // text must be of type string
    checked: Boolean, // checked must be either true or faulse
    // add the parent lists id to schema
    list: [{
        type: Schema.Types.ObjectId,
        ref: "List"
    }]
});

export default mongoose.models.Tasks || mongoose.model("Task", TaskSchema);