// Load tasks on page load (cached by useAsyncData)

// TODO: This function causes hydration problems
export function XuseTask(listId: Ref<string>) {
    /*const {data: tasks, refresh} = useAsyncData(
        () => `tasks-${listId.value}`,
        () => $fetch('/api/tasks', {
                query: { listId: listId.value }
            }),
            { watch: [listId] }
    )*/

    const {data: tasks, refresh} = useAsyncData('tasks', () =>
        $fetch('/api/tasks')
    )

    // Reactive variable for the new task input
    const newTask = ref('')

    // Add a new task by POSTing to the API
    async function addTask() {
        if (!newTask.value.trim()) return // don't post empty strings

        try {
            await $fetch(`/api/lists/${listId.value}/tasks`, {
                method: 'POST',
                body: { text: newTask.value, list: listId.value } // ✅ send plain JSON
            })
            newTask.value = '' // clear the input
            await refresh() // reload list after posting
            console.log(`New task created`)
        } catch (error) {
            console.error('Failed to add task:', error)
        }
    }

    // Delete a task using its ID
    async function removeTask(id: string) {
        //if there is no ID return error
        if (!id) {
            console.log('No such task', id)
            return
        }

        try {
            await $fetch(`/api/tasks/${id}`, {
                method: 'DELETE',
            })
            console.log('Successfully deleted task:', id)
            await refresh()
        } catch (error) {
            console.error('Failed to remove task:', error)
        }
    }

    async function updateTask(id: string) {
        //if there is no ID return error
        if (!id) {
            console.log('No such task', id)
            return
        }

        try {
            await $fetch(`/api/tasks/${id}`, {
                method: 'PUT',
            })
            console.log('Successfully updated task:', id)
            await refresh()
        } catch (error) {
            console.error('Failed to update task:', error)
        }
    }

    return {
        tasks,
        newTask,
        addTask,
        removeTask,
        updateTask,
    }
}