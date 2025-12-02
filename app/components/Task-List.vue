<script setup lang="ts">
import { computed } from 'vue'
interface List {
  _id: string
  name: string
}

const props = defineProps<{
  list: List
}>()

const listId = computed(() => props.list?._id ?? '')
// console.log("LISTID:", listId.value)

const {removeTask, updateTask } = UseTask(listId)

const {data: tasks} = useAsyncData(
    () => `tasks-${listId.value}`,
    () => $fetch('/api/tasks', {
      query: { listId: listId.value }
    }),
    { watch: [listId] }
)
</script>

<template>
  <!-- TASK LIST -->
      <div
          v-for="task in tasks"
          :key="task._id"
      >
            <!-- Update button -->
            <button @click="updateTask(task._id)">{{ task.checked ? '✓' : 'x' }}</button>
            <!-- Display text + checked flag -->
            <p>{{ task.text }}</p>
            <!-- Delete button -->
            <button @click="removeTask(task._id)"> DELETE</button>
      </div>
</template>