// Load tasks on page load (cached by useAsyncData)

// TODO: This function causes hydration problems
export function UseTask(listId: Ref<string>) {
    const { data: tasks, refresh } = useAsyncData(
        () => `tasks-${listId.value}`,
        () => $fetch('/api/tasks', {
            query: { listId: listId.value }
        }),
        { watch: [listId] }
    )
    const newTask = ref('')

    async function addTask() {
        if (!newTask.value.trim()) return

        await $fetch(`/api/lists/${listId.value}/tasks`, {
            method: 'POST',
            body: { text: newTask.value }
        })

        newTask.value = ''
        await refresh()
    }

    async function removeTask(id: string) {
        await $fetch(`/api/lists/${listId.value}/tasks/${id}`, { method: 'DELETE' })
        await refresh()
    }

    async function updateTask(id: string) {
        await $fetch(`/api/tasks/${id}`, { method: 'PUT' })
        await refresh()
    }

    return {
        tasks,
        newTask,
        addTask,
        removeTask,
        updateTask,
    }
}
