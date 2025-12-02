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
    <UPageList class="flex justify-between">
      <UPageCard
          v-for="task in tasks"
          :key="task._id"
          variant="ghost"
      >
        <template #body>
          <div class="flex flex-row gap-4">
            <!-- Update button -->
            <UButton @click="updateTask(task._id)">{{ task.checked ? '✓' : 'x' }}</UButton>
            <!-- Display text + checked flag -->
            <p class="text-3xl">{{ task.text }}</p>
            <!-- Delete button -->
            <UButton color="error" @click="removeTask(task._id)"> DELETE</UButton>
          </div>
        </template>
      </UPageCard>
    </UPageList>
</template>