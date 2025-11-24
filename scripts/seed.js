// seed script

// imports ---------------------------------
import mongoose from 'mongoose'
import { faker } from '@faker-js/faker'

// MongoDB connection --------------------------
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/voodo'

// define schema and model ----------------------
const taskSchema = new mongoose.Schema({
    text: String,
    checked: Boolean,
    list: [{ type: mongoose.Schema.Types.ObjectId, ref: "List" }]
})

const listSchema = new mongoose.Schema({
    name: String,
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }]
})

const Task = mongoose.models.Task || mongoose.model('Task', taskSchema)

const List = mongoose.models.list || mongoose.model('List', listSchema)

// read CLI argument ----------------------------
const countArg = process.argv[2]
const listArg = process.argv[3]
const count = Number(countArg) || 10 // fallback to 10 if no arg given
const listCount = Number(listArg) || 2

// seeding logic ---------------------------
async function seedData() {
    await mongoose.connect(MONGO_URI) // connect to mongo
    console.log('✅ Connected to MongoDB')

    // clear old data (optional)
    await Task.deleteMany({})
    await List.deleteMany({})
    console.log('🧹 Cleared old tasks')

    const lists = []
    //for every list, give it a name and empty array of tasks
    for (let i = 0; i < listCount; i++) {
        const list = new List({
            name: faker.lorem.word(),
            tasks: []
        })
        await list.save()
        lists.push(list)
    }

    console.log(`📄 Created ${listCount} lists`)

    // for every task, give it a name, set checked to false, and add parent lists id
    for (const list of lists) {
        const taskDocs = []

        for (let j = 0; j < count; j++) {
            taskDocs.push({
                text: faker.lorem.word(),
                checked: false,
                list: list._id
            })
        }

        const insertedTasks = await Task.insertMany(taskDocs)

        // push task IDs into the list
        list.tasks = insertedTasks.map(t => t._id)
        await list.save()

        console.log(`🌱 Inserted ${count} tasks into list "${list.name}"`)
    }

    console.log('✔ Done seeding')

    await mongoose.disconnect() // disconnect from mongo
    console.log('🔌 Disconnected from MongoDB')
}

seedData().catch(err => console.error('❌ Error seeding:', err))
