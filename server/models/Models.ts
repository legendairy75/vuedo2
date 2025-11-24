// Schema for task

// import mongoose modual
import mongoose, {Schema} from "mongoose";

const TaskSchema= new mongoose.Schema({
    text: String, // text must be of type string
    checked: Boolean, // checked must be either true or faulse
    // list: Schema.Types.ObjectId,
});

const TaskRef = mongoose.model('Task', TaskSchema);

const ListSchema= new mongoose.Schema({
    name: String, // text must be of type string
    tasks:[{
        type: Schema.Types.ObjectId,
        ref: "TaskRef"
    }]
});

export const Task =
    mongoose.models.Task || mongoose.model("Task", TaskSchema);

export const List =
    mongoose.models.List || mongoose.model("List", ListSchema);
